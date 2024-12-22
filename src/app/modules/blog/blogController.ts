/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BlogModel } from './blog.model';

const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const blog = new BlogModel({ title, content, author: req.user._id });
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: blog,
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

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const blog = await BlogModel.findOneAndUpdate(
      { _id: id, author: req.user._id },
      { title, content },
      { new: true },
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found or unauthorized',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: blog,
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

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const blog = await BlogModel.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found or unauthorized',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
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

const getAllBlogs = async (req: Request, res: Response) => {
  const { search, sortBy, sortOrder, filter } = req.query as {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    filter?: string;
  };
  const query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  if (filter) {
    query.author = filter;
  }

  const sortOptions: any = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  try {
    const blogs = await BlogModel.find(query)
      .sort(sortOptions)
      .populate('author');

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
};

export { createBlog, updateBlog, deleteBlog, getAllBlogs };
