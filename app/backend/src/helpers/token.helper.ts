import { sign, verify, SignOptions, Secret } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET: Secret = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (email: string) => {
  const token = sign(email, SECRET, JWT_CONFIG);

  return { token };
};

export const verifyToken = (authorization: string) => {
  const data = verify(authorization, SECRET);

  return data;
};
