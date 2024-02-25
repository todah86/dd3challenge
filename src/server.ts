import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB', error));

app.use('/api/user', authRoutes);
app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
