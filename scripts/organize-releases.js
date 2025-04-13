const { sha256 } = require('js-sha256');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envFilePath = path.join(rootDir, '.env');
const envTsFilePath = path.join(rootDir, 'src', 'constants', 'env.ts');
const productionReleasesDir = path.join(rootDir, 'production-releases');

// Ensure production-releases directory exists
if (!fs.existsSync(productionReleasesDir)) {
  fs.mkdirSync(productionReleasesDir, { recursive: true });
  console.log(`Created directory: ${productionReleasesDir}`);
}

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

// Function to build APK and organize it
function buildReleaseApk(password) {
  try {
    console.log(`Building release APK for ${password}...`);
    
    // Create password-specific directory
    const passwordDir = path.join(productionReleasesDir, password);
    if (!fs.existsSync(passwordDir)) {
      fs.mkdirSync(passwordDir, { recursive: true });
      console.log(`Created directory: ${passwordDir}`);
    }
    
    // Use Windows path style and gradlew.bat for Windows
    const androidDir = path.join(rootDir, 'android');
    process.chdir(androidDir);
    execSync('gradlew.bat assembleRelease', { stdio: 'inherit' });
    
    // Go back to the root directory
    process.chdir(rootDir);
    
    // Copy the APK to the password-specific directory
    const sourcePath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
    const destPath = path.join(passwordDir, 'app-release.apk');
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`APK saved as ${destPath}`);
    
    // Create a readme file with information about the password
    const readmePath = path.join(passwordDir, 'README.txt');
    const readmeContent = `AtomicSolver Release
Password: ${password}
SHA-256 Hash: ${sha256(password)}
Build Date: ${new Date().toISOString()}
`;
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`Created README at ${readmePath}`);
    
  } catch (error) {
    console.error(`Error building APK for ${password}:`, error);
  }
}

// Main function to generate builds for all passwords
async function generateAllBuilds() {
  const passwords = [];
  
  // Generate passwords from InNoScEnce01 to InNoScEnce12
  for(let i = 1; i <= 12; i++) {
    const password = `InNoScEnce${i.toString().padStart(2, '0')}`;
    passwords.push(password);
  }
  
  console.log(`Will generate ${passwords.length} builds with passwords: ${passwords.join(', ')}`);
  console.log(`Builds will be organized in: ${productionReleasesDir}`);
  
  // Process each password
  for (const password of passwords) {
    const hash = sha256(password);
    updatePasswordHash(password, hash);
    buildReleaseApk(password);
  }
  
  console.log('\nAll builds completed!');
}

// Run the script
generateAllBuilds(); 