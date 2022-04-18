export function alreadyActivatedError(message: string) {
    return { type: "card-already-activated", message };
}