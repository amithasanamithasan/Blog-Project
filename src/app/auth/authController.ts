import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/user/user.model';

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    // console.log(token);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error,
    });
  }
};

export { registerUser, loginUser };
