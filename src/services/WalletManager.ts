// WalletManager.ts

interface Transaction {
    id: string;
    amount: number;
    date: string;
    type: 'deposit' | 'withdraw';
}

class WalletManager {
    private balance: number;
    private transactions: Transaction[];

    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    createWallet(): void {
        // Logic to create a wallet can be added here
        console.log('Wallet created.');
    }

    deposit(amount: number): void {
        this.balance += amount;
        this.transactions.push({
            id: this.generateTransactionId(),
            amount: amount,
            date: new Date().toISOString(),
            type: 'deposit',
        });
        console.log(`Deposited ${amount}. New balance: ${this.balance}.`);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log('Insufficient balance.');
            return;
        }
        this.balance -= amount;
        this.transactions.push({
            id: this.generateTransactionId(),
            amount: amount,
            date: new Date().toISOString(),
            type: 'withdraw',
        });
        console.log(`Withdrew ${amount}. New balance: ${this.balance}.`);
    }

    getBalance(): number {
        return this.balance;
    }

    getTransactionHistory(): Transaction[] {
        return this.transactions;
    }

    private generateTransactionId(): string {
        return 'txn_' + Math.random().toString(36).substr(2, 9);
    }
}

export default WalletManager;
