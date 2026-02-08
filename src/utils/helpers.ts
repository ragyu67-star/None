export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return `${amount.toFixed(2)} ${currency}`;
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
    return ((newValue - oldValue) / oldValue) * 100;
}

export function isValidPrice(price: number): boolean {
    return price > 0 && isFinite(price);
}

export function generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function roundToDecimal(value: number, decimals: number = 2): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}