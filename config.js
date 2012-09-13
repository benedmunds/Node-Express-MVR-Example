module.exports = function(app, express, mongoose){

  var config = this;

  app.requireAuth = false;

  //generic config
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topsecret' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    app.mongoose.connect('mongodb://localhost/nodemvr');
  });

  app.configure('production', function(){
    app.use(express.errorHandler());

    //app.mongoose.connect('mongodb://flame.mongohq.com:27087/nodemvr');
    app.mongoose.connect('mongodb://localhost/nodemvr');
  });

  return config;

};