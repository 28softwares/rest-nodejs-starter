import { StatusCodes } from '../constants/statusCode';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new AppError(message, StatusCodes.BAD_REQUEST);
  }
  static unAuthorized(message: string) {
    return new AppError(message, StatusCodes.UNAUTHORIZED);
  }

  static forbidden(message: string) {
    return new AppError(message, StatusCodes.FORBIDDEN);
  }

  static notFound(message: string) {
    return new AppError(message, StatusCodes.NOT_FOUND);
  }
  static conflict(message: string) {
    return new AppError(message, StatusCodes.CONFLICT);
  }

  static internalServerError(message: string) {
    return new AppError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
  static alreadyExists(message: string) {
    return new AppError(message, StatusCodes.CONFLICT);
  }
}
