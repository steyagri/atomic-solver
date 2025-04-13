import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../theme/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  error?: string;
  helperText?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  right?: React.ReactNode;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  error,
  helperText,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  right,
  disabled = false,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        error={!!error}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        right={right}
        disabled={disabled}
        style={styles.input}
        outlineStyle={{ borderRadius: theme.customRoundness.s }}
      />
      
      {(error || helperText) && (
        <Text
          style={[
            styles.helperText,
            {
              color: error ? theme.colors.error : theme.custom.subtleText,
            },
          ]}
        >
          {error || helperText}
        </Text>
      )}
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
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField; 