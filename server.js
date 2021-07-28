//Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Set up express App
const app = express();
const PORT = process.env.PORT || 3001;

//Create Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

//Set up options for sessions
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Inform Express.js which template engine we're using
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout:'main',
    helpers: true,
}));
app.set('view engine','hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});