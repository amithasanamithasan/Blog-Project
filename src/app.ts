import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { blogRoutes } from './app/modules/blog/blog.route';
import { adminRoutes } from './app/modules/admin/adminRoutes';
import { authRoutes } from './app/auth/authRoutes';
import handleError from './app/middlewares/handleError';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes); // Use admin routes app.use(handleError);
app.use(handleError);
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
