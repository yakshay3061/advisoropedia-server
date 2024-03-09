import express from 'express'
const router = express.Router();

import {
    registerUser,
    posts
} from '../controllers/userController.js'


import { protect } from '../middleware/authMiddleware.js';


router.post('/signup', registerUser);

// first check if proteced by verifying the jwt, then move to posts route
router.route('/postlist').get(protect, posts);


export default router