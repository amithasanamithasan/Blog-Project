import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { blockUser, deleteBlogAsAdmin } from './adminController';
import adminMiddleware from '../../middlewares/adminMiddleware';

const router = Router();

router.patch(
  '/users/:userId/block',
  authMiddleware,
  adminMiddleware,
  blockUser,
);
router.delete('/blogs/:id', authMiddleware, adminMiddleware, deleteBlogAsAdmin);

export const adminRoutes = router;
