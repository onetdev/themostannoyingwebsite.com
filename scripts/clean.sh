#!/bin/bash

# Clean levels: cache (default), build, deps, nuclear
LEVEL=${1:-"cache"}

echo "🧹 Cleaning project (level: $LEVEL)..."

# 1. Always clean caches
rm -rf .turbo **/ .turbo apps/web/.next/cache
[[ -x "$(command -v pnpm)" ]] && pnpm store prune

# 2. Build artifacts
if [[ "$LEVEL" == "build" || "$LEVEL" == "deps" || "$LEVEL" == "nuclear" ]]; then
  echo "  - Removing build artifacts..."
  rm -rf apps/web/.next apps/ui-docs/storybook-static **/dist
fi

# 3. Dependencies
if [[ "$LEVEL" == "deps" || "$LEVEL" == "nuclear" ]]; then
  echo "  - Removing node_modules..."
  rm -rf node_modules **/node_modules
  
  if [[ "$LEVEL" == "nuclear" ]]; then
    echo "  - Nuclear reset: removing lockfile..."
    rm -f pnpm-lock.yaml
  fi

  echo "  - Reinstalling..."
  pnpm install
fi

echo "✨ Done."
