import { Request, Response } from 'express';
import { Juego } from './juego'; // Asegúrate de ajustar la ruta de importación según la estructura de tu proyecto
import GameResult from '../models/gameResultModel';
import { obtenerMejoresJugadores as obtenerMejoresJugadoresService } from '../services/gameResultService';
import { obtenerEstadisticasUsuarioService } from '../services/gameResultService';




let juegos: { [userId: string]: Juego } = {};

export const adivinarPalabra = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user._id;
  const intento = req.body.user_word;

  if (!juegos[userId]) {
    juegos[userId] = new Juego(userId);
  }

  let juego = juegos[userId];
  const tiempoReiniciado = await juego.verificarTiempoParaNuevaPalabra();
  if (!tiempoReiniciado) {
    juego.intentos++;
  }

  const minutosTranscurridos = Math.floor((Date.now() - juego.tiempoSeleccion) / 60000);
  const segundosTranscurridos = Math.floor(((Date.now() - juego.tiempoSeleccion) % 60000) / 1000);
  const tiempoTranscurrido = `${minutosTranscurridos}:${segundosTranscurridos.toString().padStart(2, '0')}`;

  console.log("juegos intentos", juego.intentos)

  if (intento === juego.palabraSeleccionada || juego.intentos >= 5) {
    console.log(juego.palabraSeleccionada)
    console.log("entro aqui", juego.intentos)

    if (intento === juego.palabraSeleccionada && juego.intentos <= 5 ) {
      console.log("gano el juego.")
      juego.jugadas++;
      juego.victorias++;
      juego.intentos = 6
      await juego.guardarResultadoJuego();
    }

    if(juego.intentos == 5 && intento != juego.palabraSeleccionada){
      juego.jugadas++;
      await juego.guardarResultadoJuego();
    }
    
    const resultadoFinal = {
      jugadas: juego.jugadas,
      victorias: juego.victorias,
      resultado: juego.verificarPalabra(intento),
      tiempoTranscurrido: tiempoTranscurrido
    };
    

    return res.json(resultadoFinal);
  }

  const resultado = juego.verificarPalabra(intento);
  return res.json({ intento, resultado, tiempoTranscurrido: tiempoTranscurrido });
};




export const obtenerMejoresJugadores = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mejoresJugadores = await obtenerMejoresJugadoresService();
    return res.json(mejoresJugadores);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los mejores jugadores' });
  }
};


export const obtenerEstadisticasUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user._id; // Asume que el userId se obtiene del token JWT
    const estadisticas = await obtenerEstadisticasUsuarioService(userId);

    return res.json(estadisticas);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las estadísticas del usuario' });
  }
};


