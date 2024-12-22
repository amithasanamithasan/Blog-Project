/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/user/user.model';

interface UserPayload {
  _id: string;
  role: string;
}

// Extend the Request interface to include your custom type
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, config.JWT_SECRET as string);
    const user = await UserModel.findById(decoded.id);

    if (!user || user.isBlocked) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.user = { _id: user._id.toString(), role: user.role };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
