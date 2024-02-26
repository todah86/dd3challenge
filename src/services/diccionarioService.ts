import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Diccionario } from '../entity/Diccionario'; // Asegúrate de importar la entidad correcta

export const cargarDiccionario = async () => {
  const existeDiccionario = await getRepository(Diccionario).findOne({ where: { id: 1 } });
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
        await getRepository(Diccionario).insert(lote);
        lote = [];
        contador = 0;
      }
    }

    // Insertar el último lote si no está vacío
    if (lote.length > 0) {
      await getRepository(Diccionario).insert(lote);
    }

    console.log('Diccionario cargado en PostgreSQL');
  }
};
