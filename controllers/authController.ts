// authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
