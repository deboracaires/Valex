export function cvcWrongError(message: string) {
    return { type: "cvc-wrong", message };
}