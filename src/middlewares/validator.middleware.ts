import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export class RequestValidator {
  static validate = (classInstance: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToClass(classInstance, req.body);

      await validate(convertedObject).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          let rawErrors: string[] = [];

          for (const errorItem of errors) {
            rawErrors.push(...Object.values(errorItem.constraints ?? ""));
          }
          return res.status(500).json({ errors: rawErrors });
        } else return next();
      });
    };
  };
}
