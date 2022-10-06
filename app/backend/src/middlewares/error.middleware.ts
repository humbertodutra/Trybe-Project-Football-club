import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

export class CustomError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};

export default errorMiddleware;
