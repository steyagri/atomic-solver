const fr = {
  common: {
    appName: 'Atomic Solver',
    calculate: 'Calculer',
    clear: 'Effacer',
    error: 'Erreur',
    success: 'Succès',
    loading: 'Chargement...',
    dismiss: 'Fermer',
    select: 'Sélectionner',
    back: 'Retour',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    exportPDF: 'Export PDF',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français',
    arabic: 'Arabe',
    settings: 'Paramètres',
    restart_title: 'Redémarrage Requis',
    restart_message: 'L\'application doit redémarrer pour appliquer le changement de direction de la langue.',
    restart: 'Redémarrer Maintenant',
    clearSearch: 'Effacer la recherche',
    notAvailable: 'N/D',
    poweredBy: 'Propulsé par SSC (Secure Shield Consulting)',
    theme: {
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',
      title: 'Thème'
    }
  },
  auth: {
    loginTitle: 'Bienvenue',
    loginSubtitle: 'Entrez votre mot de passe pour continuer',
    password: 'Mot de passe',
    login: 'Connexion',
    passwordRequired: 'Veuillez entrer votre mot de passe',
    invalidPassword: 'Mot de passe invalide. Veuillez réessayer.',
    loginError: 'Une erreur est survenue. Veuillez réessayer.',
    passwordHelp: 'Entrez le mot de passe administrateur',
    forgotPassword: 'Mot de passe oublié ?',
    logout: 'Déconnexion',
    logoutConfirm: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    yes: 'Oui',
    no: 'Non',
    sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
    appExpired: 'L\'application a expiré. Veuillez contacter le support.'
  },
  calculator: {
    solutionType: 'Type de Solution',
    solidChemical: 'Produit Solide',
    liquidChemical: 'Produit Liquide',
    chemicalSelection: 'Sélection Chimique',
    selectChemical: 'Choisir un produit',
    clickToChoose: 'Cliquer pour choisir',
    chemicalProperties: 'Propriétés',
    purity: 'Pureté',
    hydrationState: 'Hydratation',
    stockSolution: 'Solution Mère',
    stockConcentrationUnit: 'Unité de Concentration',
    targetParameters: 'Paramètres Cibles',
    finalConcentration: 'Concentration Finale',
    concentrationType: 'Type de Concentration',
    finalVolume: 'Volume Final (mL)',
    molar: 'Molaire',
    massPerLiter: 'g/L',
    percentage: 'Pourcentage',
    molarUnit: 'Molaire (M)',
    percentUnit: 'Pourcent (%)',
    searchChemicals: 'Rechercher...',
    noChemicalsFound: 'Aucun produit trouvé pour',
    resultsfound: 'résultats trouvés',
    preparationDetails: 'Détails de Préparation',
    preparatorName: 'Préparateur',
    preparationDate: 'Date de Préparation:',
    expirationDate: 'Date d\'Expiration:',
    daysFromPreparation: '(15 jours après préparation)',
    enterConcentration: 'Entrez la concentration de la solution mère',
    enterFinalConcentration: 'Entrez la concentration finale',
    enterFinalVolume: 'Entrez le volume final en mL',
    enterPreparatorName: 'Entrez le nom du préparateur',
    mw: 'MM',
    density: 'Densité',
    // Validation messages
    validationErrors: {
      requiredField: 'Champ obligatoire',
      validConcentration: 'Concentration invalide',
      validVolume: 'Volume invalide',
      selectChemical: 'Sélectionnez un produit',
      selectPurity: 'Sélectionnez la pureté',
      selectHydration: 'Sélectionnez l\'hydratation',
      selectConcentrationUnit: 'Sélectionnez l\'unité',
      correctErrors: 'Corrigez les erreurs',
      positiveConcentration: 'La concentration doit être supérieure à 0',
      highConcentration: 'La concentration semble anormalement élevée',
      positiveVolume: 'Le volume doit être supérieur à 0',
      highVolume: 'Le volume semble anormalement élevé (>1.000 L)',
      maxPercentage: 'Le pourcentage ne peut pas dépasser 100%',
      purityRange: 'La pureté doit être entre 0 et 100%',
      higherConcentration: 'La concentration de la solution mère doit être supérieure à la concentration cible'
    }
  },
  results: {
    solutionPreparationResults: 'Résultats de Préparation',
    calculationResult: 'Résultat du Calcul',
    calculationResults: 'Résultats des Calculs',
    massToDissolve: 'Masse à Dissoudre:',
    stockSolutionVolume: 'Vol. Solution Mère:',
    waterVolume: 'Vol. d\'Eau:',
    targetConcentration: 'Concentration Cible:',
    finalVolume: 'Volume Final:',
    stepByStepInstructions: 'Instructions Étape par Étape',
    steps: {
      weighSolid: 'Peser {{value}} du produit solide.',
      addSolidToContainer: 'Ajouter le solide dans un récipient propre.',
      addMostWater: 'Ajouter environ 70% du volume d\'eau.',
      stirUntilDissolved: 'Agiter jusqu\'à dissolution.',
      addWaterToFinalVolume: 'Compléter avec de l\'eau jusqu\'à {{value}}.',
      measureWater: 'Mesurer {{value}} d\'eau dans un récipient.',
      addStockSolution: 'Ajouter {{value}} de solution mère.',
      mixThoroughly: 'Mélanger pour homogénéiser.',
      finalVolumeShouldBe: 'Le volume final devrait être {{value}}.'
    },
    calculationFormulas: 'Formules de Calcul',
    formulasUsed: 'Formules Utilisées:',
    where: 'Où:',
    formulas: {
      massToDissolve: 'Masse à dissoudre = (C × V × H) / P',
      stockVolume: 'Volume solution mère = (C₂ × V₂) / C₁',
      waterVolume: 'Volume d\'eau = V₂ - Volume solution mère'
    },
    formulaLegend: {
      c: '• C = Concentration cible',
      v: '• V = Volume final',
      h: '• H = Facteur d\'hydratation (1 + n × 18,015/M)',
      p: '• P = Pureté (décimal)',
      n: '• n = Nb. molécules d\'eau',
      m: '• M = Masse molaire du composé anhydre',
      c1: '• C₁ = Concentration initiale',
      c2: '• C₂ = Concentration cible',
      v2: '• V₂ = Volume final'
    },
    labSafetyTips: 'Conseils de Sécurité',
    safetyTips: {
      wearPPE: {
        title: 'Porter les EPI appropriés',
        desc: 'Blouse, lunettes et gants de laboratoire.'
      },
      ventilation: {
        title: 'Travailler en zone ventilée',
        desc: 'Utiliser une hotte pour produits volatils.'
      },
      labeling: {
        title: 'Étiqueter les solutions',
        desc: 'Nom, concentration, date et initiales.'
      },
      wasteDisposal: {
        title: 'Éliminer les déchets correctement',
        desc: 'Suivre les directives institutionnelles.'
      }
    },
    pdfGenerated: 'PDF généré avec succès',
    pdfFailed: 'Échec de génération PDF',
    performCalculation: 'Effectuez un calcul d\'abord',
    enterPreparatorName: 'Entrez le nom du préparateur',
    noChemicalSelected: 'Produit non sélectionné'
  },
  pdf: {
    title: 'Rapport de Calcul de Solution Chimique',
    reportTitle: 'Rapport de Préparation de Solution Chimique',
    reportSubtitle: 'Instructions détaillées de calcul et de préparation',
    chemicalInformation: 'Informations sur le Produit',
    chemicalName: 'Nom du Produit',
    chemicalFormula: 'Formule Chimique',
    molecularWeight: 'Masse Moléculaire',
    solutionProperties: 'Propriétés de la Solution',
    preparationInstructions: 'Instructions de Préparation',
    solutionDocumentation: 'Documentation de la Solution',
    importantNotes: 'Notes Importantes',
    qrCode: 'Code QR pour vérification numérique',
    generatedBy: 'Généré par {{appName}} v1.0.0',
    generationTime: 'Date de génération du rapport: {{time}}',
    electronicDocument: 'Ceci est un document généré électroniquement. Aucune signature requise.',
    steps: {
      weighSolid: 'Peser {{value}} du produit {{chemical}}.',
      addToFlask: 'Ajouter le produit dans une fiole jaugée.',
      addPartialWater: 'Ajouter environ 2/3 du volume final d\'eau distillée et mélanger doucement jusqu\'à dissolution complète.',
      fillToMark: 'Compléter avec de l\'eau distillée jusqu\'au repère {{value}}.',
      measureStock: 'Mesurer {{value}} de solution de {{chemical}}.',
      pourIntoFlask: 'Verser dans une fiole jaugée.',
      addWater: 'Ajouter {{value}} d\'eau distillée.'
    },
    notes: {
      expirationWarning: 'Cette solution doit être utilisée avant la date d\'expiration spécifiée',
      verifyCalculation: 'Vérifiez les résultats du calcul avant de préparer la solution',
      followProtocols: 'Suivez tous les protocoles de sécurité du laboratoire pendant la préparation',
      documentObservations: 'Documentez toute observation ou écart pendant la préparation'
    },
    permissions: {
      title: 'Permission de Stockage Requise',
      message: 'AtomicSolver a besoin d\'accéder à votre stockage pour enregistrer le PDF',
      askLater: 'Demander Plus Tard',
      cancel: 'Annuler',
      ok: 'OK'
    },
    storagePermissionRequired: 'La permission de stockage est requise pour enregistrer le PDF',
    fileGenerationFailed: 'Échec de la génération du fichier PDF',
    shareTitle: 'Partager le PDF de Calcul Chimique',
    shareSubject: 'Calcul de Solution Chimique'
  }
};

export default fr; 