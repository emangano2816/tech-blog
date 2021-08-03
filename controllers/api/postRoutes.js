const router = require('express').Router();
const { Posts } = require('../../models');

//create new post route
router.post('/createpost', async (req, res) => {
    try {
        
        await Posts.create({
            post_title: req.body.post_title,
            post_message: req.body.post_message,
            user_id: req.session.user_id,
        })
        res.status(200).json({message: 'Post created successfully.'});
        //res.status(200).redirect('../../dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;