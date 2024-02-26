import GameResult from '../models/gameResultModel';

export const obtenerMejoresJugadores = async (): Promise<any[]> => {
  return await GameResult.aggregate([
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
};

export const obtenerEstadisticasUsuarioService = async (userId: string): Promise<{ jugadas: number; victorias: number }> => {
  const partidas = await GameResult.find({ userId: userId });
  const jugadas = partidas.length;
  const victorias = partidas.reduce((total, partida) => total + (partida.victorias > 0 ? 1 : 0), 0);

  return {
    jugadas: jugadas,
    victorias: victorias
  };
};
