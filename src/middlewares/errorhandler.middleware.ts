import { Request, Response, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { QueryFailedError } from "typeorm";
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // typeorm
  if (err instanceof QueryFailedError) {
    return res.status(500).send({
      status: "error",
      message: "Query Error in DB",
    });
    // tsoa
  } else if (err instanceof ValidateError) {
    return res.status(500).send({
      status: "error",
      message: err.fields,
    });
  }
  // for all remaining errors.
  return res.status(500).send({
    status: "error",
    message: err.message,
  });
};

export default errorHandler;
