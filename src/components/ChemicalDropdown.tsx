import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, TextInput, Portal, Modal, Searchbar, useTheme, IconButton } from 'react-native-paper';
import { SolidChemical, LiquidChemical } from '../types/calculator';
import { useTranslation } from 'react-i18next';
import type { CustomTheme } from '../theme/theme';

interface ChemicalDropdownProps {
  chemicals: (SolidChemical | LiquidChemical)[];
  selectedChemical: SolidChemical | LiquidChemical | null;
  onSelect: (chemical: SolidChemical | LiquidChemical) => void;
  error?: string;
}

// Helper function to get property values
const getChemicalName = (chemical: SolidChemical | LiquidChemical): string => {
  if (!chemical) return '';
  
  if ('name' in chemical && chemical.name) {
    return chemical.name;
  } else if ('compound_name' in chemical && chemical.compound_name) {
    return chemical.compound_name;
  }
  
  return '';
};

const getChemicalFormula = (chemical: SolidChemical | LiquidChemical): string => {
  if (!chemical) return '';
  
  if ('formula' in chemical && chemical.formula) {
    return chemical.formula;
  } else if ('chemical_formula' in chemical && chemical.chemical_formula) {
    return chemical.chemical_formula;
  }
  
  return '';
};

const getChemicalMW = (chemical: SolidChemical | LiquidChemical): number => {
  if (!chemical) return 0;
  
  if ('molecular_weight' in chemical && typeof chemical.molecular_weight === 'number') {
    return chemical.molecular_weight;
  } else if ('molar_mass' in chemical && typeof chemical.molar_mass === 'number') {
    return chemical.molar_mass;
  } else if ('mw' in chemical && typeof chemical.mw === 'number') {
    return chemical.mw;
  }
  
  return 0;
};

const ChemicalDropdown: React.FC<ChemicalDropdownProps> = ({
  chemicals,
  selectedChemical,
  onSelect,
  error,
}) => {
  const theme = useTheme() as CustomTheme;
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableChemicals, setAvailableChemicals] = useState<(SolidChemical | LiquidChemical)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize available chemicals from props
  useEffect(() => {
    if (Array.isArray(chemicals) && chemicals.length > 0) {
      setAvailableChemicals(chemicals);
    } else {
      setAvailableChemicals([]);
    }
  }, [chemicals]);

  const showModal = useCallback(() => {
    setSearchQuery('');
    setModalVisible(true);
  }, []);
  
  const hideModal = useCallback(() => setModalVisible(false), []);

  const handleSelect = useCallback((chemical: SolidChemical | LiquidChemical) => {
    onSelect(chemical);
    hideModal();
  }, [onSelect, hideModal]);

  // Filter chemicals based on search query
  const filteredChemicals = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return availableChemicals;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return availableChemicals.filter(chemical => {
      const name = getChemicalName(chemical).toLowerCase();
      const formula = getChemicalFormula(chemical).toLowerCase();
      
      return name.includes(query) || formula.includes(query);
    });
  }, [availableChemicals, searchQuery]);

  // Show brief loading when modal opens
  useEffect(() => {
    if (modalVisible) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [modalVisible]);

  const renderChemicalItem = ({ item }: { item: SolidChemical | LiquidChemical }) => {
    const name = getChemicalName(item);
    const formula = getChemicalFormula(item);
    const mw = getChemicalMW(item);
    
    return (
      <TouchableOpacity
        style={styles.chemicalItem}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.chemicalLeftBorder} />
        <View style={styles.chemicalContent}>
          <View style={styles.chemicalMainInfo}>
            <Text 
              style={styles.chemicalName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Text style={styles.chemicalFormula}>
              {formula}
            </Text>
          </View>
          <Text style={styles.chemicalMw}>
            MW: {mw.toFixed(2)} g/mol
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showModal} activeOpacity={0.7}>
        <TextInput
          mode="outlined"
          label={t('calculator.selectChemical')}
          value={selectedChemical ? getChemicalName(selectedChemical) : ''}
          editable={false}
          right={<TextInput.Icon icon="menu-down" />}
          style={styles.input}
          outlineStyle={{ borderRadius: theme.customRoundness.s }}
          error={!!error}
        />
      </TouchableOpacity>
      
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder={t('calculator.searchChemicals')}
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              iconColor={theme.colors.primary}
              inputStyle={{ color: theme.colors.onSurface }}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
          </View>
          
          {filteredChemicals.length > 0 && (
            <Text style={styles.resultsCount}>
              {filteredChemicals.length} {t('calculator.resultsfound')}
            </Text>
          )}
          
          {isLoading ? (
            <View style={styles.emptyContainer}>
              <IconButton
                icon="sync"
                size={40}
                iconColor={theme.colors.primary}
                animated
              />
              <Text style={styles.emptyText}>
                {t('common.loading')}...
              </Text>
            </View>
          ) : filteredChemicals.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconButton
                icon="magnify-off"
                size={40}
                iconColor={theme.colors.onSurfaceVariant}
              />
              <Text style={styles.emptyText}>
                {t('calculator.noChemicalsFound')} "{searchQuery}"
              </Text>
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearSearchButton}
              >
                <Text style={{ color: theme.colors.primary }}>
                  {t('common.clearSearch')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredChemicals}
              renderItem={renderChemicalItem}
              keyExtractor={(item, index) => `${getChemicalName(item)}-${index}`}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={true}
              initialNumToRender={8}
              maxToRenderPerBatch={10}
              windowSize={10}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    color: 'red',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 20,
    maxHeight: '50%',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    elevation: 0,
    height: 46,
  },
  resultsCount: {
    fontSize: 13,
    marginHorizontal: 24,
    marginBottom: 8,
    color: '#666',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemSeparator: {
    height: 8,
  },
  chemicalItem: {
    flexDirection: 'row',
    minHeight: 68,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  chemicalLeftBorder: {
    width: 4,
    backgroundColor: '#2196F3',
  },
  chemicalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  chemicalMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  chemicalName: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    paddingRight: 8,
    color: '#333',
  },
  chemicalFormula: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2196F3',
  },
  chemicalMw: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: 200,
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: '#666',
  },
  clearSearchButton: {
    padding: 8,
    marginTop: 8,
  },
});

export default ChemicalDropdown; 