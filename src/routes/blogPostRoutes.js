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

router.route('/')
    .post(protect, createBlogPost)
    .get(getAllBlogPosts);

router.route('/:id')
    .get(getBlogPostById)
    .put(protect, updateBlogPost)
    .delete(protect, deleteBlogPost);

module.exports = router;
