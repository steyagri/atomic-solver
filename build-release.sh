#!/bin/bash
# Script to build release APK

cd $(dirname "$0")
cd android

echo "Building release APK..."
./gradlew assembleRelease

if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
  echo "The APK is located at: $(pwd)/app/build/outputs/apk/release/app-release.apk"
else
  echo "Build failed!"
fi 