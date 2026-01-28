import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { WalletManager } from './services/WalletManager';
import { TradingEngine } from './services/TradingEngine';
import { MonitoringService } from './services/MonitoringService';
import { logger } from './utils/logger';
import { config } from './config/config';

dotenv.config();

class MistyVolumeBot {
    private app: express.Application;
    private walletManager: WalletManager;
    private tradingEngine: TradingEngine;
    private monitoringService: MonitoringService;
    private isRunning = false;

    constructor() {
        this.app = express();
        this.walletManager = new WalletManager();
        this.tradingEngine = new TradingEngine(this.walletManager);
        this.monitoringService = new MonitoringService();
        
        this.setupExpress();
        this.setupRoutes();
    }

    private setupExpress(): void {
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }

    private setupRoutes(): void {
        // Dashboard route
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // API routes
        this.app.get('/api/status', (req, res) => {
            res.json({
                isRunning: this.isRunning,
                stats: this.monitoringService.getStats(),
                config: {
                    tokenAddress: config.TOKEN_ADDRESS,
                    walletCount: config.WALLET_COUNT,
                    buyRatio: config.BUY_RATIO,
                    network: config.NETWORK
                }
            });
        });

        this.app.post('/api/start', async (req, res) => {
            try {
                if (this.isRunning) {
                    return res.status(400).json({ error: 'Bot is already running' });
                }

                await this.start();
                res.json({ message: 'Bot started successfully' });
            } catch (error) {
                logger.error('Failed to start bot:', error);
                res.status(500).json({ error: 'Failed to start bot' });
            }
        });

        this.app.post('/api/stop', async (req, res) => {
            try {
                await this.stop();
                res.json({ message: 'Bot stopped successfully' });
            } catch (error) {
                logger.error('Failed to stop bot:', error);
                res.status(500).json({ error: 'Failed to stop bot' });
            }
        });

        this.app.get('/api/logs', (req, res) => {
            res.json({ logs: this.monitoringService.getRecentLogs() });
        });
    }

    public async start(): Promise<void> {
        if (this.isRunning) {
            throw new Error('Bot is already running');
        }

        logger.info('🚀 Starting Misty Volume Bot...');
        
        // Validate configuration
        this.validateConfig();
        
        // Initialize wallet manager
        await this.walletManager.initialize();
        
        // Start monitoring service
        this.monitoringService.start();
        
        // Start trading engine
        await this.tradingEngine.start();
        
        this.isRunning = true;
        logger.info('✅ Misty Volume Bot started successfully');
    }

    public async stop(): Promise<void> {
        if (!this.isRunning) {
            return;
        }

        logger.info('🛑 Stopping Misty Volume Bot...');
        
        await this.tradingEngine.stop();
        this.monitoringService.stop();
        
        this.isRunning = false;
        logger.info('✅ Misty Volume Bot stopped successfully');
    }

    private validateConfig(): void {
        const requiredFields = ['PRIVATE_KEY', 'RPC_ENDPOINT', 'TOKEN_ADDRESS'];
        const missingFields = requiredFields.filter(field => !process.env[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required environment variables: ${missingFields.join(', ')}`);
        }
    }

    public startServer(): void {
        const port = process.env.PORT || 5000;
        this.app.listen(port, '0.0.0.0', () => {
            logger.info(`🌐 Misty Dashboard running on http://0.0.0.0:${port}`);
            logger.info('📊 Access the dashboard to monitor and control the bot');
        });
    }
}

// CLI handling
const args = process.argv.slice(2);
const misty = new MistyVolumeBot();

if (args.includes('--cli')) {
    // CLI mode
    const command = args[1];
    
    switch (command) {
        case 'start':
            misty.start().catch(console.error);
            break;
        case 'stop':
            misty.stop().catch(console.error);
            break;
        default:
            console.log('Usage: npm start --cli [start|stop]');
            console.log('   or: npm start (for web dashboard)');
    }
} else {
    // Web dashboard mode
    misty.startServer();
}

process.on('SIGINT', async () => {
    logger.info('Received SIGINT, shutting down gracefully...');
    await misty.stop();
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
