import fs from 'fs';
import path from 'path';
import Diccionario from '../models/diccionarioModel';

export const cargarDiccionario = async () => {
    const existeDiccionario = await Diccionario.findOne();
    if (!existeDiccionario) {
      const filePath = path.join(__dirname, '..', '..', 'src/assets', 'words.txt');
      const palabras = fs.readFileSync(filePath, 'utf8').split('\n').filter(palabra => palabra.trim() !== '');
      const documentosDiccionario = palabras.map(palabra => ({ palabra }));
      await Diccionario.insertMany(documentosDiccionario);
      console.log('Diccionario cargado en MongoDB');
    }
  };
  
