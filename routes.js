module.exports = function(app, models){

  /**
   *  Index
   */
  app.get('/', function(req, res){

    if (app.requireAuth === true && req.loggedIn === false)
      res.redirect('/auth/twitter');

    //get all the rides
    models.examples.find({}, function(err, docs){
      
      //render the index page
      res.render('index.jade', {
          locals: {
            title: 'Example',
            search_placeholder: 'Search',
            examples: docs
          }
      });

    });
  });

};