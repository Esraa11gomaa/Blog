import express from 'express';
import { createBulkComments, updateComment, findOrCreateComment, searchComments, getRecentComments, getCommentDetails} from '../Controllers/CommentController.js';

const router = express.Router();

router.post('/', createBulkComments);

router.patch('/:commentId', updateComment);

router.post('/find-or-create', findOrCreateComment);

router.get('/search', searchComments)

router.get('/newest/:postId', getRecentComments)

router.get('/details/:id', getCommentDetails)

export default router;
