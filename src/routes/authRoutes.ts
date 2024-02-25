// authRoutes.ts

import { Router } from 'express';
import * as authController from '../controllers/authController';

const router: Router = Router();

// Ruta de registro
router.post('/register', authController.register);

// Ruta de inicio de sesión
router.post('/login', authController.login);

export default router;
