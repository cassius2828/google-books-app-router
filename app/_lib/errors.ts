export class NoUserError extends Error {
  constructor(
    message = "No signed‑in user was found. Please sign in to continue."
  ) {
    super(message);
    this.name = "NoUserError";
  }
}

export const determineErrorMessageByName = (errorName: string) => {
  let message;
  switch (errorName) {
    case "NoUserError":
      message = "No signed‑in user was found. Please sign in to continue.";

      break;
    default:
      message = "";
  }
  return message;
};
