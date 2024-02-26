import { getRepository } from 'typeorm';
import { GameResult } from '../entity/GameResult';
import { User } from '../entity/User';

export const obtenerMejoresJugadores = async (): Promise<any[]> => {
  const mejoresJugadores = await getRepository(GameResult)
    .createQueryBuilder('gameResult')
    .select('user.username', 'username')
    .addSelect('SUM(gameResult.victorias)', 'puntajeTotal')
    .innerJoin(User, 'user', 'gameResult.userId = user.id')
    .groupBy('gameResult.userId')
    .orderBy('puntajeTotal', 'DESC')
    .limit(10)
    .getRawMany();

  return mejoresJugadores;
};

export const obtenerEstadisticasUsuarioService = async (userId: number): Promise<{ jugadas: number; victorias: number }> => {
  const partidas = await getRepository(GameResult).find({ where: { userId: userId } });
  const jugadas = partidas.length;
  const victorias = partidas.reduce((total, partida) => total + (partida.victorias > 0 ? 1 : 0), 0);

  return {
    jugadas: jugadas,
    victorias: victorias
  };
};
