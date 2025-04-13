import { CalculationInput, ValidationResult, ValidationError } from '../types/calculator';
import { SolidChemical, LiquidChemical } from '../types/calculator';
import i18n from '../i18n';

export const validateCalculatorInput = (input: CalculationInput): ValidationResult => {
  const errors: ValidationError[] = [];
  const t = i18n.t;
  
  // Validate final concentration
  if (input.finalConcentration === undefined || Number.isNaN(input.finalConcentration)) {
    errors.push({
      field: 'finalConcentration',
      message: t('calculator.validationErrors.validConcentration')
    });
  } else if (input.finalConcentration <= 0) {
    errors.push({
      field: 'finalConcentration',
      message: t('calculator.validationErrors.positiveConcentration')
    });
  } else if (input.finalConcentration > 1000000) {
    errors.push({
      field: 'finalConcentration',
      message: t('calculator.validationErrors.highConcentration')
    });
  }

  // Validate final volume
  if (input.finalVolume === undefined || Number.isNaN(input.finalVolume)) {
    errors.push({
      field: 'finalVolume',
      message: t('calculator.validationErrors.validVolume')
    });
  } else if (input.finalVolume <= 0) {
    errors.push({
      field: 'finalVolume',
      message: t('calculator.validationErrors.positiveVolume')
    });
  } else if (input.finalVolume > 1000000) {
    errors.push({
      field: 'finalVolume',
      message: t('calculator.validationErrors.highVolume')
    });
  }

  // Concentration type specific validations
  if (input.finalConcentrationType === 'massPercent' && input.finalConcentration > 100) {
    errors.push({
      field: 'finalConcentration',
      message: t('calculator.validationErrors.maxPercentage')
    });
  }

  // Validate chemical selection
  if (!input.chemical) {
    errors.push({
      field: 'chemical',
      message: t('calculator.validationErrors.selectChemical')
    });
  }

  // Solid-specific validations
  if (input.solutionType === 'solid') {
    const solidChemical = input.chemical as SolidChemical;
    
    // Validate purity selection
    if (!input.selectedPurity) {
      errors.push({
        field: 'selectedPurity',
        message: t('calculator.validationErrors.selectPurity')
      });
    } else if (input.selectedPurity <= 0 || input.selectedPurity > 100) {
      errors.push({
        field: 'selectedPurity',
        message: t('calculator.validationErrors.purityRange')
      });
    }
    
    // Validate hydration state selection
    if (!input.selectedHydrationState) {
      errors.push({
        field: 'selectedHydrationState',
        message: t('calculator.validationErrors.selectHydration')
      });
    }
  }
  
  // Liquid-specific validations
  if (input.solutionType === 'liquid') {
    const liquidChemical = input.chemical as LiquidChemical;
    
    // Check if concentration is provided for liquid chemical
    if (!liquidChemical.concentration) {
      errors.push({
        field: 'concentration',
        message: t('calculator.validationErrors.requiredField')
      });
    } else if (liquidChemical.concentration <= 0) {
      errors.push({
        field: 'concentration',
        message: t('calculator.validationErrors.validConcentration')
      });
    }
    
    // Check if concentration unit is provided
    if (!liquidChemical.concentration_unit) {
      errors.push({
        field: 'concentration_unit',
        message: t('calculator.validationErrors.selectConcentrationUnit')
      });
    }
    
    // Validate that stock concentration is higher than target concentration
    // (only for molar concentrations)
    if (
      input.finalConcentrationType === 'molar' && 
      liquidChemical.concentration && 
      liquidChemical.concentration <= input.finalConcentration
    ) {
      errors.push({
        field: 'concentration',
        message: t('calculator.validationErrors.higherConcentration')
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 