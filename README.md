# 🚀 Misty Volume Bot - Solana Trading Bot

A sophisticated Solana trading bot with a modern, real-time dashboard for automated volume generation and trading operations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)

## ✨ Features

### 🎯 Core Trading Features
- **Automated Trading** - Execute buy/sell operations on Solana tokens
- **Volume Generation** - Create organic-looking trading volume
- **Multi-Wallet Support** - Distribute trades across multiple wallets
- **Jito Integration** - MEV protection and priority transactions
- **Smart Trading Engine** - Configurable buy/sell ratios
- **Real-time Monitoring** - Track all trading activity

### 📊 Modern Dashboard
- **Real-time Statistics** - Volume, transactions, success rate
- **Interactive Charts** - Volume timeline and wallet distribution
- **Live Trade Feed** - See all trades as they happen
- **System Logs** - Filterable logs (Info, Warn, Error)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Cyberpunk Aesthetic** - Beautiful animated UI with glassmorphism

### 🛡️ Safety Features
- **Emergency Stop** - Immediate shutdown button
- **Transaction Validation** - Pre-flight checks before execution
- **Error Handling** - Comprehensive error management
- **Rate Limiting** - Prevent API overload

## 🖼️ Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x450/0a0e1a/00d9ff?text=Dashboard+Screenshot)

