#!/bin/bash
# for local building
# clone and make your own
# Exit on error
set -e

# Optional: make sure we're in the correct project root
cd "$(dirname "$0")"

# Build your project
echo "🚀 Running yarn build..."
yarn build

# Optional: source your shell config to get aliases
# source ~/.zshrc   # if alias lives here
# source ~/.bashrc  # or this if you're using bash

echo "🔄 Synker view-resources til my_cluster..."
rsync -avz --progress --delete ~/Repos/view-resources -e ssh my_cluster:/home/cust

echo "✅ Ferdig!"