module.exports = function(app, models){

  /**
   *  Index
   */
  app.get('/', function(req, res){

    if (app.requireAuth === true && req.loggedIn === false)
      res.redirect('/auth/twitter');

    //get all the examples
    models.examples.find({}, function(err, docs){
      
      //render the index page
      res.render('index.jade', {
          locals: {
            title: 'Example',
            examples: docs
          }
      });

    });
  });


  /**
   *  View
   */
  app.get('/view/:id', function(req, res){

    if (app.requireAuth === true && req.loggedIn === false)
      res.redirect('/auth/twitter');

    //get the example
    models.examples.findById(req.params.id, function(err, doc){
      
      //render the view page
      res.render('view.jade', {
          locals: {
            title: 'Example',
            example: doc
          }
      });

    });
  });

};