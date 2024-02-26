import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import authenticateToken from '../middleware/authenticateToken';
import { obtenerMejoresJugadores } from '../controllers/gameController';


const router: Router = Router();

// Ruta para adivinar la palabra, protegida con JWT
router.post('/adivinar', authenticateToken, gameController.adivinarPalabra);
router.get('/mejores-jugadores', authenticateToken, obtenerMejoresJugadores);


export default router;

