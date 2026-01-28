#!/bin/bash

# Misty Volume Bot - Quick Setup Script
# This script automates the initial setup process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

print_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

print_error() {
    echo -e "${RED}✗ ${NC}$1"
}

# Banner
echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════╗
║                                           ║
║   MISTY VOLUME BOT - QUICK SETUP          ║
║   Solana Trading Bot                      ║
║                                           ║
╚═══════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Check if Node.js is installed
print_info "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo "Please install Node.js 16 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required (current: $(node -v))"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi

print_success "npm $(npm -v) detected"

# Install dependencies
print_info "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_info "Creating .env file from template..."
    cp .env.example .env
    print_success ".env file created"
    print_warning "Please edit .env file with your configuration!"
    echo ""
    echo "Required variables:"
    echo "  - PRIVATE_KEY (your wallet private key)"
    echo "  - RPC_ENDPOINT (Solana RPC URL)"
    echo "  - TOKEN_ADDRESS (token to trade)"
    echo ""
else
    print_info ".env file already exists"
fi

# Build TypeScript
print_info "Building TypeScript..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Create logs directory
if [ ! -d "logs" ]; then
    mkdir logs
    print_success "Logs directory created"
fi

# Final instructions
echo ""
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure your environment:"
echo -e "   ${YELLOW}nano .env${NC}"
echo ""
echo "2. Start the bot:"
echo -e "   ${YELLOW}npm start${NC}"
echo ""
echo "3. Access the dashboard:"
echo -e "   ${BLUE}http://localhost:5000${NC}"
echo ""
echo "For production deployment with PM2:"
echo -e "   ${YELLOW}npm install -g pm2${NC}"
echo -e "   ${YELLOW}pm2 start dist/index.js --name misty-bot${NC}"
echo ""
echo "For help and documentation:"
echo "   - README.md - Full documentation"
echo "   - DEPLOYMENT.md - Deployment guides"
echo "   - CONTRIBUTING.md - Contributing guidelines"
echo ""
echo -e "${GREEN}Happy trading! 🚀${NC}"
