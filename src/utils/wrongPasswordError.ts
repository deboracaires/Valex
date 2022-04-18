export function wrongPasswordError(message: string) {
    return { type: "wrong-password", message };
  }