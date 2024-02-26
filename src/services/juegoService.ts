import { getRepository } from 'typeorm';
import { Diccionario } from '../entity/Diccionario';
import { GameResult } from '../entity/GameResult';

export const cargarPalabras = async (): Promise<string[]> => {
  const palabrasDocumentos = await getRepository(Diccionario)
    .createQueryBuilder('diccionario')
    .where('LENGTH(diccionario.palabra) = 5')
    .orderBy('RANDOM()')
    .limit(280)
    .getMany();

  return palabrasDocumentos.map(doc => doc.palabra);
};

export const guardarResultadoJuego = async (
  userId: number,
  victorias: number,
  intentos: number,
  palabraSeleccionada: string,
  tiempoSeleccion: Date
): Promise<void> => {
  await getRepository(GameResult).insert({
    userId: userId,
    jugadas: 1,
    victorias: victorias > 0 ? 1 : 0,
    intentos: intentos,
    palabraSeleccionada: palabraSeleccionada,
    tiempoSeleccion: tiempoSeleccion
  });
};
