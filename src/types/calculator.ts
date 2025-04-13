export type ConcentrationType = 'molar' | 'mass' | 'massPercent';

export interface SolidChemical {
  name: string;
  formula: string;
  molecular_weight: number;
  purities: number[];
  hydration_states: {
    [key: string]: number;
  };
  selectedPurity?: number;
  selectedHydrationState?: { name: string; value: number };
}

export interface LiquidChemical {
  // Primary property names
  compound_name: string;
  chemical_formula: string;
  molar_mass: number;
  density: string;
  concentration?: number;
  concentration_unit?: string;
  
  // Alternative property names for compatibility
  name?: string;           // Alternative for compound_name
  formula?: string;        // Alternative for chemical_formula  
  molecular_weight?: number; // Alternative for molar_mass
  mw?: number;             // Another alternative for molar_mass
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CalculationInput {
  solutionType: 'solid' | 'liquid';
  chemical: SolidChemical | LiquidChemical;
  finalConcentration: number;
  finalConcentrationType: ConcentrationType;
  finalVolume: number;
  selectedPurity?: number;
  selectedHydrationState?: { name: string; value: number };
}

export interface CalculationResult {
  success: boolean;
  data?: {
    target_concentration: string;
    final_volume: string;
    concentration_unit: string;
    massToDissolve?: number;
    stockVolume?: number;
    waterVolume?: number;
  };
  error?: string;
}

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
}; 