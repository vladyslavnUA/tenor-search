// require libraries
const express = require('express');

// require tenorjs
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "9ATAVVVH21VH", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// app setup
const app = express();

// middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    Tenor.Search.Query(term, "10")
        .then(response => {
            // store the gifs from search
            const gifs = response;
            // pass the gifs as an object into home page
            res.render('home', { gifs })
        }).catch(console.error);
})

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.render('greetings', { name });
})

// start server

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});

