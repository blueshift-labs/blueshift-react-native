#!/bin/bash

# Blueshift React Native Plugin Release Script
# Usage: ./release.sh <version> [--publish]
# Example: ./release.sh 1.0.0                  # Dry run mode
# Example: ./release.sh 1.0.0 --publish        # Git commit, tag, push and publish to npm

set -e # Exit on any error

# Default to dry run mode
PUBLISH_MODE="dry-run"

# Check if a version was provided
if [ $# -eq 0 ]; then
  echo "Error: No version specified"
  echo "Usage: ./release.sh <version> [--publish]"
  echo "Example: ./release.sh 1.0.0                  # Dry run mode"
  echo "Example: ./release.sh 1.0.0 --publish        # Git commit, tag, push and publish to npm"
  exit 1
fi

NEW_VERSION=$1
shift

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --publish) PUBLISH_MODE="publish" ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

# Check mode and settings
if [ "$PUBLISH_MODE" == "publish" ]; then
  echo "Running in PUBLISH mode - changes will be committed, tagged, pushed, and published to npm!"
else
  echo "Running in DRY RUN mode - no git operations will be performed and no npm publishing"
  echo "To publish, add flag: ./release.sh $NEW_VERSION --publish"
fi

# Validate version format (simple check for x.y.z pattern)
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: Version must be in the format x.y.z (e.g., 1.0.0)"
  exit 1
fi

echo "Preparing release for version $NEW_VERSION"

# Update version in package.json (first)
echo "Updating version in package.json"
perl -i -pe "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"$NEW_VERSION\"/g" package.json

# Update version in android/build.gradle (second)
echo "Updating version in android/build.gradle"
perl -i -pe "s/ext\.pluginVersion = '[0-9]+\.[0-9]+\.[0-9]+'/ext.pluginVersion = '$NEW_VERSION'/g" android/build.gradle

# Update version in ios/BlueshiftBridge.h (third)
echo "Updating version in ios/BlueshiftBridge.h"
perl -i -pe "s/#define kBlueshiftReactSDKVersion \@\"[0-9]+\.[0-9]+\.[0-9]+\"/#define kBlueshiftReactSDKVersion \@\"$NEW_VERSION\"/g" ios/BlueshiftBridge.h

echo "Version updated to $NEW_VERSION in all files"

# Verify the changes
echo "Verifying changes..."
PACKAGE_VERSION=$(grep "\"version\"" package.json | grep -o "\"[0-9]\+\.[0-9]\+\.[0-9]\+\"" | tr -d "\"")
GRADLE_VERSION=$(grep "ext.pluginVersion" android/build.gradle | grep -o "'[0-9]\+\.[0-9]\+\.[0-9]\+'" | tr -d "'")
IOS_VERSION=$(grep "kBlueshiftReactSDKVersion" ios/BlueshiftBridge.h | grep -o "@\"[0-9]\+\.[0-9]\+\.[0-9]\+\"" | tr -d "@\"")

echo "package.json: $PACKAGE_VERSION"
echo "android/build.gradle: $GRADLE_VERSION"
echo "ios/BlueshiftBridge.h: $IOS_VERSION"

# Check if all versions match
if [ "$GRADLE_VERSION" != "$NEW_VERSION" ] || [ "$PACKAGE_VERSION" != "$NEW_VERSION" ] || [ "$IOS_VERSION" != "$NEW_VERSION" ]; then
  echo "Error: Version update failed. Not all files were updated correctly."
  exit 1
fi

echo "All files updated successfully!"

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Perform npm publish dry-run
echo "Performing dry run of npm publish..."
npm publish --dry-run
PUBLISH_STATUS=$?

if [ $PUBLISH_STATUS -eq 0 ]; then
  echo "Dry run successful."
  
  # Git operations
  if [ "$PUBLISH_MODE" == "publish" ]; then
    echo "Proceeding with git operations..."
    
    # Commit the changes
    git add package.json android/build.gradle ios/BlueshiftBridge.h
    git commit -m "Released plugin v$NEW_VERSION"
    
    # Create a tag with v prefix
    git tag "v$NEW_VERSION"
    
    # Push to origin using current branch
    echo "Pushing changes and tag to origin..."
    git push origin $CURRENT_BRANCH
    git push origin "v$NEW_VERSION"
    
    echo "Git operations completed! Changes and tag pushed to origin."
    
    # Publish to npm
    echo "Publishing to npm..."
    npm publish
    
    if [ $? -eq 0 ]; then
      echo "Successfully published to npm!"
      echo "Release v$NEW_VERSION completed!"
    else
      echo "Failed to publish to npm. Please check for errors and try manually."
      exit 1
    fi
  else
    echo "[DRY RUN] Would execute: git add package.json android/build.gradle ios/BlueshiftBridge.h"
    echo "[DRY RUN] Would execute: git commit -m \"Released plugin v$NEW_VERSION\""
    echo "[DRY RUN] Would execute: git tag \"v$NEW_VERSION\""
    echo "[DRY RUN] Would execute: git push origin $CURRENT_BRANCH"
    echo "[DRY RUN] Would execute: git push origin v$NEW_VERSION"
    echo "[DRY RUN] Would execute: npm publish"
    echo "[DRY RUN] Release preparation complete. Run with --publish flag to perform git operations and npm publishing."
  fi
else
  echo "Dry run failed. Please fix the issues before proceeding."
  exit 1
fi