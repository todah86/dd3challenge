// gameController.ts

import { Request, Response } from 'express';

const palabras: string[] = ['getos', 'gatos', 'vocal', 'luzes', 'piano', 'ritmo', 'sabor', 'trenz', 'unido', 'virus'];

export const adivinarPalabra = (req: Request, res: Response): Response => {
  const intento: string = req.body.intento;
  const palabraSeleccionada: string = req.palabraSecreta; // La palabra se asignará en el middleware

  if (intento.length !== 5) {
    return res.status(400).json({ message: 'La palabra debe tener 5 letras.' });
  }

  let resultado: string = verificarPalabra(intento, palabraSeleccionada);

  return res.json({
    intento,
    resultado,
    message: resultado === palabraSeleccionada ? '¡Has acertado la palabra!' : 'Sigue intentando.'
  });
};

const verificarPalabra = (intento: string, palabraSeleccionada: string): string => {
  let resultado: string = '';
  for (let i = 0; i < 5; i++) {
    if (intento[i] === palabraSeleccionada[i]) {
      resultado += `[${intento[i]}]`; // Letra correcta y en posición correcta
    } else if (palabraSeleccionada.includes(intento[i])) {
      resultado += `(${intento[i]})`; // Letra correcta pero en posición incorrecta
    } else {
      resultado += `${intento[i]}`; // Letra incorrecta
    }
  }
  return resultado;
};
