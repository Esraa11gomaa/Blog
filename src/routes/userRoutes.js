import express from 'express';
import { createUser, createOrUpdateUser, getUserByEmail, getUserById  } from '../Controllers/UserController.js';

const router = express.Router();

router.post('/signup', createUser);

router.put('/:id', createOrUpdateUser);

router.get('/by-email', getUserByEmail);

router.get('/:id', getUserById);

export default router;