### Trading Activity
![Trading](https://via.placeholder.com/800x450/0a0e1a/7c3aed?text=Trading+Activity)

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- A Solana wallet with private key
- RPC endpoint (Alchemy, QuickNode, or similar)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/misty-volume-bot.git
cd misty-volume-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Wallet Configuration
PRIVATE_KEY=your_wallet_private_key_here

# Network Configuration
RPC_ENDPOINT=https://your-rpc-endpoint.com
NETWORK=mainnet-beta

# Trading Configuration
TOKEN_ADDRESS=your_token_address_here
WALLET_COUNT=10
BUY_RATIO=70

# Jito Configuration (Optional)
JITO_TIP_AMOUNT=0.001

# Server Configuration
PORT=5000
```

4. **Build the project**
```bash
npm run build
```

5. **Start the bot**
```bash
npm start
```

6. **Access the dashboard**
Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
misty-volume-bot/
├── src/
│   ├── config/
│   │   └── config.ts           # Configuration management
│   ├── services/
│   │   ├── WalletManager.ts    # Wallet operations
│   │   ├── TradingEngine.ts    # Trading logic
│   │   ├── JitoService.ts      # Jito integration
│   │   └── MonitoringService.ts # Stats tracking
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── utils/
│   │   ├── logger.ts           # Logging utility
│   │   └── helpers.ts          # Helper functions
│   └── index.ts                # Main entry point
├── public/
│   ├── index-new.html          # Modern dashboard UI
│   ├── dashboard-new.css       # Styles with animations
│   ├── dashboard-new.js        # Dashboard logic
│   ├── index.html              # Original dashboard (backup)
│   ├── dashboard.css           # Original styles (backup)
│   └── dashboard.js            # Original logic (backup)
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## 🎮 Usage

### Starting the Bot

**Via Dashboard (Recommended)**
1. Start the server: `npm start`
2. Open http://localhost:5000
3. Click "Start Bot" in the dashboard

**Via Command Line**
```bash
npm start --cli start
```

### Stopping the Bot

**Via Dashboard**
- Click "Stop Bot" or use "Emergency Stop"

**Via Command Line**
```bash
npm start --cli stop
```

Or use `Ctrl+C` to gracefully shutdown

### Monitoring

The dashboard provides real-time monitoring:
- **Bot Status** - Current operational state
- **Total Volume** - Cumulative trading volume
- **Transactions** - Total transaction count
- **Success Rate** - Percentage of successful trades
- **Charts** - Visual representation of activity
- **Logs** - Detailed system logs

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PRIVATE_KEY` | Wallet private key (base58) | - | ✅ |
| `RPC_ENDPOINT` | Solana RPC URL | - | ✅ |
| `TOKEN_ADDRESS` | Token to trade | - | ✅ |
| `NETWORK` | Solana network | mainnet-beta | ❌ |
| `WALLET_COUNT` | Number of wallets | 10 | ❌ |
| `BUY_RATIO` | Buy percentage (0-100) | 70 | ❌ |
| `JITO_TIP_AMOUNT` | Jito tip in SOL | 0.001 | ❌ |
| `PORT` | Server port | 5000 | ❌ |

### Trading Parameters

Customize trading behavior by modifying `src/config/config.ts`:

```typescript
export const config = {
    // Minimum/maximum trade amounts
    MIN_TRADE_AMOUNT: 0.01,
    MAX_TRADE_AMOUNT: 1.0,
    
    // Delay between trades (ms)
    TRADE_DELAY_MIN: 5000,
    TRADE_DELAY_MAX: 15000,
    
    // Transaction priority
    PRIORITY_FEE: 0.0001,
    
    // Other settings...
};
```

## 🔧 API Endpoints

The bot exposes REST API endpoints:

### `GET /api/status`
Get current bot status and statistics
```json
{
  "isRunning": true,
  "stats": {
    "totalVolume": 15420.50,
    "totalTransactions": 234,
    "successRate": 87.5,
    "activeWallets": 10,
    "totalBalance": 125.4567
  },
  "config": {
    "tokenAddress": "...",
    "walletCount": 10,
    "buyRatio": 70,
    "network": "mainnet-beta"
  }
}
```

### `POST /api/start`
Start the trading bot
```json
{
  "message": "Bot started successfully"
}
```

### `POST /api/stop`
Stop the trading bot
```json
{
  "message": "Bot stopped successfully"
}
```

### `GET /api/logs`
Retrieve recent system logs
```json
{
  "logs": [
    {
      "level": "info",
      "message": "Trade executed successfully",
      "timestamp": "2024-01-28T20:30:45Z"
    }
  ]
}
```

## 🎨 Dashboard Customization

### Changing Colors

Edit `public/dashboard-new.css`:
```css
:root {
    --color-accent-primary: #00d9ff;    /* Cyan */
    --color-accent-secondary: #7c3aed;  /* Purple */
    --color-accent-tertiary: #f59e0b;   /* Amber */
}
```

### Adjusting Update Intervals

Edit `public/dashboard-new.js`:
```javascript
// Status updates (default: 2 seconds)
setInterval(fetchStatus, 2000);

// Logs updates (default: 5 seconds)
setInterval(fetchLogs, 5000);
```

## 🐛 Troubleshooting

### Bot won't start
- Verify `.env` file exists and is configured
- Check that `PRIVATE_KEY`, `RPC_ENDPOINT`, and `TOKEN_ADDRESS` are set
- Ensure wallet has sufficient SOL for transactions

### Dashboard not loading
- Confirm server is running on specified port
- Check browser console for errors
- Verify all files in `public/` directory exist

### Transactions failing
- Check RPC endpoint is responsive
- Verify wallet has sufficient balance
- Ensure token address is correct
- Check Solana network status

### High failure rate
- Increase `PRIORITY_FEE` for faster transaction processing
- Enable Jito integration for MEV protection
- Reduce trade frequency to avoid rate limits

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive keys
2. **Use environment-specific keys** - Different keys for testing/production
3. **Limit wallet balances** - Only fund wallets with necessary amounts
4. **Monitor regularly** - Check dashboard for unusual activity
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use secure RPC endpoints** - Prefer authenticated endpoints
7. **Backup private keys** - Store securely offline

## 📝 Development

### Running in Development Mode

```bash
# Install dev dependencies
npm install --include=dev

# Run with hot reload
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test
```

### Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is" for educational purposes. Trading cryptocurrencies involves risk, and you may lose money. The authors are not responsible for any financial losses incurred through the use of this software. Always test thoroughly on devnet before using on mainnet. Use at your own risk.

## 🙏 Acknowledgments

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Chart.js](https://www.chartjs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/misty-volume-bot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/misty-volume-bot/discussions)

---

Made with ⚡ by the Misty Team
