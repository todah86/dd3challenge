import mongoose, { Schema, Document } from 'mongoose';

interface IDiccionario extends Document {
  palabra: string;
}

const DiccionarioSchema: Schema = new Schema({
  palabra: { type: String, required: true, unique: true }
});

const Diccionario = mongoose.model<IDiccionario>('Diccionario', DiccionarioSchema);

export default Diccionario;
