import { Request, Response } from 'express';
import { UserModel } from '../user/user.model';
import { BlogModel } from '../blog/blog.model';

// Block a user
const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
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

// Delete a blog
const deleteBlogAsAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
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

export { blockUser, deleteBlogAsAdmin };
