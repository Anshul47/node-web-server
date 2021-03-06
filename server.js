const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page !'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upper', (txt) => {
    return txt.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page !',
        welcomeMsg: 'Welcome to Home Page :)'

    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page !'
    });
});

app.get('/project', (req, res) => {
        res.render('project.hbs', {
            pageTitle: 'Project Page !'
        });
    });

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});