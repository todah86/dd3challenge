import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import authenticateToken from '../middleware/authenticateToken';

const router: Router = Router();

// Ruta para adivinar la palabra, protegida con JWT
router.post('/adivinar', authenticateToken, gameController.adivinarPalabra);

export default router;
