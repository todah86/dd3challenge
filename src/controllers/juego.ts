import Diccionario from '../models/diccionarioModel';
import GameResult from '../models/gameResultModel';

export class Juego {
  userId: string;
  palabraSeleccionada: string;
  tiempoSeleccion: number;
  intentos: number;
  jugadas: number;
  victorias: number;
  palabras : string[];

  constructor(userId: string) {
    this.userId = userId;
    this.palabraSeleccionada = '';
    this.tiempoSeleccion = Date.now();
    this.intentos = 0;
    this.jugadas = 0;
    this.victorias = 0;
    this.seleccionarNuevaPalabra();
    this.palabras = [];
    this.cargarPalabras();
  }

  async cargarPalabras() {
    const palabrasDocumentos = await Diccionario.aggregate([
      { $match: { palabra: { $regex: /^.{1,5}$/, $options: 'i' } } }, // Filtrar palabras con máximo 5 letras
      { $sample: { size: 280 } } 
    ]);
    this.palabras = palabrasDocumentos.map(doc => doc.palabra);
    this.seleccionarNuevaPalabra();
  }

  seleccionarNuevaPalabra() {
    if (this.palabras.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
      this.palabraSeleccionada = this.palabras[indiceAleatorio];
      console.log("la palabra seleccionada es", this.palabraSeleccionada)
      this.palabras.splice(indiceAleatorio, 1); // Eliminar la palabra seleccionada del array
      this.tiempoSeleccion = Date.now();
      this.intentos = 0;
    }
  }

  

  async verificarTiempoParaNuevaPalabra() {
    if (Date.now() - this.tiempoSeleccion >= 300000) {
      if (this.intentos < 5) {
        await this.guardarResultadoJuego();
      }
      this.seleccionarNuevaPalabra();
      //this.jugadas++;
      return true;
    }
    return false;
  }

  async guardarResultadoJuego() {
    await GameResult.create({
      userId: this.userId,
      jugadas: 1,
      victorias: this.victorias > 0 ? 1 : 0,
      intentos: this.intentos,
      palabraSeleccionada: this.palabraSeleccionada,
      tiempoSeleccion: this.tiempoSeleccion
    });
  }
  

  verificarPalabra(intento: string): any[] {
    let resultado: any[] = [];
    for (let i = 0; i < 5; i++) {
      if (intento[i] === this.palabraSeleccionada[i]) {
        resultado.push({ "letter": intento[i].toUpperCase(), "value": 1 });
      } else if (this.palabraSeleccionada.includes(intento[i])) {
        resultado.push({ "letter": intento[i].toUpperCase(), "value": 2 });
      } else {
        resultado.push({ "letter": intento[i].toUpperCase(), "value": 3 });
      }
    }
    return resultado;
  }
}
