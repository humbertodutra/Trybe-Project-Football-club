export interface LoginI {
  email: string,
  password: string,
}

export enum httpStatusCodes {
  ok = 200,
  created = 201,
  tokenNot = 401,
  emptyFields = 400,
  notExist = 404,
}