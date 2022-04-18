export function notEnoughBalance(message: string) {
    return { type: "balance-not-enough", message };
}