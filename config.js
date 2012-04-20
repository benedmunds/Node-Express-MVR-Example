module.exports = function(app, express, mongoose){

  var config = this;

  app.requireAuth = false;

  //configure everyauth
  app.everyauth.twitter
     .consumerKey('yourKey')
     .consumerSecret('yourSecret')
     .findOrCreateUser( function (session, accessToken, accessTokenSecret, user) {
       return 1;
  }).redirectPath('/');

  //generic config
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topsecret' }));
    app.use(app.everyauth.middleware());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    app.mongoose.connect('mongodb://localhost/mvcexample');
  });

  app.configure('production', function(){
    app.use(express.errorHandler());

    app.mongoose.connect('mongodb://flame.mongohq.com:27087/mvcexample');
  });

  return config;

};