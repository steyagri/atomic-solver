const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processIcon() {
  const sourceIcon = path.join(__dirname, '../assets/icon.png');
  
  if (!fs.existsSync(sourceIcon)) {
    console.error('Source icon not found at', sourceIcon);
    return;
  }

  console.log('Processing icon from', sourceIcon);

  // Android icon sizes (mipmap directories)
  const androidIconSizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
  };

  // iOS icon sizes
  const iosIconSizes = [
    { size: 20, scales: [1, 2, 3] },
    { size: 29, scales: [1, 2, 3] },
    { size: 40, scales: [1, 2, 3] },
    { size: 60, scales: [2, 3] },
    { size: 76, scales: [1, 2] },
    { size: 83.5, scales: [2] },
    { size: 1024, scales: [1] } // App Store icon
  ];

  // Generate Android icons
  for (const [directory, size] of Object.entries(androidIconSizes)) {
    const outputDir = path.join(__dirname, `../android/app/src/main/res/${directory}`);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate square icons
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(outputDir, 'ic_launcher.png'));
      
    // Also create round versions (using a composite approach instead of circular)
    const roundMask = Buffer.from(
      `<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`
    );
    
    await sharp(sourceIcon)
      .resize(size, size)
      .composite([{
        input: roundMask,
        blend: 'dest-in'
      }])
      .toFile(path.join(outputDir, 'ic_launcher_round.png'));
  }

  console.log('Generated Android icons');

  // Generate iOS icons
  const iosIconsDir = path.join(__dirname, '../ios/AtomicSolver/Images.xcassets/AppIcon.appiconset');
  
  if (!fs.existsSync(iosIconsDir)) {
    fs.mkdirSync(iosIconsDir, { recursive: true });
  }
  
  const contents = {
    images: [],
    info: {
      version: 1,
      author: 'xcode'
    }
  };

  for (const { size, scales } of iosIconSizes) {
    for (const scale of scales) {
      const pixelSize = size * scale;
      const filename = `icon-${size}x${size}@${scale}x.png`;
      const idiom = size >= 76 ? 'ipad' : (size === 1024 ? 'ios-marketing' : 'iphone');
      
      await sharp(sourceIcon)
        .resize(pixelSize, pixelSize)
        .toFile(path.join(iosIconsDir, filename));
      
      contents.images.push({
        size: `${size}x${size}`,
        idiom,
        filename,
        scale: `${scale}x`
      });
    }
  }

  fs.writeFileSync(
    path.join(iosIconsDir, 'Contents.json'),
    JSON.stringify(contents, null, 2)
  );

  console.log('Generated iOS icons');
  console.log('App icons have been set up successfully!');
}

processIcon().catch(err => console.error('Error processing icon:', err)); 