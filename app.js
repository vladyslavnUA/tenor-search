// require libraries
const express = require('express');

// app setup
const app = express();

// middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
    console.log(req.query) // => "{ term: het"
    res.render('home')
})

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.render('greetings', { name });
})

// start server

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});

