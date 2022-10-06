import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import UserModel from '../database/models/User.model';
import LoginSerivce from '../services/login.service';
import tokenValidate from '../middlewares/authorization';

const router = Router();

const loginService = new LoginSerivce(UserModel);
const loginController = new LoginController(loginService);

router.post('/', (req, res) => loginController.loginValidate(req, res));
router.get('/validate', tokenValidate, (req, res) => loginController.tokenValidate(req, res));

export default router;
