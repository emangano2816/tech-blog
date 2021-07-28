const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth.js');

//homepage route - display any existing blog posts
router.get('/', async (req, res) => {
    try {
        const existingPosts = await Posts.findAll({
            include: {model: User }
        });

        const posts = existingPosts.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;