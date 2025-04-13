import { CalculationInput, CalculationResult, SolidChemical, LiquidChemical, ConcentrationType } from '../types/calculator';
import { validateCalculatorInput } from './validation';

interface VolumeCalculationResult {
  volumeToWithdraw: number;
  convertedInitialConc?: number;
  error?: string;
}

export function calculateVolumeToWithdraw(
  c1: number,
  c2: number,
  v2: number,
  initialType: 'molar' | 'mass' | 'massPercent',
  molarMass?: number,
  density?: number
): VolumeCalculationResult {
  let convertedC1 = c1;
  let convertedInitialConc;

  // Input validation
  if (c1 <= 0 || c2 <= 0 || v2 <= 0) {
    return { 
      volumeToWithdraw: 0, 
      error: 'All values must be positive numbers.' 
    };
  }

  if (c1 <= c2) {
    return { 
      volumeToWithdraw: 0, 
      error: 'Initial concentration must be greater than target concentration.' 
    };
  }

  // Convert concentrations to molar if needed
  if (initialType === 'mass' && molarMass) {
    convertedC1 = c1 / molarMass;
    convertedInitialConc = convertedC1;
  } else if (initialType === 'massPercent' && density) {
    // Convert mass percentage to g/L first
    const massConc = (c1 / 100) * density * 1000; // Convert density from g/mL to g/L
    if (molarMass) {
      convertedC1 = massConc / molarMass;
      convertedInitialConc = convertedC1;
    }
  }

  // Calculate volume to withdraw using C1V1 = C2V2
  const volumeToWithdraw = (c2 * v2) / convertedC1;

  return {
    volumeToWithdraw,
    convertedInitialConc
  };
}

export function calculateSolution(input: CalculationInput): CalculationResult {
  // Validate input
  const validationResult = validateCalculatorInput(input);
  if (!validationResult.isValid) {
    return {
      success: false,
      error: validationResult.errors[0]?.message || 'Invalid input'
    };
  }

  try {
    if (input.solutionType === 'solid') {
      return calculateSolidSolution(input);
    } else {
      return calculateLiquidSolution(input);
    }
  } catch (error) {
    return {
      success: false,
      error: 'Calculation error: ' + (error instanceof Error ? error.message : String(error))
    };
  }
}

function calculateSolidSolution(input: CalculationInput): CalculationResult {
  const chemical = input.chemical as SolidChemical;
  const purity = input.selectedPurity || 100;
  const hydrationState = input.selectedHydrationState || { name: 'anhydrous', value: 0 };
  
  // Calculate hydration factor
  const waterMolarMass = 18.015; // g/mol
  const hydrationFactor = 1 + (hydrationState.value * waterMolarMass / chemical.molecular_weight);
  
  let massToDissolve: number;
  let concentrationUnit: string;
  
  if (input.finalConcentrationType === 'molar') {
    // Calculate mass for molar concentration
    massToDissolve = (input.finalConcentration * input.finalVolume * chemical.molecular_weight * hydrationFactor) / (purity / 100);
    concentrationUnit = 'M';
  } else if (input.finalConcentrationType === 'mass') {
    // Calculate mass for mass concentration (g/L)
    massToDissolve = (input.finalConcentration * input.finalVolume) / (purity / 100);
    concentrationUnit = 'g/L';
  } else {
    // Calculate mass for mass percentage (% w/v)
    massToDissolve = (input.finalConcentration * input.finalVolume * 10) / (purity / 100);
    concentrationUnit = '% (w/v)';
  }
  
  return {
    success: true,
    data: {
      target_concentration: input.finalConcentration.toString(),
      final_volume: input.finalVolume.toString(),
      concentration_unit: concentrationUnit,
      massToDissolve
    }
  };
}

function calculateLiquidSolution(input: CalculationInput): CalculationResult {
  const chemical = input.chemical as LiquidChemical;
  const stockConcentration = chemical.concentration || 0;
  
  // Calculate volumes
  const stockVolume = (input.finalConcentration * input.finalVolume * 1000) / stockConcentration;
  const waterVolume = (input.finalVolume * 1000) - stockVolume;
  
  let concentrationUnit: string;
  
  if (input.finalConcentrationType === 'molar') {
    concentrationUnit = 'M';
  } else if (input.finalConcentrationType === 'mass') {
    concentrationUnit = 'g/L';
  } else {
    concentrationUnit = '% (w/v)';
  }
  
  return {
    success: true,
    data: {
      target_concentration: input.finalConcentration.toString(),
      final_volume: input.finalVolume.toString(),
      concentration_unit: concentrationUnit,
      stockVolume,
      waterVolume
    }
  };
} 