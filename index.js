const express = require('express'),
    app = express(),
    port = 8080;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.use((req, res, next) => { 
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.send('Page not found');
})

app.listen(port);
console.log(`Server is running on localhost:${port}`);