import express from 'express'
import { getPosts,createPosts,updatePost,deletePost,likePost,disLikePost } from '../controllers.js/posts.js';

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPosts);
router.patch('/:id',updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost',likePost);
router.patch('/:id/disLikePost',disLikePost);
export default router;