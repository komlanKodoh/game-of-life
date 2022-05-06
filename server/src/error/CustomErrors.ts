import { ApiError } from "./error.register";

type CustomError = (...args: any) => ApiError;

export const InvalidCredentialError: CustomError = (message: string) => ({
  status: 401,
  message,
});
