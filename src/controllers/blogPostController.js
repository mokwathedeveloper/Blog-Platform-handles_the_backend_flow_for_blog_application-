const BlogPost = require('../models/BlogPost');

exports.createBlogPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.id; // From auth middleware

        const blogPost = new BlogPost({
            title,
            content,
            author,
        });

        await blogPost.save();

        res.status(201).json({ message: 'Blog post created successfully', blogPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'username email');
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username email');
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBlogPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the logged-in user is the author of the blog post or an admin
        if (blogPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this blog post' });
        }

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
        blogPost.updatedAt = Date.now();

        await blogPost.save();

        res.json({ message: 'Blog post updated successfully', blogPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Check if the logged-in user is the author of the blog post or an admin
        if (blogPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this blog post' });
        }

        await blogPost.deleteOne();

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
