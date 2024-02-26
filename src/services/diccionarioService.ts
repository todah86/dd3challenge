import fs from 'fs';
import path from 'path';
import readline from 'readline';
import Diccionario from '../models/diccionarioModel';

export const cargarDiccionario = async () => {
  const existeDiccionario = await Diccionario.findOne();
  if (!existeDiccionario) {
    const filePath = path.join(__dirname, '..', '..', 'src/assets', 'words.txt');
    const stream = fs.createReadStream(filePath, 'utf8');
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    const TAMANO_LOTE = 10000;
    let lote: { palabra: string }[] = [];
    let contador = 0;

    for await (const linea of rl) {
      const palabra = linea.trim().replace(/[áéíóúÁÉÍÓÚ]/g, match => {
        return { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }[match] || match;
      });

      if (palabra !== '') {
        lote.push({ palabra });
        contador++;
      }

      if (contador === TAMANO_LOTE) {
        await Diccionario.insertMany(lote);
        lote = [];
        contador = 0;
      }
    }

    // Insertar el último lote si no está vacío
    if (lote.length > 0) {
      await Diccionario.insertMany(lote);
    }

    console.log('Diccionario cargado en MongoDB');
  }
};
