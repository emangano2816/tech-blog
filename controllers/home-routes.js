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
            logged_in:req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//dashboard route - display any existing blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const existingPosts = await Posts.findAll({
            include: {model: User },
            where: {
                user_id: req.session.user_id
            },
        });

        console.log(existingPosts);

        const posts = existingPosts.map((project) => project.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login route - display login page
router.get('/login', (req,res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;