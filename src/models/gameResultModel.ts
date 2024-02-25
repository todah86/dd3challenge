// models/gameResultModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IGameResult extends Document {
  userId: mongoose.Types.ObjectId;
  jugadas: number;
  victorias: number;
  intentos: number;
  palabraSeleccionada: string;
  tiempoSeleccion: Date;
}

const GameResultSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jugadas: { type: Number, required: true },
  victorias: { type: Number, required: true },
  intentos: { type: Number, required: true },
  palabraSeleccionada: { type: String, required: true },
  tiempoSeleccion: { type: Date, required: true }
});

const GameResult = mongoose.model<IGameResult>('GameResult', GameResultSchema);

export default GameResult;
