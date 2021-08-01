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

            res.status(200).json({user: userData, message: 'You are now logged in.', loggedIn: req.session.logged_in});
        });
        // res.redirect('/dashboard');
    } catch (err) {
        res.status(400).json(err);
    }
});

//create account (POST) route
router.post('/createaccount', async (req, res) => {
    try {
        //check to see if user exists in DB
        const userData = await User.findOne({ where: {username: req.body.username} });
        //if found, then alert user an account already exists for that usernmae; otherwise create user
        if (userData) {
            res.status(400).json({message: 'Username already exists.  Please try logging in or select a new username.'})
            return;
        }
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        res.status(200).json({message: 'User account created successfully. Please log in.'});
    } catch (err) {
      res.status(400).json({error: err})
    };
});

//logout route
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
});

module.exports = router;