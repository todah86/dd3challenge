import { Request, Response } from 'express';
import { registerUser } from '../services/userService';
import { loginUser } from '../services/userService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const message = await registerUser(username, password);
    res.status(201).json({ message });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};



