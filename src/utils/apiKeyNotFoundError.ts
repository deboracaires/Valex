export function apiKeyNotFound(message: string) {
    return { type: "api-key-not-found", message };
}