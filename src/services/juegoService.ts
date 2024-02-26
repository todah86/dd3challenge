import Diccionario from '../models/diccionarioModel';
import GameResult from '../models/gameResultModel';

export const cargarPalabras = async (): Promise<string[]> => {
  const palabrasDocumentos = await Diccionario.aggregate([
    { $match: { palabra: { $regex: /^.{1,5}$/, $options: 'i' } } },
    { $sample: { size: 280 } }
  ]);
  return palabrasDocumentos.map(doc => doc.palabra);
};

export const guardarResultadoJuego = async (userId: string, victorias: number, intentos: number, palabraSeleccionada: string, tiempoSeleccion: number): Promise<void> => {
  await GameResult.create({
    userId: userId,
    jugadas: 1,
    victorias: victorias > 0 ? 1 : 0,
    intentos: intentos,
    palabraSeleccionada: palabraSeleccionada,
    tiempoSeleccion: tiempoSeleccion
  });
};
