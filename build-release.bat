@echo off
REM Script to build release APK

cd %~dp0
cd android

echo Building release APK...
call gradlew.bat assembleRelease

if %ERRORLEVEL% == 0 (
  echo Build completed successfully!
  echo The APK is located at: %CD%\app\build\outputs\apk\release\app-release.apk
) else (
  echo Build failed!
) 