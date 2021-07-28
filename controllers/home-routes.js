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

//dashboard route - display any existing blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const existingPosts = await Posts.findAll({
            include: {model: User }
        });

        console.log(existingPosts);

        const posts = existingPosts.map((project) => project.get({ plain: true }));

        res.render('dashboard', {
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login route - display login page
router.get('/login', (req,res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;