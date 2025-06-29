import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';

export const createPost = async (req, res) => {
    const {title, content, userId} = req.body
    
    if(!title || !content || !userId){
        return res.status(400).json({message: 'Title, content, and userId are required'})
    }
    try {
        const newPost = await Post.create({title, content, userId})
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body; 
    try {
      const post = await Post.findByPk(postId);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
  
      if (post.userId !== userId) {
        return res.status(403).json({ error: 'You are not allowed to delete this post.' });
      }
  
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
export const getPostDetails = async (req, res) => {
    try {
      const posts = await Post.findAll({
        attributes: ['id', 'title'],
        include: [
          {
            model: User,
            attributes: ['id', 'name']
          },
          {
            model: Comment,
            attributes: ['id', 'content']
          },
        ],
      });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getPostCommentCounts = async (req, res) => {
    try {
      const posts = await Post.findAll({
        attributes: ['id', 'title'],
        include: [
          {
            model: Comment,
            attributes: [], 
          },
        ],
        group: ['Post.id'], 
        raw: true,
        nest: true,
        subQuery: false,
      });
  
      const results = await Promise.all(
        posts.map(async (post) => {
          const commentCount = await Comment.count({ where: { postId: post.id } });
          return { ...post, commentCount };
        })
      );
  
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

