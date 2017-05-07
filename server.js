var path = require('path');
var Express = require('express');
var app = Express();

app.use('/', Express.static(path.join(__dirname, 'src')));

let port = process.env.PORT || 8888;
app.use('/node_modules', Express.static(path.join(__dirname, 'node_modules')));

app.use(function(req, res) {
    res.sendFile('index.html', {root: './src/'})
})
app.listen(port, function() {
    console.log("Zikher project running on ", port);
});
