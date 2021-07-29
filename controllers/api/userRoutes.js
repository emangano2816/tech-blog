const router = require('express').Router();
const { User } = require('../../models');


//login route
router.post('/login', async (req, res) => {
    try {
        //check to see if user exists in DB
        const userData = await User.findOne({ where: { username: req.body.username } });
        //if not found send error; otherwise check password
        if(!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        //if password not valid send error; 
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again. '});
            return;
        }
        //otherwise save user details to session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // res.json({user: userData, message: 'You are now logged in.', loggedIn: req.session.logged_in});
        });
        res.render('dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout route
router.post('/logout', (req, res) => {
    if(req.session.logged_id) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
});

module.exports = router;