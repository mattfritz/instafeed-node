var app    = require('./app'),
    config = require('config'),
    port   = config.get('App.Port');

app.listen(port);
console.log('Server is running at http://localhost:' + port);
