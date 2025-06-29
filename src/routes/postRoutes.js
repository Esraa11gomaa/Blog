import express from 'express';
import { createPost, deletePost, getPostDetails, getPostCommentCounts } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.delete('/:postId', deletePost);
router.get('/details', getPostDetails)
router.get('/comment-count', getPostCommentCounts)

export default router;
