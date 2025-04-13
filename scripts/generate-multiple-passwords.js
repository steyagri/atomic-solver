const { sha256 } = require('js-sha256');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envFilePath = path.join(rootDir, '.env');
const envTsFilePath = path.join(rootDir, 'src', 'constants', 'env.ts');

// Function to update files with new hash
function updatePasswordHash(password, hash) {
  console.log(`\nGenerating build for password: ${password}`);
  console.log(`Hash: ${hash}`);
  
  // Update .env file
  const envContent = fs.readFileSync(envFilePath, 'utf8')
    .replace(/^(HASHED_PASSWORD=).*$/m, `$1${hash}`)
    .replace(/^(# This is a SHA-256 hash for ").*(")/m, `$1${password}$2`);
  
  fs.writeFileSync(envFilePath, envContent);
  
  // Update env.ts file
  const envTsContent = fs.readFileSync(envTsFilePath, 'utf8')
    .replace(/(HASHED_PASSWORD: ').*('),/m, `$1${hash}$2,`)
    .replace(/(\/\/ This is a SHA-256 hash for ").*(")/m, `$1${password}$2`);
  
  fs.writeFileSync(envTsFilePath, envTsContent);
  
  console.log(`Files updated with hash for ${password}`);
}

// Function to build APK
function buildReleaseApk(password) {
  try {
    console.log(`Building release APK for ${password}...`);
    
    // Use Windows path style and gradlew.bat for Windows
    const androidDir = path.join(rootDir, 'android');
    process.chdir(androidDir);
    execSync('gradlew.bat assembleRelease', { stdio: 'inherit' });
    
    // Go back to the root directory
    process.chdir(rootDir);
    
    // Create a copy of the APK with a specific name for this password
    const sourcePath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
    const destPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', `app-release-${password}.apk`);
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`APK saved as ${destPath}`);
  } catch (error) {
    console.error(`Error building APK for ${password}:`, error);
  }
}

// Main function to generate builds for multiple passwords
async function generateMultipleBuilds() {
  const passwords = [];
  
  // Generate passwords from InNoScEnce02 to InNoScEnce12
  for(let i = 2; i <= 12; i++) {
    const password = `InNoScEnce${i.toString().padStart(2, '0')}`;
    passwords.push(password);
  }
  
  console.log(`Will generate ${passwords.length} builds with passwords: ${passwords.join(', ')}`);
  
  // Process each password
  for (const password of passwords) {
    const hash = sha256(password);
    updatePasswordHash(password, hash);
    buildReleaseApk(password);
  }
  
  console.log('\nAll builds completed!');
}

// Run the script
generateMultipleBuilds(); 