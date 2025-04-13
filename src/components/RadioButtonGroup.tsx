import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../theme/theme';

interface RadioOption<T> {
  label: string;
  value: T;
}

interface RadioButtonGroupProps<T> {
  label?: string;
  options: RadioOption<T>[];
  selectedValue: T | undefined;
  onSelect: (value: T) => void;
  error?: string;
}

function RadioButtonGroup<T>({ 
  label, 
  options, 
  selectedValue, 
  onSelect, 
  error 
}: RadioButtonGroupProps<T>) {
  const theme = useTheme() as CustomTheme;

  // Helper function to safely stringify objects for comparison
  const safeStringify = (obj: any): string => {
    if (obj === null || obj === undefined) return '';
    if (typeof obj !== 'object') return String(obj);
    try {
      return JSON.stringify(obj);
    } catch (e) {
      return '';
    }
  };

  // Helper function to check equality of two values, handling objects
  const isEqualValue = (a: any, b: any): boolean => {
    if (a === b) return true;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (typeof a === 'object' && typeof b === 'object') {
      return safeStringify(a) === safeStringify(b);
    }
    return String(a) === String(b);
  };
  
  // Calculate the current value for RadioButton.Group
  // This needs to be a string that matches one of the option values
  const currentRadioValue = React.useMemo(() => {
    if (selectedValue === undefined || selectedValue === null) return '';
    
    // Find the matching option and use its stringified value
    const matchingOption = options.find(option => isEqualValue(option.value, selectedValue));
    if (matchingOption) {
      return typeof matchingOption.value === 'object' 
        ? safeStringify(matchingOption.value) 
        : String(matchingOption.value);
    }
    
    // Fallback: stringify the selectedValue directly
    return typeof selectedValue === 'object' 
      ? safeStringify(selectedValue) 
      : String(selectedValue);
  }, [selectedValue, options]);

  // For debugging
  console.log('RadioButtonGroup render:', { 
    selectedValue: selectedValue ? (typeof selectedValue === 'object' ? JSON.stringify(selectedValue) : selectedValue) : 'undefined',
    currentRadioValue,
    optionsCount: options.length,
    firstOption: options.length > 0 ? options[0].label : 'none'
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.custom.subtleText }]}>
          {label}
        </Text>
      )}
      
      <RadioButton.Group
        value={currentRadioValue}
        onValueChange={(value) => {
          // Find the option with the matching value
          const selectedOption = options.find(option => {
            const optionStringValue = typeof option.value === 'object' 
              ? safeStringify(option.value) 
              : String(option.value);
            return optionStringValue === value;
          });
          
          if (selectedOption) {
            onSelect(selectedOption.value);
          }
        }}
      >
        <View>
          {options.map((option, index) => {
            // For object values, stringify them for comparison
            const optionStringValue = typeof option.value === 'object' 
              ? safeStringify(option.value) 
              : String(option.value);
            
            // Check if this option is selected
            const isSelected = currentRadioValue === optionStringValue;
            
            return (
              <View key={index} style={styles.optionRow}>
                <RadioButton.Item
                  label={option.label}
                  value={optionStringValue}
                  status={isSelected ? 'checked' : 'unchecked'}
                  labelStyle={[
                    styles.radioLabel,
                    { color: theme.colors.onSurface }
                  ]}
                  style={[
                    styles.radioItem,
                    { 
                      backgroundColor: isSelected 
                        ? theme.custom.surface2 
                        : 'transparent',
                      borderRadius: theme.customRoundness.s
                    }
                  ]}
                  color={theme.colors.primary}
                />
              </View>
            );
          })}
        </View>
      </RadioButton.Group>
      
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    marginLeft: -8, // Offset the padding of RadioButton.Item
  },
  optionRow: {
    marginBottom: 4,
  },
  radioItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  radioLabel: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default RadioButtonGroup; 