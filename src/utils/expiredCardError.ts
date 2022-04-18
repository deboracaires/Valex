export function expiredCardError(message: string) {
    return { type: "card-expired", message };
}