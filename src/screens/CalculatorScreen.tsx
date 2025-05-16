// src/screens/CalculatorScreen.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Platform, StatusBar as RNStatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Surface, Button, Card, Divider, useTheme, IconButton, Portal, FAB, Snackbar } from 'react-native-paper';
import { CalculationInput, ValidationError, SolidChemical, LiquidChemical, ConcentrationType } from '../types/calculator';
import { calculateSolution } from '../services/calculations';
import { validateCalculatorInput } from '../services/validation';
import { generateAndSharePDF } from '../services/pdfGenerator';
import InputField from '../components/InputField';
import ChemicalDropdown from '../components/ChemicalDropdown';
import RadioButtonGroup from '../components/RadioButtonGroup';
import ResultsDisplay from '../components/ResultsDisplay';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { solid } from '../constants/solid';
import { liquid } from '../constants/liquid';
import type { CustomTheme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { isRTL } from '../i18n';
import i18n from '../i18n';
import LogoutUtil from '../utils/LogoutUtil';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { CommonActions, useNavigation } from '@react-navigation/native';


type CalculatorScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Calculator'>;

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to format a date
const formatDate = (date: Date): string => {
  const currentLanguage = i18n.language || 'en';
  const locale = currentLanguage === 'en' ? 'en-US' : 
                 currentLanguage === 'fr' ? 'fr-FR' : 
                 currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const CalculatorScreen: React.FC = () => {
  const theme = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const rtl = isRTL();
  const navigation = useNavigation<CalculatorScreenNavigationProp>();
  
  
  const [solutionType, setSolutionType] = useState<'solid' | 'liquid'>('solid');
  const [selectedChemical, setSelectedChemical] = useState<SolidChemical | LiquidChemical | null>(null);
  const [finalConcentration, setFinalConcentration] = useState<string>('');
  const [finalVolume, setFinalVolume] = useState<string>('');
  const [concentrationType, setConcentrationType] = useState<ConcentrationType>('molar');
  const [selectedPurity, setSelectedPurity] = useState<number | undefined>(undefined);
  const [selectedHydrationState, setSelectedHydrationState] = useState<{ name: string; value: number } | undefined>(undefined);
  const [stockConcentration, setStockConcentration] = useState<string>('');
  const [stockConcentrationUnit, setStockConcentrationUnit] = useState<string>('M');
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  
  // Preparation information for PDF
  const [preparatorName, setPreparatorName] = useState<string>('');
  const [preparationDate] = useState<Date>(new Date());
  const [expirationDate] = useState<Date>(addDays(new Date(), 15));
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (selectedHydrationState) {
      console.log('selectedHydrationState changed:', JSON.stringify(selectedHydrationState));
    }
  }, [selectedHydrationState]);

  const handleSolutionTypeChange = useCallback((type: 'solid' | 'liquid') => {
    setSolutionType(type);
    setSelectedChemical(null);
    setSelectedPurity(undefined);
    setSelectedHydrationState(undefined);
    setStockConcentration('');
    setStockConcentrationUnit('M');
    setCalculationResult(null);
    setErrors({});
  }, []);

  const handleChemicalSelect = useCallback((chemical: SolidChemical | LiquidChemical) => {
    setSelectedChemical(chemical);
    
    if (solutionType === 'solid') {
      const solidChemical = chemical as SolidChemical;
      // Set default purity to the first available purity
      if (solidChemical.purities && solidChemical.purities.length > 0) {
        setSelectedPurity(solidChemical.purities[0]);
      }
      
      // Map hydration states to an array of objects
      const hydrationStates = Object.entries(solidChemical.hydration_states).map(([name, value]) => ({
        name,
        value
      }));
      
      console.log('Available hydration states:', JSON.stringify(hydrationStates));
      
      if (hydrationStates.length > 0) {
        // Try to find the anhydrous state first
        const anhydrousState = hydrationStates.find(state => 
          state.name.toLowerCase() === 'anhydrous' || 
          state.name.toLowerCase().includes('anhydrous')
        );
        
        console.log('Found anhydrous state:', anhydrousState ? JSON.stringify(anhydrousState) : 'none');
        
        // Set anhydrous if found, otherwise default to the first state
        if (anhydrousState) {
          console.log('Setting anhydrous hydration state');
          setSelectedHydrationState(anhydrousState);
        } else {
          console.log('Setting first hydration state:', JSON.stringify(hydrationStates[0]));
          setSelectedHydrationState(hydrationStates[0]);
        }
      }
    }
    
    setCalculationResult(null);
    setErrors({});
  }, [solutionType]);

  // Helper function to get error message by field name
  const getErrorMessage = (field: string): string => {
    return errors[field] || '';
  };

  const handleCalculate = useCallback(() => {
    // Clear previous errors and results
    setErrors({});
    setCalculationResult(null);
    
    // Add early validation for liquid solution inputs
    if (solutionType === 'liquid') {
      const newErrors: Record<string, string> = {};
      
      if (!stockConcentration || parseFloat(stockConcentration) <= 0) {
        newErrors.concentration = t('calculator.validationErrors.validConcentration');
      }
      
      if (!stockConcentrationUnit) {
        newErrors.concentration_unit = t('calculator.validationErrors.selectConcentrationUnit');
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setSnackbarMessage(t('calculator.validationErrors.correctErrors'));
        setSnackbarVisible(true);
        return;
      }
    }
    
    // Prepare input for validation and calculation
    let calculationInput: CalculationInput;
    
    if (solutionType === 'solid') {
      calculationInput = {
        solutionType,
        chemical: selectedChemical as SolidChemical,
        finalConcentration: parseFloat(finalConcentration),
        finalConcentrationType: concentrationType,
        finalVolume: parseFloat(finalVolume),
        selectedPurity,
        selectedHydrationState
      };
    } else {
      // For liquid, update the chemical with stock concentration
      const liquidChemical = {
        ...(selectedChemical as LiquidChemical),
        concentration: parseFloat(stockConcentration),
        concentration_unit: stockConcentrationUnit
      };
      
      calculationInput = {
        solutionType,
        chemical: liquidChemical,
        finalConcentration: parseFloat(finalConcentration),
        finalConcentrationType: concentrationType,
        finalVolume: parseFloat(finalVolume)
      };
    }
    
    // Validate input
    const validationResult = validateCalculatorInput(calculationInput);
    
    if (!validationResult.isValid) {
      // Convert validation errors to a record for easier access
      const errorRecord: Record<string, string> = {};
      validationResult.errors.forEach((error: ValidationError) => {
        errorRecord[error.field] = error.message;
      });
      
      setErrors(errorRecord);
      setSnackbarMessage(t('calculator.validationErrors.correctErrors'));
      setSnackbarVisible(true);
      return;
    }
    
    // Calculate solution
    const result = calculateSolution(calculationInput);
    
    if (result.success) {
      setCalculationResult(result.data);
    } else {
      setSnackbarMessage(result.error || t('common.error'));
      setSnackbarVisible(true);
    }
  }, [
    solutionType,
    selectedChemical,
    finalConcentration,
    finalVolume,
    concentrationType,
    selectedPurity,
    selectedHydrationState,
    stockConcentration,
    stockConcentrationUnit,
    t
  ]);

  const handleClear = useCallback(() => {
    setFinalConcentration('');
    setFinalVolume('');
    setConcentrationType('molar');
    setSelectedChemical(null);
    setSelectedPurity(undefined);
    setSelectedHydrationState(undefined);
    setStockConcentration('');
    setStockConcentrationUnit('M');
    setCalculationResult(null);
    setErrors({});
  }, []);

  const handleExportPDF = useCallback(async () => {
    if (!calculationResult) {
      setSnackbarMessage(t('results.performCalculation'));
      setSnackbarVisible(true);
      return;
    }

    if (!preparatorName.trim()) {
      setSnackbarMessage(t('results.enterPreparatorName'));
      setSnackbarVisible(true);
      return;
    }

    if (!selectedChemical) {
      setSnackbarMessage(t('results.noChemicalSelected'));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Format the chemical data with all necessary properties
      const formattedChemical = {
        ...selectedChemical,
        selectedPurity: solutionType === 'solid' ? selectedPurity : undefined,
        selectedHydrationState: solutionType === 'solid' ? selectedHydrationState : undefined,
      };

      await generateAndSharePDF({
        calculationResult,
        solutionType,
        preparatorName,
        preparationDate,
        expirationDate,
        chemical: formattedChemical,
      });

      setSnackbarMessage(t('results.pdfGenerated'));
      setSnackbarVisible(true);
    } catch (error: any) {
      console.error('PDF Generation Error:', error);
      setSnackbarMessage(error.message || t('results.pdfFailed'));
      setSnackbarVisible(true);
    }
  }, [calculationResult, solutionType, preparatorName, preparationDate, expirationDate, selectedChemical, selectedPurity, selectedHydrationState, t]);

  const renderSolutionTypeSelector = () => (
    <Card style={[styles.card, { backgroundColor: theme.custom.cardBackground, borderRadius: theme.customRoundness.m }]} elevation={1}>
      <Card.Title 
        title={t('calculator.solutionType')} 
        titleStyle={styles.cardTitle}
        left={(props) => <IconButton {...props} icon="flask-outline" iconColor={theme.colors.primary} />}
      />
      <Card.Content style={styles.cardContent}>
        <RadioButtonGroup
          options={[
            { label: t('calculator.solidChemical'), value: 'solid' },
            { label: t('calculator.liquidChemical'), value: 'liquid' }
          ]}
          selectedValue={solutionType}
          onSelect={(value) => handleSolutionTypeChange(value as 'solid' | 'liquid')}
        />
      </Card.Content>
    </Card>
  );

  const renderChemicalSelector = () => {
    // Debug the chemicals array before passing to dropdown
    console.log("CalculatorScreen renderChemicalSelector:", {
      solutionType,
      solidChemicalsLength: solid.chemicals?.length || 'undefined',
      liquidChemicalsLength: liquid.chemicals?.length || 'undefined',
      isLiquidArraySolid: Array.isArray(solid.chemicals),
      isLiquidArrayLiquid: Array.isArray(liquid.chemicals),
      solidType: typeof solid.chemicals,
      liquidType: typeof liquid.chemicals
    });
    
    // Ensure we have proper arrays
    if (!Array.isArray(solid.chemicals)) {
      console.error("solid.chemicals is not an array");
    }
    
    if (!Array.isArray(liquid.chemicals)) {
      console.error("liquid.chemicals is not an array");
    }
    
    // If using solid type, log some sample data
    if (solutionType === 'solid' && Array.isArray(solid.chemicals) && solid.chemicals.length > 0) {
      console.log("Sample solid chemical:", JSON.stringify(solid.chemicals[0], null, 2));
      console.log("Solid chemicals count:", solid.chemicals.length);
    }
    
    // If using liquid type, log some sample data
    if (solutionType === 'liquid' && Array.isArray(liquid.chemicals) && liquid.chemicals.length > 0) {
      console.log("Sample liquid chemical:", JSON.stringify(liquid.chemicals[0], null, 2));
      console.log("Liquid chemicals count:", liquid.chemicals.length);
    }
    
    // Ensure chemicals are properly formatted and definitely arrays
    const chemicalsToPass = solutionType === 'solid' 
      ? (Array.isArray(solid.chemicals) ? (solid.chemicals as unknown) as SolidChemical[] : [])
      : (Array.isArray(liquid.chemicals) ? (liquid.chemicals as unknown) as LiquidChemical[] : []);
    
    console.log(`Passing ${chemicalsToPass?.length || 0} chemicals to dropdown`);
    
    // Log the first few chemicals to check their structure
    if (chemicalsToPass && chemicalsToPass.length > 0) {
      console.log(`First chemical structure for ${solutionType}:`, Object.keys(chemicalsToPass[0]).join(', '));
    }
    
    return (
      <Card style={[styles.card, { backgroundColor: theme.custom.cardBackground, borderRadius: theme.customRoundness.m }]} elevation={1}>
        <Card.Title 
          title={t('calculator.chemicalSelection')} 
          titleStyle={styles.cardTitle}
          left={(props) => <IconButton {...props} icon="beaker-outline" iconColor={theme.colors.primary} />}
        />
        <Card.Content style={styles.cardContent}>
          <ChemicalDropdown
            chemicals={chemicalsToPass}
            selectedChemical={selectedChemical}
            onSelect={handleChemicalSelect}
            error={getErrorMessage('chemical')}
          />
          
          {solutionType === 'solid' && selectedChemical && (
            <Card style={[styles.nestedCard, { backgroundColor: theme.custom.surface2, borderRadius: theme.customRoundness.s }]} elevation={0}>
              <Card.Title title={t('calculator.chemicalProperties')} titleStyle={styles.nestedCardTitle} />
              <Card.Content>
                {selectedChemical && 'purities' in selectedChemical && (
                  <>
                    <RadioButtonGroup
                      label={t('calculator.purity')}
                      options={selectedChemical.purities.map(purity => ({
                        label: `${purity}%`,
                        value: purity
                      }))}
                      selectedValue={selectedPurity}
                      onSelect={(value: number) => setSelectedPurity(value)}
                      error={getErrorMessage('selectedPurity')}
                    />
                    
                    <RadioButtonGroup
                      label={t('calculator.hydrationState')}
                      options={Object.entries(selectedChemical.hydration_states).map(([name, value]) => ({
                        label: name,
                        value: { name, value }
                      }))}
                      selectedValue={selectedHydrationState}
                      onSelect={(value: { name: string; value: number }) => setSelectedHydrationState(value)}
                      error={getErrorMessage('selectedHydrationState')}
                    />
                  </>
                )}
              </Card.Content>
            </Card>
          )}
          
          {solutionType === 'liquid' && (
            <Card style={[styles.nestedCard, { backgroundColor: theme.custom.surface2, borderRadius: theme.customRoundness.s }]} elevation={0}>
              <Card.Title title={t('calculator.chemicalProperties')} titleStyle={styles.nestedCardTitle} />
              <Card.Content>
                <InputField
                  label={t('calculator.stockSolution')}
                  value={stockConcentration}
                  onChangeText={setStockConcentration}
                  keyboardType="numeric"
                  error={getErrorMessage('concentration')}
                  helperText={t('calculator.enterConcentration')}
                />
                
                <RadioButtonGroup
                  label={t('calculator.stockConcentrationUnit')}
                  options={[
                    { label: t('calculator.molarUnit'), value: 'M' },
                    { label: t('calculator.percentUnit'), value: '%' }
                  ]}
                  selectedValue={stockConcentrationUnit}
                  onSelect={setStockConcentrationUnit}
                  error={getErrorMessage('concentration_unit')}
                />
              </Card.Content>
            </Card>
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderTargetParameters = () => (
    <Card style={[styles.card, { backgroundColor: theme.custom.cardBackground, borderRadius: theme.customRoundness.m }]} elevation={1}>
      <Card.Title 
        title={t('calculator.targetParameters')} 
        titleStyle={styles.cardTitle}
        left={(props) => <IconButton {...props} icon="target" iconColor={theme.colors.primary} />}
      />
      <Card.Content style={styles.cardContent}>
        <InputField
          label={t('calculator.finalConcentration')}
          value={finalConcentration}
          onChangeText={setFinalConcentration}
          keyboardType="numeric"
          error={getErrorMessage('finalConcentration')}
          helperText={t('calculator.enterFinalConcentration')}
        />
        
        <RadioButtonGroup
          label={t('calculator.concentrationType')}
          options={[
            { label: t('calculator.molar'), value: 'molar' },
            { label: t('calculator.massPerLiter'), value: 'mass' },
            { label: t('calculator.percentage'), value: 'massPercent' }
          ]}
          selectedValue={concentrationType}
          onSelect={(value) => setConcentrationType(value as ConcentrationType)}
        />
        
        <InputField
          label={t('calculator.finalVolume')}
          value={finalVolume}
          onChangeText={setFinalVolume}
          keyboardType="numeric"
          error={getErrorMessage('finalVolume')}
          helperText={t('calculator.enterFinalVolume')}
        />
      </Card.Content>
    </Card>
  );

  const renderActionButtons = () => (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={handleCalculate}
        style={styles.button}
        icon="calculator"
        contentStyle={styles.buttonContent}
      >
        {t('common.calculate')}
      </Button>
      <Button
        mode="outlined"
        onPress={handleClear}
        style={styles.button}
        icon="refresh"
        contentStyle={styles.buttonContent}
      >
        {t('common.clear')}
      </Button>
    </View>
  );

  const renderPreparationDetails = () => (
    <Card style={[styles.card, { backgroundColor: theme.custom.cardBackground, borderRadius: theme.customRoundness.m }]} elevation={1}>
      <Card.Title 
        title={t('calculator.preparationDetails')} 
        titleStyle={styles.cardTitle}
        left={(props) => <IconButton {...props} icon="account" iconColor={theme.colors.primary} />}
      />
      <Card.Content style={styles.cardContent}>
        <InputField
          label={t('calculator.preparatorName')}
          value={preparatorName}
          onChangeText={setPreparatorName}
          error={getErrorMessage('preparatorName')}
          helperText={t('calculator.enterPreparatorName')}
        />
        
        <View style={styles.dateContainer}>
          <Text style={[styles.dateLabel, {color: theme.custom.subtleText}]}>{t('calculator.preparationDate')}</Text>
          <Text style={styles.dateValue}>{formatDate(preparationDate)}</Text>
        </View>
        
        <View style={styles.dateContainer}>
          <Text style={[styles.dateLabel, {color: theme.custom.subtleText}]}>{t('calculator.expirationDate')}</Text>
          <Text style={styles.dateValue}>{formatDate(expirationDate)}</Text>
          <Text style={[styles.dateNote, {color: theme.custom.subtleText}]}>{t('calculator.daysFromPreparation')}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: Platform.OS === 'ios' ? 50 : RNStatusBar.currentHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoHeader}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/fablab.png')} style={styles.fablabLogo} resizeMode="contain" />
            <Image source={require('../../assets/images/fst.png')} style={styles.fstLogo} resizeMode="contain" />
          </View>
          <Button
  mode="contained"
  onPress={() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }}
  style={styles.button}
  icon="logout" // Icon similar to its function
  contentStyle={styles.buttonContent}
>
  {t('common.logout')}
</Button>
        </View>
    
        <View style={styles.header}>
          <Text style={styles.appTitle}>{t('common.appName')}</Text>
          <View style={styles.headerActions}>
            <LanguageSwitcher />
          </View>
        </View>
        
        {renderSolutionTypeSelector()}
        {renderChemicalSelector()}
        {renderTargetParameters()}
        {renderActionButtons()}
        
        {calculationResult && (
          <>
            <ResultsDisplay
              result={calculationResult}
              solutionType={solutionType}
            />
            {renderPreparationDetails()}
            
            <Button
              mode="contained"
              icon="file-pdf-box"
              onPress={handleExportPDF}
              style={styles.exportButton}
              contentStyle={styles.buttonContent}
              buttonColor={theme.colors.tertiary}
            >
              {t('common.exportPDF')}
            </Button>
          </>
        )}
        
        <View style={styles.poweredByContainer}>
          <Image source={require('../../assets/images/YAGRINV.png')} style={styles.sscLogo} resizeMode="contain" />
          <Text style={styles.poweredByText}>{t('common.poweredBy', 'Powered by YAGRI')}</Text>
        </View>
      </ScrollView>
       
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: t('common.dismiss'),
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </Surface>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  closeButton: {
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  logoHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fstLogo: {
    height: 40,
    width: 80,
  },
  fablabLogo: {
    height: 40,
    width: 80,
    marginRight: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  poweredByContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  sscLogo: {
    height: 50,
    width: 100, 
    marginBottom: 10,
  },
  poweredByText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContent: {
    paddingTop: 0,
  },
  nestedCard: {
    marginTop: 16, 
    marginBottom: 8,
    overflow: 'hidden',
  },
  nestedCardTitle: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 2,
    marginRight: 8,
  },
  unitContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  button: {
    minWidth: 140,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  dateContainer: {
    marginVertical: 8,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
  },
  dateNote: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  exportButton: {
    marginVertical: 16,
    borderRadius: 8,
  },

 
});

export default CalculatorScreen; 