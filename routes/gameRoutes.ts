// gameRoutes.ts

import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import authenticateToken from '../middleware/authenticateToken';

const router: Router = Router();

// Middleware que selecciona una palabra al azar para cada nueva sesión de juego
const seleccionarPalabraSecreta = (req: any, res: any, next: any) => {
  const palabras = ['getos', 'gatos', 'vocal', 'luzes', 'piano', 'ritmo', 'sabor', 'trenz', 'unido', 'virus'];
  req.palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  next();
};

// Ruta para adivinar la palabra, protegida con JWT
router.post('/adivinar',authenticateToken,seleccionarPalabraSecreta, gameController.adivinarPalabra);

export default router;
