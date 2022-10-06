import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token.helper';
import { httpStatusCodes } from '../entities/entities';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(httpStatusCodes.tokenNot)
      .json({ message: 'Token must be a valid token' });
  }

  try {
    const user = verifyToken(authorization);

    req.body.user = user;

    next();
  } catch (err) {
    res.status(httpStatusCodes.tokenNot).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidate;
