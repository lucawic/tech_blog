const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//server port and middleware
const app = express();
const PORT = process.env.PORT || 3001;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));

//set up routes
app.use(routes);

//turn on connection to db and server
sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening '));
});