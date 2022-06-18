import { ApiError } from "./error.register";

type CustomError = (...args: any) => ApiError;

export const InvalidCredentialError: CustomError = (message?: string) => ({
  status: 401,
  message: message || "Invalid or expired credentials",
});

export const BadRequestError: CustomError = (message: string) => ({
  status: 400,
  message,
});

export const NotFoundError: CustomError = (message: string) => ({
  status: 404,
  message,
});

export const ResourceConflicting: CustomError = (message: string) => ({
  status: 409,
  message,
});
