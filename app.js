// Packages
var express     = require('express'),
    app         = express(),
    config      = require('config'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    ig          = require('instagram-node').instagram();

// Configuration
var port           = config.get('App.Port'),
    host           = config.get('App.Host'),
    mongo          = config.get('Mongo.conn'),
    igClientId     = config.get('Instagram.clientId'),
    igClientSecret = config.get('Instagram.clientSecret'),
    igCallbackPath = config.get('Instagram.callbackPath'),
    tags           = config.get('Instagram.tags');

mongoose.connect(mongo);

app.use(bodyParser());

// Instagram API setup
ig.use({
  client_id:     igClientId,
  client_secret: igClientSecret
});

ig.add_tag_subscription(tags, host + igCallbackPath, function(err, result, limit){
  console.log('REQUESTING SUBSCRIPTION FOR TAG: ' + tags);
  if (err) {
    console.log('***SUBSCRIPTION REQUEST FAILED***');
    console.log(err);
  } else {
    console.log(result);
    console.log('SUBSCRIPTION REQUEST SUCCESSFUL');
  }
});

// Routes
app.route(igCallbackPath)
.get(function(req, res) {
  console.log('TAG CHALLENGE REQUESTED');
  res.send(req.query['hub.challenge']);
  console.log('TAG CHALLENGE RETURNED');
})
.post(function(req, res) {
  //console.log(req);
  ig.tag_media_recent(tags, function(err, medias, pagination, lim) {
    console.log(medias);
  });
});

app.route('/').get(function(req, res) {
  res.send('<h1>THIS IS WORKING</h1>');
});
// Server
app.listen(port);
console.log('Server is running at http://localhost:' + port);

module.exports = app;
