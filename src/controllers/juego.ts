import GameResult from '../models/gameResultModel';

export class Juego {
  userId: string;
  palabraSeleccionada: string;
  tiempoSeleccion: number;
  intentos: number;
  jugadas: number;
  victorias: number;

  constructor(userId: string) {
    this.userId = userId;
    this.palabraSeleccionada = '';
    this.tiempoSeleccion = Date.now();
    this.intentos = 0;
    this.jugadas = 0;
    this.victorias = 0;
    this.seleccionarNuevaPalabra();
  }

  seleccionarNuevaPalabra() {
    const palabras: string[] = ['getos', 'gatos', 'vocal', 'luzes', 'piano', 'ritmo', 'sabor', 'trenz', 'unido', 'virus'];
    this.palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    this.tiempoSeleccion = Date.now();
    this.intentos = 0;
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
