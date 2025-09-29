import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validateRegister, validateLogin } from '../middlewares/validateSchema.js';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/login', validateLogin, authController.login.bind(authController));

export default router;
