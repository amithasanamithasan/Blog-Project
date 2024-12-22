import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('User Role:', req.user?.role); // Log for debugging
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};

export default adminMiddleware;
