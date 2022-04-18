export function businessNoExists(message: string) {
    return { type: "business-not-found", message };
}