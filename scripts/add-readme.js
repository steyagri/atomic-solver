const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const productionReleasesDir = path.join(rootDir, 'production-releases');

// Function to create readme content with the correct password
function createReadmeContent(password) {
  return `# Chemical Solution Calculator

The **Chemical Solution Calculator** is a React Native application designed to accurately calculate chemical solution concentrations for both solid and liquid solutions.

## 🧪 Features
- Supports both solid and liquid chemical solutions.
- Provides accurate, real-time calculations.
- Export results as PDFs with detailed instructions and metadata.
- Built-in expiration feature — the app will no longer function after **February 2028**.

## 👥 Target Users
- Chemists  
- Lab Technicians  
- Researchers  

## ⚠️ Important Notice
This application includes an **expiration mechanism** that disables functionality after **February 2028**.

---

## 🔐 Login Password
**${password}**

---

## 🇫🇷 Calculateur de Solutions Chimiques

Le **Calculateur de Solutions Chimiques** est une application React Native conçue pour calculer avec précision les concentrations de solutions chimiques solides et liquides.

## 🧪 Fonctionnalités
- Prise en charge des solutions chimiques solides et liquides.
- Calculs précis en temps réel.
- Exportation des résultats en PDF avec des instructions détaillées et des métadonnées.
- Fonction de péremption intégrée — l'application deviendra inutilisable après **février 2028**.

## 👥 Utilisateurs Ciblés
- Chimistes  
- Techniciens de laboratoire  
- Chercheurs  

## ⚠️ Avis Important
Cette application contient un **mécanisme d'expiration** qui la rendra inutilisable après **février 2028**.

---

## 🔐 Mot de passe de connexion
**${password}**

---

## 🇸🇦 حاسبة المحاليل الكيميائية

تُعد **حاسبة المحاليل الكيميائية** تطبيقًا مبنيًا باستخدام React Native ومصممًا لحساب تركيزات المحاليل الكيميائية بدقة سواء كانت صلبة أو سائلة.

## 🧪 الميزات
- يدعم المحاليل الكيميائية الصلبة والسائلة.
- حسابات دقيقة في الوقت الفعلي.
- تصدير النتائج بصيغة PDF مع تعليمات مفصلة وبيانات وصفية.
- ميزة انتهاء الصلاحية مدمجة — سيصبح التطبيق غير قابل للاستخدام بعد **فبراير 2028**.

## 👥 الفئة المستهدفة
- الكيميائيون  
- فنيو المختبرات  
- الباحثون  

## ⚠️ ملاحظة مهمة
يتضمن هذا التطبيق **آلية انتهاء صلاحية** تجعله غير قابل للاستخدام بعد **فبراير 2028**.

---

## 🔐 كلمة مرور تسجيل الدخول
**${password}**
`;
}

// Main function to add readme files to all password folders
function addReadmeFiles() {
  // Check if production-releases directory exists
  if (!fs.existsSync(productionReleasesDir)) {
    console.error(`Error: ${productionReleasesDir} does not exist!`);
    return;
  }

  // Get all subdirectories
  const folders = fs.readdirSync(productionReleasesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${folders.length} password folders`);

  // Process each folder
  for (const folder of folders) {
    if (folder.startsWith('InNoScEnce')) {
      const password = folder;
      const readmePath = path.join(productionReleasesDir, folder, 'README.md');
      
      // Create readme content
      const content = createReadmeContent(password);
      
      // Write to file
      fs.writeFileSync(readmePath, content, 'utf8');
      console.log(`Created multilingual README.md for ${password}`);
    }
  }

  console.log('All README files have been created successfully!');
}

// Run the function
addReadmeFiles(); 