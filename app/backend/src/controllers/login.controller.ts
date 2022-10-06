import { Request, Response } from 'express';
import LoginSerivce from '../services/login.service';

export default class LoginController {
  constructor(private loginService: LoginSerivce) {}

  async loginValidate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { code, data, message } = await this.loginService.verifyLogin({ email, password });

    if (!data) return res.status(code).json({ message });

    return res.status(code).json(data);
  }

  async tokenValidate(req: Request, res: Response): Promise<Response> {
    const { user } = req.body;

    const { code, data } = await this.loginService.getUserRole(user);

    return res.status(code).json({ role: data });
  }
}
