import bcrypt from 'bcrypt';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';


export const registerUser = async (username: string, password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return 'User created successfully';
};



export const loginUser = async (username: string, password: string): Promise<string> => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Authentication failed');
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
  return token;
};
