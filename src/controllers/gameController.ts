// gameController.ts

import { Request, Response } from 'express';

const palabras: string[] = ['getos', 'gatos', 'vocal', 'luzes', 'piano', 'ritmo', 'sabor', 'trenz', 'unido', 'virus'];

export const adivinarPalabra = (req: Request, res: Response): Response => {
  const intento: string = req.body.intento;
  const palabraSeleccionada: string = req.palabraSecreta;
  console.log("palabraselccionada", palabraSeleccionada)

  if (intento.length !== 5) {
    return res.status(400).json({ message: 'La palabra debe tener 5 letras.' });
  }

  let resultado: any[] = verificarPalabra(intento, palabraSeleccionada);

  return res.json(resultado);
};


const verificarPalabra = (intento: string, palabraSeleccionada: string): any[] => {
  let resultado: any[] = [];
  for (let i = 0; i < 5; i++) {
    if (intento[i] === palabraSeleccionada[i]) {
      resultado.push({ "letter": intento[i].toUpperCase(), "value": 1 });
    } else if (palabraSeleccionada.includes(intento[i])) {
      resultado.push({ "letter": intento[i].toUpperCase(), "value": 2 });
    } else {
      resultado.push({ "letter": intento[i].toUpperCase(), "value": 3 });
    }
  }
  return resultado;
};
