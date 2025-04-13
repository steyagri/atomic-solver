const ar = {
  common: {
    appName: 'الحالل الذري',
    calculate: 'حساب',
    clear: 'مسح',
    error: 'خطأ',
    success: 'نجاح',
    loading: 'جاري التحميل...',
    dismiss: 'إغلاق',
    select: 'اختيار',
    back: 'رجوع',
    save: 'حفظ',
    cancel: 'إلغاء',
    exportPDF: 'تصدير PDF',
    language: 'اللغة',
    english: 'الإنجليزية',
    french: 'الفرنسية',
    arabic: 'العربية',
    settings: 'الإعدادات',
    restart_title: 'إعادة التشغيل مطلوبة',
    restart_message: 'يحتاج التطبيق إلى إعادة التشغيل لتطبيق تغيير اتجاه اللغة.',
    restart: 'إعادة التشغيل الآن',
    clearSearch: 'مسح البحث',
    notAvailable: 'غير متوفر',
    poweredBy: 'مدعوم بواسطة SSC (Secure Shield Consulting)',
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
      title: 'السمة'
    }
  },
  auth: {
    loginTitle: 'مرحباً بعودتك',
    loginSubtitle: 'أدخل كلمة المرور للمتابعة',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    passwordRequired: 'الرجاء إدخال كلمة المرور',
    invalidPassword: 'كلمة مرور غير صحيحة. الرجاء المحاولة مرة أخرى.',
    loginError: 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.',
    passwordHelp: 'أدخل كلمة مرور المسؤول',
    forgotPassword: 'نسيت كلمة المرور؟',
    logout: 'تسجيل الخروج',
    logoutConfirm: 'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
    yes: 'نعم',
    no: 'لا',
    sessionExpired: 'انتهت جلستك. الرجاء تسجيل الدخول مرة أخرى.',
    appExpired: 'انتهت صلاحية التطبيق. يرجى الاتصال بالدعم.'
  },
  calculator: {
    solutionType: 'نوع المحلول',
    solidChemical: 'مادة صلبة',
    liquidChemical: 'مادة سائلة',
    chemicalSelection: 'اختيار المادة',
    selectChemical: 'اختر مادة',
    clickToChoose: 'انقر للاختيار',
    chemicalProperties: 'الخصائص',
    purity: 'النقاء',
    hydrationState: 'الترطيب',
    stockSolution: 'المحلول الأم',
    stockConcentrationUnit: 'وحدة التركيز',
    targetParameters: 'معايير الهدف',
    finalConcentration: 'التركيز النهائي',
    concentrationType: 'نوع التركيز',
    finalVolume: 'الحجم النهائي (مل)',
    molar: 'مولاري',
    massPerLiter: 'جم/لتر',
    percentage: 'نسبة مئوية',
    molarUnit: 'مولاري (M)',
    percentUnit: 'نسبة مئوية (%)',
    searchChemicals: 'بحث...',
    noChemicalsFound: 'لم يتم العثور على مواد لـ',
    resultsfound: 'نتائج وجدت',
    preparationDetails: 'تفاصيل التحضير',
    preparatorName: 'اسم المُحضِّر',
    preparationDate: 'تاريخ التحضير:',
    expirationDate: 'تاريخ الانتهاء:',
    daysFromPreparation: '(15 يوم من التحضير)',
    enterConcentration: 'أدخل تركيز المحلول الأم',
    enterFinalConcentration: 'أدخل التركيز النهائي',
    enterFinalVolume: 'أدخل الحجم النهائي بالمليلتر',
    enterPreparatorName: 'أدخل اسم المُحضِّر',
    mw: 'الوزن الجزيئي',
    density: 'الكثافة',
    // Validation messages
    validationErrors: {
      requiredField: 'حقل مطلوب',
      validConcentration: 'تركيز غير صالح',
      validVolume: 'حجم غير صالح',
      selectChemical: 'اختر مادة',
      selectPurity: 'اختر النقاء',
      selectHydration: 'اختر الترطيب',
      selectConcentrationUnit: 'اختر وحدة التركيز',
      correctErrors: 'صحح الأخطاء',
      positiveConcentration: 'التركيز يجب أن يكون أكبر من 0',
      highConcentration: 'التركيز يبدو مرتفعًا بشكل غير معقول',
      positiveVolume: 'الحجم يجب أن يكون أكبر من 0',
      highVolume: 'الحجم يبدو مرتفعًا بشكل غير معقول (>1,000 لتر)',
      maxPercentage: 'النسبة المئوية لا يمكن أن تتجاوز 100٪',
      purityRange: 'النقاء يجب أن يكون بين 0 و 100٪',
      higherConcentration: 'تركيز المحلول الأم يجب أن يكون أعلى من التركيز المستهدف'
    }
  },
  results: {
    solutionPreparationResults: 'نتائج التحضير',
    calculationResult: 'نتيجة الحساب',
    calculationResults: 'نتائج الحساب',
    massToDissolve: 'الكتلة للإذابة:',
    stockSolutionVolume: 'حجم المحلول الأم:',
    waterVolume: 'حجم الماء:',
    targetConcentration: 'التركيز المستهدف:',
    finalVolume: 'الحجم النهائي:',
    stepByStepInstructions: 'خطوات التحضير',
    steps: {
      weighSolid: 'زن {{value}} من المادة الصلبة.',
      addSolidToContainer: 'أضف المادة الصلبة إلى وعاء نظيف.',
      addMostWater: 'أضف حوالي 70% من الماء.',
      stirUntilDissolved: 'حرك حتى الذوبان.',
      addWaterToFinalVolume: 'أضف الماء للوصول إلى {{value}}.',
      measureWater: 'قس {{value}} من الماء في وعاء.',
      addStockSolution: 'أضف {{value}} من المحلول الأم.',
      mixThoroughly: 'امزج جيدًا.',
      finalVolumeShouldBe: 'الحجم النهائي {{value}}.'
    },
    calculationFormulas: 'صيغ الحساب',
    formulasUsed: 'الصيغ المستخدمة:',
    where: 'حيث:',
    formulas: {
      massToDissolve: 'الكتلة = (C × V × H) / P',
      stockVolume: 'حجم المحلول الأم = (C₂ × V₂) / C₁',
      waterVolume: 'حجم الماء = V₂ - حجم المحلول الأم'
    },
    formulaLegend: {
      c: '• C = التركيز المستهدف',
      v: '• V = الحجم النهائي',
      h: '• H = عامل الترطيب (1 + n × 18.015/M)',
      p: '• P = النقاء (عدد عشري)',
      n: '• n = عدد جزيئات الماء',
      m: '• M = الكتلة المولية',
      c1: '• C₁ = التركيز الأولي',
      c2: '• C₂ = التركيز المستهدف',
      v2: '• V₂ = الحجم النهائي'
    },
    labSafetyTips: 'نصائح السلامة',
    safetyTips: {
      wearPPE: {
        title: 'ارتدِ معدات الحماية',
        desc: 'المعطف والنظارات والقفازات.'
      },
      ventilation: {
        title: 'اعمل في منطقة جيدة التهوية',
        desc: 'استخدم خزانة الأبخرة للمواد المتطايرة.'
      },
      labeling: {
        title: 'ضع ملصقات على المحاليل',
        desc: 'الاسم والتركيز والتاريخ والأحرف الأولى.'
      },
      wasteDisposal: {
        title: 'تخلص من النفايات',
        desc: 'اتبع إرشادات مؤسستك.'
      }
    },
    pdfGenerated: 'تم إنشاء PDF بنجاح',
    pdfFailed: 'فشل إنشاء PDF',
    performCalculation: 'أجرِ الحساب أولاً',
    enterPreparatorName: 'أدخل اسم المُحضِّر',
    noChemicalSelected: 'لم يتم اختيار مادة'
  },
  pdf: {
    title: 'تقرير حساب المحلول الكيميائي',
    reportTitle: 'تقرير تحضير المحلول الكيميائي',
    reportSubtitle: 'تعليمات مفصلة للحساب والتحضير',
    chemicalInformation: 'معلومات المادة الكيميائية',
    chemicalName: 'اسم المادة',
    chemicalFormula: 'الصيغة الكيميائية',
    molecularWeight: 'الوزن الجزيئي',
    solutionProperties: 'خصائص المحلول',
    preparationInstructions: 'تعليمات التحضير',
    solutionDocumentation: 'توثيق المحلول',
    importantNotes: 'ملاحظات هامة',
    qrCode: 'رمز QR للتحقق الرقمي',
    generatedBy: 'تم إنشاؤه بواسطة {{appName}} الإصدار 1.0.0',
    generationTime: 'وقت إنشاء التقرير: {{time}}',
    electronicDocument: 'هذه وثيقة منشأة إلكترونياً. لا يلزم التوقيع.',
    steps: {
      weighSolid: 'زن {{value}} من مادة {{chemical}}.',
      addToFlask: 'أضف المادة إلى دورق معايرة.',
      addPartialWater: 'أضف حوالي ثلثي الحجم النهائي من الماء المقطر وامزج برفق حتى الذوبان الكامل.',
      fillToMark: 'أكمل بالماء المقطر حتى علامة {{value}}.',
      measureStock: 'قس {{value}} من محلول {{chemical}}.',
      pourIntoFlask: 'صب في دورق معايرة.',
      addWater: 'أضف {{value}} من الماء المقطر.'
    },
    notes: {
      expirationWarning: 'يجب استخدام هذا المحلول قبل تاريخ انتهاء الصلاحية المحدد',
      verifyCalculation: 'تحقق من نتائج الحساب قبل تحضير المحلول',
      followProtocols: 'اتبع جميع بروتوكولات السلامة المختبرية أثناء التحضير',
      documentObservations: 'وثق أي ملاحظات أو انحرافات أثناء التحضير'
    },
    permissions: {
      title: 'إذن التخزين مطلوب',
      message: 'يحتاج الحالل الذري إلى الوصول إلى التخزين الخاص بك لحفظ ملف PDF',
      askLater: 'اسأل لاحقاً',
      cancel: 'إلغاء',
      ok: 'موافق'
    },
    storagePermissionRequired: 'إذن التخزين مطلوب لحفظ ملف PDF',
    fileGenerationFailed: 'فشل إنشاء ملف PDF',
    shareTitle: 'مشاركة PDF الحساب الكيميائي',
    shareSubject: 'حساب المحلول الكيميائي'
  }
};

export default ar; 