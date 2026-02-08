export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG'
}

export class Logger {
    private logs: Array<{ level: LogLevel; message: string; timestamp: string }> = [];

    log(level: LogLevel, message: string): void {
        const timestamp = new Date().toISOString();
        this.logs.push({ level, message, timestamp });
        console.log(`[${timestamp}] [${level}] ${message}`);
    }

    info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    getLogs(): Array<{ level: LogLevel; message: string; timestamp: string }> {
        return this.logs;
    }

    clearLogs(): void {
        this.logs = [];
    }
}

export default new Logger();