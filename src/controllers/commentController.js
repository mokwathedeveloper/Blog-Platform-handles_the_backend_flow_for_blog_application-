const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { blogPostId } = req.params;
        const author = req.user.id; // From auth middleware

        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const comment = new Comment({
            content,
            author,
            blogPost: blogPostId,
        });

        await comment.save();

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCommentsByBlogPostId = async (req, res) => {
    try {
        const { blogPostId } = req.params;
        const comments = await Comment.find({ blogPost: blogPostId }).populate('author', 'username email');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the author of the comment or an admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
