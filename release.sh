#!/bin/bash

# Blueshift React Native Plugin Release Script
# Usage: ./release.sh <version>
# Example: ./release.sh 1.0.0

set -e # Exit on any error

# Check if a version was provided
if [ $# -eq 0 ]; then
  echo "Error: No version specified"
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 1.0.0"
  exit 1
fi

NEW_VERSION=$1

# Validate version format (simple check for x.y.z pattern)
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: Version must be in the format x.y.z (e.g., 1.0.0)"
  exit 1
fi

echo "Preparing release for version $NEW_VERSION"

# Update version in android/build.gradle
echo "Updating version in android/build.gradle"
perl -i -pe "s/ext\.pluginVersion = '[0-9]+\.[0-9]+\.[0-9]+'/ext.pluginVersion = '$NEW_VERSION'/g" android/build.gradle

# Update version in package.json
echo "Updating version in package.json"
perl -i -pe "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"$NEW_VERSION\"/g" package.json

# Update version in ios/BlueshiftBridge.h
echo "Updating version in ios/BlueshiftBridge.h"
perl -i -pe "s/#define kBlueshiftReactSDKVersion \@\"[0-9]+\.[0-9]+\.[0-9]+\"/#define kBlueshiftReactSDKVersion \@\"$NEW_VERSION\"/g" ios/BlueshiftBridge.h

echo "Version updated to $NEW_VERSION in all files"

# Verify the changes
echo "Verifying changes..."
GRADLE_VERSION=$(grep "ext.pluginVersion" android/build.gradle | grep -o "'[0-9]\+\.[0-9]\+\.[0-9]\+'" | tr -d "'")
PACKAGE_VERSION=$(grep "\"version\"" package.json | grep -o "\"[0-9]\+\.[0-9]\+\.[0-9]\+\"" | tr -d "\"")
IOS_VERSION=$(grep "kBlueshiftReactSDKVersion" ios/BlueshiftBridge.h | grep -o "@\"[0-9]\+\.[0-9]\+\.[0-9]\+\"" | tr -d "@\"")

echo "android/build.gradle: $GRADLE_VERSION"
echo "package.json: $PACKAGE_VERSION"
echo "ios/BlueshiftBridge.h: $IOS_VERSION"

# Check if all versions match
if [ "$GRADLE_VERSION" != "$NEW_VERSION" ] || [ "$PACKAGE_VERSION" != "$NEW_VERSION" ] || [ "$IOS_VERSION" != "$NEW_VERSION" ]; then
  echo "Error: Version update failed. Not all files were updated correctly."
  exit 1
fi

echo "All files updated successfully!"

# For testing only - dry run npm publish
echo "Performing dry run of npm publish..."
npm publish --dry-run

echo "Release preparation complete for version $NEW_VERSION"
echo "To publish to npm, run: npm publish"