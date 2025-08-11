const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
} = require('../controllers/blogPostController');
const { addComment, getCommentsByBlogPostId, deleteComment } = require('../controllers/commentController');

router.route('/')
    .post(protect, createBlogPost)
    .get(getAllBlogPosts);

router.route('/:id')
    .get(getBlogPostById)
    .put(protect, updateBlogPost)
    .delete(protect, deleteBlogPost);

router.route('/:blogPostId/comments')
    .post(protect, addComment)
    .get(getCommentsByBlogPostId);

router.route('/comments/:id')
    .delete(protect, deleteComment);

module.exports = router;
