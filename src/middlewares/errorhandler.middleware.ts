import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.util';
import { ValidateError } from 'tsoa';
import multer from 'multer';
import messages from '../constants/messages.constants';

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(+error?.statusCode || 400).json({
      sucess: false,
      message: error?.message ?? 'Internal server error',
      data: null,
    });
  }
  if (error instanceof ValidateError) {
    return res.status(400).json({
      message: 'Validation Failed',
      details: error?.fields,
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: 'File Size Exceeded. Please upload within 8MB',
      details: error.message,
    });
  }

  console.log('Error', error);
  return res.status(500).json({
    success: false,
    message: messages.serverError,
    data: null,
  });
};
export default errorHandler;
