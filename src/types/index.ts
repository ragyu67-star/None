// Type definitions for trading bot configuration, wallet, and trading data

// Trading Bot Configuration
export interface TradingBotConfig {
    botName: string;
    tradingPairs: string[];
    strategy: string;
    riskManagement: RiskManagementConfig;
    indicators: IndicatorConfig[];
}

export interface RiskManagementConfig {
    stopLoss: number;
    takeProfit: number;
    positionSizing: number;
}

export interface IndicatorConfig {
    name: string;
    parameters: any; // Adjust this according to specific indicator parameters
}

// Wallet
export interface Wallet {
    balance: number;
    currency: string;
    transactions: Transaction[];
}

export interface Transaction {
    date: string;
    amount: number;
    transactionType: 'deposit' | 'withdrawal';
}

// Trading Data
export interface TradingData {
    pair: string;
    price: number;
    volume: number;
    timestamp: string;
}
