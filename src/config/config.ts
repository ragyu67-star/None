// Configuration management for the trading bot

const config = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    tradingPairs: ['BTC/USD', 'ETH/USD'],
    orderTypes: ['market', 'limit'],
    strategies: {
        conservative: { riskLevel: 'low', takeProfit: 1.05, stopLoss: 0.95 },
        aggressive: { riskLevel: 'high', takeProfit: 1.10, stopLoss: 0.90 }
    }
};

export default config;