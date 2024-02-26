import { Request, Response } from 'express';
import { Juego } from './juego'; // Asegúrate de ajustar la ruta de importación según la estructura de tu proyecto
import GameResult from '../models/gameResultModel';
import User from '../models/userModel';


let juegos: { [userId: string]: Juego } = {};

export const adivinarPalabra = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user._id;
  const intento = req.body.intento;

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

  if (intento === juego.palabraSeleccionada || juego.intentos >= 5) {
    console.log(juego.palabraSeleccionada)

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
    const mejoresJugadores = await GameResult.aggregate([
      {
        $group: {
          _id: '$userId',
          puntajeTotal: { $sum: '$victorias' }
        }
      },
      {
        $sort: { puntajeTotal: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'usuario'
        }
      },
      {
        $unwind: '$usuario'
      },
      {
        $project: {
          _id: 0,
          username: '$usuario.username',
          puntajeTotal: 1
        }
      }
    ]);
    return res.json(mejoresJugadores);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los mejores jugadores' });
  }
};

