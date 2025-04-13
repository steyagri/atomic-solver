const en = {
  common: {
    appName: 'Atomic Solver',
    calculate: 'Calculate',
    clear: 'Clear',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    dismiss: 'Dismiss',
    select: 'Select',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    exportPDF: 'Export to PDF',
    language: 'Language',
    english: 'English',
    french: 'French',
    arabic: 'Arabic',
    settings: 'Settings',
    restart_title: 'Restart Required',
    restart_message: 'The app needs to restart to apply the language direction change.',
    restart: 'Restart Now',
    clearSearch: 'Clear search',
    notAvailable: 'N/A',
    poweredBy: 'Powered by SSC (Secure Shield Consulting)',
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      title: 'Theme'
    }
  },
  auth: {
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Enter your password to continue',
    password: 'Password',
    login: 'Login',
    passwordRequired: 'Please enter your password',
    invalidPassword: 'Invalid password. Please try again.',
    loginError: 'An error occurred during login. Please try again.',
    passwordHelp: 'Enter the administrator password',
    forgotPassword: 'Forgot Password?',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    yes: 'Yes',
    no: 'No',
    sessionExpired: 'Your session has expired. Please log in again.',
    appExpired: 'Application has expired. Please contact support.'
  },
  calculator: {
    solutionType: 'Solution Type',
    solidChemical: 'Solid Chemical',
    liquidChemical: 'Liquid Chemical',
    chemicalSelection: 'Chemical Selection',
    selectChemical: 'Select a chemical',
    clickToChoose: 'Click to choose',
    chemicalProperties: 'Chemical Properties',
    purity: 'Purity',
    hydrationState: 'Hydration State',
    stockSolution: 'Stock Solution Concentration',
    stockConcentrationUnit: 'Stock Concentration Unit',
    targetParameters: 'Target Solution Parameters',
    finalConcentration: 'Final Concentration',
    concentrationType: 'Concentration Type',
    finalVolume: 'Final Volume (mL)',
    molar: 'Molar',
    massPerLiter: 'g/L',
    percentage: 'Percentage',
    molarUnit: 'Molar (M)',
    percentUnit: 'Percent (%)',
    searchChemicals: 'Search by name or formula...',
    noChemicalsFound: 'No chemicals found matching',
    resultsfound: 'results found',
    preparationDetails: 'Preparation Details',
    preparatorName: 'Preparator Name',
    preparationDate: 'Preparation Date:',
    expirationDate: 'Expiration Date:',
    daysFromPreparation: '(15 days from preparation)',
    enterConcentration: 'Enter the concentration of your stock solution',
    enterFinalConcentration: 'Enter the desired final concentration',
    enterFinalVolume: 'Enter the desired final volume in milliliters',
    enterPreparatorName: 'Enter the name of the person preparing the solution',
    mw: 'MW',
    density: 'Density',
    // Validation messages
    validationErrors: {
      requiredField: 'This field is required',
      validConcentration: 'Please enter a valid concentration',
      validVolume: 'Please enter a valid volume',
      selectChemical: 'Please select a chemical',
      selectPurity: 'Please select a purity level',
      selectHydration: 'Please select a hydration state',
      selectConcentrationUnit: 'Please select a concentration unit',
      correctErrors: 'Please correct the errors before calculating',
      positiveConcentration: 'Final concentration must be greater than 0',
      highConcentration: 'Final concentration seems unreasonably high',
      positiveVolume: 'Final volume must be greater than 0',
      highVolume: 'Final volume seems unreasonably high (>1,000 L)',
      maxPercentage: 'Mass percentage cannot exceed 100%',
      purityRange: 'Purity must be between 0 and 100%',
      higherConcentration: 'Stock solution concentration must be higher than target concentration'
    }
  },
  results: {
    solutionPreparationResults: 'Solution Preparation Results',
    calculationResult: 'Calculation Result',
    calculationResults: 'Calculation Results',
    massToDissolve: 'Mass to Dissolve:',
    stockSolutionVolume: 'Stock Solution Volume:',
    waterVolume: 'Water Volume:',
    targetConcentration: 'Target Concentration:',
    finalVolume: 'Final Volume:',
    stepByStepInstructions: 'Step-by-Step Instructions',
    steps: {
      weighSolid: 'Weigh {{value}} of the solid chemical.',
      addSolidToContainer: 'Add the solid to a clean container.',
      addMostWater: 'Add approximately 70% of the final volume of water.',
      stirUntilDissolved: 'Stir until completely dissolved.',
      addWaterToFinalVolume: 'Add water to reach the final volume of {{value}}.',
      measureWater: 'Measure {{value}} of water into a clean container.',
      addStockSolution: 'Carefully add {{value}} of the stock solution.',
      mixThoroughly: 'Mix thoroughly to ensure homogeneity.',
      finalVolumeShouldBe: 'The final volume should be {{value}}.'
    },
    calculationFormulas: 'Calculation Formulas',
    formulasUsed: 'Formulas Used:',
    where: 'Where:',
    formulas: {
      massToDissolve: 'Mass to dissolve = (C × V × H) / P',
      stockVolume: 'Stock volume = (C₂ × V₂) / C₁',
      waterVolume: 'Water volume = V₂ - Stock volume'
    },
    formulaLegend: {
      c: '• C = Target concentration',
      v: '• V = Final volume',
      h: '• H = Hydration factor (1 + n × 18.015/M)',
      p: '• P = Purity (as decimal)',
      n: '• n = Number of water molecules',
      m: '• M = Molar mass of anhydrous compound',
      c1: '• C₁ = Initial concentration',
      c2: '• C₂ = Target concentration',
      v2: '• V₂ = Final volume'
    },
    labSafetyTips: 'Laboratory Safety Tips',
    safetyTips: {
      wearPPE: {
        title: 'Always wear appropriate PPE',
        desc: 'Including lab coat, safety glasses, and gloves.'
      },
      ventilation: {
        title: 'Work in a well-ventilated area',
        desc: 'Use a fume hood when working with volatile chemicals.'
      },
      labeling: {
        title: 'Label all solutions',
        desc: 'Include name, concentration, date prepared, and your initials.'
      },
      wasteDisposal: {
        title: 'Dispose of waste properly',
        desc: 'Follow your institution\'s waste disposal guidelines.'
      }
    },
    pdfGenerated: 'PDF generated successfully',
    pdfFailed: 'Failed to generate PDF',
    performCalculation: 'Please perform a calculation first',
    enterPreparatorName: 'Please enter the preparator name',
    noChemicalSelected: 'No chemical selected'
  },
  pdf: {
    title: 'Chemical Solution Calculation Report',
    reportTitle: 'Chemical Solution Preparation Report',
    reportSubtitle: 'Detailed calculation and preparation instructions',
    chemicalInformation: 'Chemical Information',
    chemicalName: 'Chemical Name',
    chemicalFormula: 'Chemical Formula',
    molecularWeight: 'Molecular Weight',
    solutionProperties: 'Solution Properties',
    preparationInstructions: 'Preparation Instructions',
    solutionDocumentation: 'Solution Documentation',
    importantNotes: 'Important Notes',
    qrCode: 'QR Code for digital verification',
    generatedBy: 'Generated by {{appName}} v1.0.0',
    generationTime: 'Report Generation Time: {{time}}',
    electronicDocument: 'This is an electronically generated document. No signature required.',
    steps: {
      weighSolid: 'Weigh {{value}} of {{chemical}}.',
      addToFlask: 'Add the chemical to a volumetric flask.',
      addPartialWater: 'Add approximately 2/3 of the final volume of distilled water and mix gently until completely dissolved.',
      fillToMark: 'Fill to the {{value}} mark with distilled water.',
      measureStock: 'Measure {{value}} of {{chemical}} solution.',
      pourIntoFlask: 'Pour into a volumetric flask.',
      addWater: 'Add {{value}} of distilled water.'
    },
    notes: {
      expirationWarning: 'This solution must be used within the specified expiration date',
      verifyCalculation: 'Verify the calculation results before preparing the solution',
      followProtocols: 'Follow all laboratory safety protocols during preparation',
      documentObservations: 'Document any observations or deviations during preparation'
    },
    permissions: {
      title: 'Storage Permission Required',
      message: 'AtomicSolver needs access to your storage to save the PDF',
      askLater: 'Ask Me Later',
      cancel: 'Cancel',
      ok: 'OK'
    },
    storagePermissionRequired: 'Storage permission is required to save the PDF',
    fileGenerationFailed: 'Failed to generate PDF file',
    shareTitle: 'Share Chemical Calculation PDF',
    shareSubject: 'Chemical Solution Calculation'
  }
};

export default en; 