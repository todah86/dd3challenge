import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import { cargarDiccionario } from './services/diccionarioService';
import { createConnection } from 'typeorm';



dotenv.config();

const app = express();

app.use(express.json());

createConnection()
  .then(() => {
    console.log('Conectado a la base de datos con TypeORM');
    cargarDiccionario()
  })
  .catch(err => console.error('Error al conectar con la base de datos', err));

mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use('/api/user', authRoutes);
app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
