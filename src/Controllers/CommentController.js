import { Op } from 'sequelize';
import Comment from '../models/comment.js';
import Post from '../models/post.js';
import User from '../models/user.js';


export const createBulkComments = async (req, res) => {
  try {
    const { comments } = req.body;
    if (!Array.isArray(comments) || comments.length === 0) {
      return res.status(400).json({ error: 'Invalid input, array of comments is required.' });
    }

    const createdComments = await Comment.bulkCreate(comments);
    res.status(201).json(createdComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    console.log('Received commentId:', commentId);
    console.log('Received userId:', userId);
    console.log('Received content:', content);
  
    try {
      const comment = await Comment.findByPk(commentId);
  
      if (!comment) {
        console.log('comment not foun');
        return res.status(404).json({ error: 'Comment not found.' });
      }
  
      if (comment.userId !== userId) {
        console.log('Unauthorized update attempt by userId:', userId);
        return res.status(403).json({ error: 'You are not allowed to update this comment.' });
      }
  
      comment.content = content;
      await comment.save();
      console.log('Comment updated successfully:', comment);
      res.status(200).json(comment);
    } catch (error) {
      console.error('Error occurred:', error.message);
      res.status(500).json({ error: error.message });
    }
};

export const findOrCreateComment = async (req, res) => {
    const { postId, userId, content } = req.body;
  
    try {
      const [comment, created] = await Comment.findOrCreate({
        where: {
          postId,
          userId,
          content,
        },
        defaults: { postId, userId, content },
      });
  
      res.status(200).json({ comment, created });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const searchComments = async (req, res) => {
    const { word } = req.query;
  
    try {
      if (!word) {
        return res.status(400).json({ error: 'Query parameter "word" is required.' });
      }

      const { rows, count } = await Comment.findAndCountAll({
        where: {
          content: {
            [Op.like]: `%${word}%`,
          },
        },
      });
  
      res.status(200).json({ count, comments: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};

export const getRecentComments = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const comments = await Comment.findAll({
        where: { postId },
        order: [['createdAt', 'DESC']],
        limit: 3,
        attributes: ['id', 'content', 'createdAt']
      });
  
      if (!comments.length) {
        return res.status(404).json({ message: 'No comments found for this post.' });
      }
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getCommentDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      const comment = await Comment.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'name'] },
          { model: Post, attributes: ['id', 'title'] },
        ],
      });
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found.' });
      }
  
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};