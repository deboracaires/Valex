export function typeAlreadyExistsError(message: string) {
  return { type: "card-already-exists", message };
}