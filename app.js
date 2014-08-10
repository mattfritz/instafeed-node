// Packages
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    ig          = require('instagram-node').instagram();

// Configuration
var port = process.env.PORT || 3000; // App port
var host = 'YOUR_HOST';

mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser());

// Instagram config
ig.use({
  client_id:     'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});

ig.add_tag_subscription('funny', host + '/tag/funny', function(err, result, limit){
  console.log(result);
  console.log('ADDED SUB');
});

// Routes
app.route('/tag/funny')
.get(function(req, res) {
  console.log('TAG PAGE REQUESTED');
  res.send(req.query['hub.challenge']);
  console.log('CHALLENGE RETURNED');
})
.post(function(req, res) {
  console.log(req);
});

// Server
app.listen(port);
console.log('Server is running at http://localhost:' + port);

