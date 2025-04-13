import React from 'react';
import { View, StyleSheet, Platform, I18nManager, Alert } from 'react-native';
import { Button, Dialog, Portal, Text, RadioButton, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage } from '../i18n';
import type { CustomTheme } from '../theme/theme';
import RNRestart from 'react-native-restart';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme() as CustomTheme;
  const [visible, setVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(getCurrentLanguage());
  
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  
  const languages = [
    { code: 'en', name: t('common.english'), icon: 'alphabetical-variant' },
    { code: 'fr', name: t('common.french'), icon: 'alphabetical-variant' },
    { code: 'ar', name: t('common.arabic'), icon: 'alphabetical-variant' },
  ];
  
  const handleLanguageChange = async (languageCode: string) => {
    setSelectedLanguage(languageCode);
    await changeLanguage(languageCode);
    hideDialog();
    
    const isRTL = languageCode === 'ar';
    const currentlyRTL = I18nManager.isRTL;
    
    // Only force restart if RTL setting actually changes
    if (isRTL !== currentlyRTL) {
      I18nManager.forceRTL(isRTL);
      // Show confirmation dialog before restarting
      Alert.alert(
        t('common.restart_title'),
        t('common.restart_message'),
        [
          {
            text: t('common.restart'),
            onPress: () => {
              // Restart the app to properly apply RTL changes
              RNRestart.Restart();
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <Button 
        mode="outlined" 
        onPress={showDialog}
        style={[styles.languageButton, { 
          borderColor: theme.custom.divider,
          borderRadius: theme.customRoundness.m 
        }]}
        icon="translate"
      >
        {t('common.language')}
      </Button>
      
      <Portal>
        <Dialog 
          visible={visible} 
          onDismiss={hideDialog}
          style={{ 
            borderRadius: theme.customRoundness.m,
            backgroundColor: theme.colors.background 
          }}
        >
          <Dialog.Title>{t('common.language')}</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group 
              onValueChange={handleLanguageChange} 
              value={selectedLanguage}
            >
              {languages.map((lang) => (
                <RadioButton.Item
                  key={lang.code}
                  label={lang.name}
                  value={lang.code}
                  style={styles.radioItem}
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{t('common.cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioItem: {
    paddingVertical: 8,
  }
});

export default LanguageSwitcher; 