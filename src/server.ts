import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import { cargarDiccionario } from './services/diccionarioService';


dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
  console.log('Conectado a MongoDB');
  cargarDiccionario(); // Cargar el diccionario después de conectarse a MongoDB
})
.catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use('/api/user', authRoutes);
app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
