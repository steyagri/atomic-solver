import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Surface, useTheme, List, Divider, Card, IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import type { CustomTheme } from '../theme/theme';

export interface ResultsDisplayProps {
  result: {
    massToDissolve?: number;
    stockVolume?: number;
    waterVolume?: number;
    target_concentration?: string;
    final_volume?: string;
    concentration_unit?: string;
    mass_to_dissolve?: number;
    molar_mass?: number;
    final_concentration?: number;
    volume_to_add?: number;
    dilution_factor?: number;
  };
  solutionType: 'solid' | 'liquid';
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, solutionType }) => {
  const theme = useTheme() as CustomTheme;
  const { t, i18n } = useTranslation();
  const [tipsExpanded, setTipsExpanded] = useState(false);
  const [formulasExpanded, setFormulasExpanded] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(50);

  useEffect(() => {
    // Animate the component when it mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, translateYAnim]);

  // Helper function to format numbers with 4 decimal places
  const formatNumber = (num: number): string => {
    return num.toFixed(4);
  };

  // Helper function to check if a value is valid (non-negative)
  const isValidValue = (value: number | undefined): boolean => {
    return value !== undefined && value >= 0;
  };

  // Helper function to format value with units
  const formatValue = (value: number | undefined, unit: string): string => {
    if (!value || !isValidValue(value)) return 'Invalid value';
    return `${value.toFixed(3)} ${unit}`;
  };

  const renderFormulas = () => {
    if (solutionType === 'solid') {
      return (
        <Card 
          style={[styles.formulaCard, { backgroundColor: theme.custom.surface2 }]}
          elevation={0}
        >
          <Card.Content>
            <Text style={[styles.formulaTitle, { color: theme.colors.primary }]}>
              {t('results.formulasUsed')}
            </Text>
            <Surface style={[styles.formulaSurface, { backgroundColor: theme.custom.surface3 }]}>
              <View style={styles.rtlFormulaContainer}>
                <Text style={[styles.formula, { 
                  fontFamily: 'monospace',
                  textAlign: 'center'
                }]}>
                  {t('results.formulas.massToDissolve')}
                </Text>
              </View>
            </Surface>
            <Text style={[styles.formulaLegend, { marginTop: 8, textAlign: 'left' }]}>{t('results.where')}</Text>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.c')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.v')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.h')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.p')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.n')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.m')).replace('• ', '')}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <Card 
          style={[styles.formulaCard, { backgroundColor: theme.custom.surface2 }]}
          elevation={0}
        >
          <Card.Content>
            <Text style={[styles.formulaTitle, { color: theme.colors.primary }]}>
              {t('results.formulasUsed')}
            </Text>
            <Surface style={[styles.formulaSurface, { backgroundColor: theme.custom.surface3 }]}>
              <View style={styles.rtlFormulaContainer}>
                <Text style={[styles.formula, { 
                  fontFamily: 'monospace',
                  textAlign: 'center'
                }]}>
                  {t('results.formulas.stockVolume')}
                </Text>
              </View>
            </Surface>
            <Surface style={[styles.formulaSurface, { backgroundColor: theme.custom.surface3, marginTop: 8 }]}>
              <View style={styles.rtlFormulaContainer}>
                <Text style={[styles.formula, { 
                  fontFamily: 'monospace',
                  textAlign: 'center'
                }]}>
                  {t('results.formulas.waterVolume')}
                </Text>
              </View>
            </Surface>
            <Text style={[styles.formulaLegend, { marginTop: 8, textAlign: 'left' }]}>{t('results.where')}</Text>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.c1')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.c2')).replace('• ', '')}</Text>
            </View>
            <View style={[styles.formulaItemContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={[styles.formulaBullet, { marginRight: 4, textAlign: 'left' }]}>•</Text>
              <Text style={[styles.formulaItemText, { textAlign: 'left' }]}>{String(t('results.formulaLegend.v2')).replace('• ', '')}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }
  };

  const renderCalculationBreakdown = () => {
    if (solutionType === 'solid' && isValidValue(result.mass_to_dissolve || result.massToDissolve)) {
      const massToDissolve = result.mass_to_dissolve || result.massToDissolve;
      return (
        <Card 
          style={[styles.breakdownCard, { backgroundColor: theme.colors.primaryContainer }]}
          elevation={0}
        >
          <Card.Content>
            <Text style={[styles.breakdownTitle, { color: theme.colors.onPrimaryContainer }]}>
              {t('results.calculationResult')}
            </Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.massToDissolve')}</Text>
              <Text style={[styles.resultValue, { color: theme.colors.primary, fontWeight: '700' }]}>
                {formatValue(massToDissolve, 'g')}
              </Text>
            </View>
            
            <Divider style={[styles.resultDivider, { backgroundColor: theme.custom.divider }]} />
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.targetConcentration')}</Text>
              <Text style={styles.resultValue}>
                {result.target_concentration} {result.concentration_unit}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.finalVolume')}</Text>
              <Text style={styles.resultValue}>{result.final_volume} L</Text>
            </View>
          </Card.Content>
        </Card>
      );
    } else if (solutionType === 'liquid' && isValidValue(result.volume_to_add || result.stockVolume) && isValidValue(result.waterVolume)) {
      const stockVolume = result.volume_to_add || result.stockVolume;
      return (
        <Card 
          style={[styles.breakdownCard, { backgroundColor: theme.colors.primaryContainer }]}
          elevation={0}
        >
          <Card.Content>
            <Text style={[styles.breakdownTitle, { color: theme.colors.onPrimaryContainer }]}>
              {t('results.calculationResults')}
            </Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.stockSolutionVolume')}</Text>
              <Text style={[styles.resultValue, { color: theme.colors.primary, fontWeight: '700' }]}>
                {formatValue(stockVolume, 'mL')}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.waterVolume')}</Text>
              <Text style={[styles.resultValue, { color: theme.colors.primary, fontWeight: '700' }]}>
                {formatValue(result.waterVolume, 'mL')}
              </Text>
            </View>
            
            <Divider style={[styles.resultDivider, { backgroundColor: theme.custom.divider }]} />
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.targetConcentration')}</Text>
              <Text style={styles.resultValue}>
                {result.target_concentration} {result.concentration_unit}
              </Text>
            </View>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('results.finalVolume')}</Text>
              <Text style={styles.resultValue}>{result.final_volume} L</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };

  const renderStepByStep = () => {
    if (solutionType === 'solid' && isValidValue(result.mass_to_dissolve || result.massToDissolve)) {
      const massToDissolve = result.mass_to_dissolve || result.massToDissolve;
      return (
        <Card style={[styles.stepsCard, { backgroundColor: theme.custom.cardBackground }]} elevation={1}>
          <Card.Title 
            title={t('results.stepByStepInstructions')} 
            titleStyle={styles.stepsTitle}
            left={(props) => <IconButton {...props} icon="flask-outline" iconColor={theme.colors.primary} />}
          />
          <Card.Content>
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>1</Text>
              </View>
              <Text style={styles.stepText}>
                {t('results.steps.weighSolid', { value: formatValue(massToDissolve, 'g') })}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>2</Text>
              </View>
              <Text style={styles.stepText}>{t('results.steps.addSolidToContainer')}</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>3</Text>
              </View>
              <Text style={styles.stepText}>{t('results.steps.addMostWater')}</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>4</Text>
              </View>
              <Text style={styles.stepText}>{t('results.steps.stirUntilDissolved')}</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>5</Text>
              </View>
              <Text style={styles.stepText}>
                {t('results.steps.addWaterToFinalVolume', { value: result.final_volume })}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>6</Text>
              </View>
              <Text style={styles.stepText}>{t('results.steps.mixThoroughly')}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    } else if (solutionType === 'liquid' && isValidValue(result.volume_to_add || result.stockVolume) && isValidValue(result.waterVolume)) {
      const stockVolume = result.volume_to_add || result.stockVolume;
      return (
        <Card style={[styles.stepsCard, { backgroundColor: theme.custom.cardBackground }]} elevation={1}>
          <Card.Title 
            title={t('results.stepByStepInstructions')} 
            titleStyle={styles.stepsTitle}
            left={(props) => <IconButton {...props} icon="flask-outline" iconColor={theme.colors.primary} />}
          />
          <Card.Content>
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>1</Text>
              </View>
              <Text style={styles.stepText}>
                {t('results.steps.measureWater', { value: formatValue(result.waterVolume, 'mL') })}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>2</Text>
              </View>
              <Text style={styles.stepText}>
                {t('results.steps.addStockSolution', { value: formatValue(stockVolume, 'mL') })}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>3</Text>
              </View>
              <Text style={styles.stepText}>{t('results.steps.mixThoroughly')}</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.stepNumberText, { color: theme.colors.onPrimary }]}>4</Text>
              </View>
              <Text style={styles.stepText}>
                {t('results.steps.finalVolumeShouldBe', { value: result.final_volume })}
              </Text>
            </View>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };

  return (
    <Animated.View style={[
      { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }
    ]}>
      <Surface style={[styles.container, { borderRadius: theme.customRoundness.m }]}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {t('results.solutionPreparationResults')}
        </Text>
        <Divider style={[styles.divider, { backgroundColor: theme.custom.divider }]} />
        
        {renderCalculationBreakdown()}
        <Divider style={[styles.divider, { backgroundColor: theme.custom.divider }]} />
        
        {renderStepByStep()}
        <Divider style={[styles.divider, { backgroundColor: theme.custom.divider }]} />
        
        <List.Accordion
          title={t('results.calculationFormulas')}
          left={props => <List.Icon {...props} icon="function-variant" />}
          expanded={formulasExpanded}
          onPress={() => setFormulasExpanded(!formulasExpanded)}
          style={[styles.accordion, { backgroundColor: theme.custom.cardBackground }]}
          titleStyle={{ color: theme.colors.onSurface }}
        >
          {renderFormulas()}
        </List.Accordion>
        
        <List.Accordion
          title={t('results.labSafetyTips')}
          left={props => <List.Icon {...props} icon="shield-alert" />}
          expanded={tipsExpanded}
          onPress={() => setTipsExpanded(!tipsExpanded)}
          style={[styles.accordion, { backgroundColor: theme.custom.cardBackground }]}
          titleStyle={{ color: theme.colors.onSurface }}
        >
          <Card style={[styles.tipsCard, { backgroundColor: theme.custom.surface2 }]} elevation={0}>
            <Card.Content>
              <View style={styles.tipItem}>
                <IconButton icon="safety-goggles" size={24} iconColor={theme.colors.primary} style={styles.tipIcon} />
                <View style={styles.tipContent}>
                  <Text style={[styles.tipTitle, { color: theme.colors.primary }]}>
                    {t('results.safetyTips.wearPPE.title')}
                  </Text>
                  <Text style={styles.tipDescription}>
                    {t('results.safetyTips.wearPPE.desc')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tipItem}>
                <IconButton icon="fan" size={24} iconColor={theme.colors.primary} style={styles.tipIcon} />
                <View style={styles.tipContent}>
                  <Text style={[styles.tipTitle, { color: theme.colors.primary }]}>
                    {t('results.safetyTips.ventilation.title')}
                  </Text>
                  <Text style={styles.tipDescription}>
                    {t('results.safetyTips.ventilation.desc')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tipItem}>
                <IconButton icon="label" size={24} iconColor={theme.colors.primary} style={styles.tipIcon} />
                <View style={styles.tipContent}>
                  <Text style={[styles.tipTitle, { color: theme.colors.primary }]}>
                    {t('results.safetyTips.labeling.title')}
                  </Text>
                  <Text style={styles.tipDescription}>
                    {t('results.safetyTips.labeling.desc')}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tipItem}>
                <IconButton icon="delete" size={24} iconColor={theme.colors.primary} style={styles.tipIcon} />
                <View style={styles.tipContent}>
                  <Text style={[styles.tipTitle, { color: theme.colors.primary }]}>
                    {t('results.safetyTips.wasteDisposal.title')}
                  </Text>
                  <Text style={styles.tipDescription}>
                    {t('results.safetyTips.wasteDisposal.desc')}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </List.Accordion>
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    elevation: 4,
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 12,
  },
  breakdownCard: {
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  resultLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
  },
  resultDivider: {
    marginVertical: 10,
  },
  stepsCard: {
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  formulaCard: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  formulaSurface: {
    padding: 12,
    borderRadius: 6,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  formula: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  formulaLegend: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  formulaItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
    marginLeft: 16,
  },
  formulaBullet: {
    fontSize: 14,
    lineHeight: 20,
  },
  formulaItemText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  formulaItem: {
    fontSize: 14,
    marginLeft: 16,
    marginVertical: 2,
    lineHeight: 20,
  },
  accordion: {
    marginVertical: 4,
  },
  tipsCard: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipIcon: {
    margin: 0,
  },
  tipContent: {
    flex: 1,
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  rtlFormulaContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResultsDisplay; 