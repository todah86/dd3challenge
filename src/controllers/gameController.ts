import { Request, Response } from 'express';

let estadoJuego = {
  palabraSeleccionada: '',
  tiempoSeleccion: Date.now(),
  intentos: 0,
  jugadas: 0,
  victorias: 0
};

const palabras: string[] = ['getos', 'gatos', 'vocal', 'luzes', 'piano', 'ritmo', 'sabor', 'trenz', 'unido', 'virus'];

const seleccionarNuevaPalabra = () => {
  estadoJuego.palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  estadoJuego.tiempoSeleccion = Date.now();
  estadoJuego.intentos = 0;
};

const verificarTiempoParaNuevaPalabra = () => {
  if (Date.now() - estadoJuego.tiempoSeleccion >= 300000) {
    seleccionarNuevaPalabra();
    estadoJuego.jugadas++;
    return true;
  }
  return false;
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


export const adivinarPalabra = (req: Request, res: Response): Response => {
  estadoJuego.intentos++;
  const intento: string = req.body.intento;

  const tiempoTranscurrido = Math.floor((Date.now() - estadoJuego.tiempoSeleccion) / 60000) + ':' + Math.floor(((Date.now() - estadoJuego.tiempoSeleccion) % 60000) / 1000).toString().padStart(2, '0');
  if ((verificarTiempoParaNuevaPalabra() || estadoJuego.intentos >= 5) && intento != estadoJuego.palabraSeleccionada ) {
    if(estadoJuego.intentos==5){
      estadoJuego.jugadas++
    }
   console.log("quiero verficiar que el entre aca.")
    const resultadoFinal = { jugadas: estadoJuego.jugadas, victorias: estadoJuego.victorias, tiempoTranscurrido, resultado: verificarPalabra(intento, estadoJuego.palabraSeleccionada) };
    return res.json(resultadoFinal);
  }

  const resultado = verificarPalabra(intento, estadoJuego.palabraSeleccionada);

  if (intento === estadoJuego.palabraSeleccionada) {
    estadoJuego.victorias++;
    seleccionarNuevaPalabra();
    estadoJuego.jugadas++;
    return res.json({ intento, resultado, jugadas: estadoJuego.jugadas, victorias: estadoJuego.victorias });
  } else {
    console.log("intentado de nuevo")
    return res.json({ intento, resultado });
  }
};


// Inicializar el juego
seleccionarNuevaPalabra();
