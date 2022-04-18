export function typeDoNotMatch(message: string) {
    return { type: "types-dont-match", message };
}