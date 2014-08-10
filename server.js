// Packages
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    port        = process.env.PORT || 8080;

// Configuration
mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser());

// Routes
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'test json' });
});

router.get('/html', function(req, res) {
  res.send('<h1>Test HTML</h1>');
});

app.use(router);

// Server
app.listen(port);
console.log('Server is running at http://localhost:' + port);
