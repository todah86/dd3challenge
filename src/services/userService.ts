import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (username: string, password: string): Promise<string> => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({ username, password: hashedPassword });
  await userRepository.save(newUser);
  return 'User created successfully';
};

export const loginUser = async (username: string, password: string): Promise<string> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { username } });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

  return token;
};
