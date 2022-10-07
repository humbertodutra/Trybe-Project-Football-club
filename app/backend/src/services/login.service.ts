import * as bcrypt from 'bcryptjs';
import { createToken } from '../helpers/token.helper';
import { LoginI, httpStatusCodes } from '../entities/entities';
import UserModel from '../database/models/User.model';

const incorrectMailOrPass = 'Incorrect email or password';

export default class LoginSerivce {
  constructor(private userModel: typeof UserModel) {}

  async verifyLogin(login: LoginI) {
    if (!login.email || !login.password) {
      return { code: httpStatusCodes.emptyFields, message: 'All fields must be filled' };
    }

    const { email, password } = login;

    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      return { code: httpStatusCodes.tokenNot,
        message: incorrectMailOrPass };
    }

    const veirfyPass = await bcrypt.compare(password, user.password);

    if (!veirfyPass) {
      return { code: httpStatusCodes.tokenNot,
        message: incorrectMailOrPass };
    }
    console.log(email);
    const token = createToken(email);
    return { code: httpStatusCodes.ok, data: token };
  }

  async getUserRole(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return { code: httpStatusCodes.tokenNot,
        message: incorrectMailOrPass };
    }

    return { code: httpStatusCodes.ok, data: user.role };
  }
}
