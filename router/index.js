module.exports = function( app ) {
  var env = require( "../lib/environment" );

  // Overriding MakeDriveFileSystem.js file so that we can render
  // with variables from .env file.
  app.get("/filesystem/impls/makedrive/MakeDriveFileSystem.js", function(req, res) {
    res.set( "Content-Type", "application/javascript" );
    res.render('MakeDriveFileSystem.js', {
      sockethost: env.get("MAKEDRIVE_SOCKET_URL", "ws://127.0.0.1:9090")
    });
  });

  app.get("/main.js", function(req, res) {
    res.set( "Content-Type", "application/javascript" );
    res.render('main.js');
  });

  //
  app.get("/", function(req, res) {
    res.render('index.html');
  });
}
