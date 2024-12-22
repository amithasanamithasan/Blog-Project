import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from './blogController';

const router = Router();

// Public endpoint to fetch all blogs
router.get('/', getAllBlogs);

// Routes that require authentication
router.post('/', authMiddleware, createBlog);
router.patch('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export const blogRoutes = router;
