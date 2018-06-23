const express = require('express');
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
	});

} else {
	const app = express();

	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, 'react-ui/build')));

	// Answer API requests.
	app.get('/api', function (req, res) {
		res.set('Content-Type', 'application/json');
		res.send('{"message":"Hello from the custom server!"}');
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
	});
// Requiring our models for syncing
var models = require("./models");

 //Sync Database
 models.sequelize.sync(
	//  {force: true}
	).then(function() {
	console.log('Nice! Database looks fine')
  }).catch(function(err) {
	console.log(err, "Something went wrong with the Database Update!")
  });
  
  //Routes
  var authRoute = require('./routes/auth.js')(app,passport);
  
  //load passport strategies
  require('./config/passport/passport.js')(passport, models.User);

	app.listen(PORT, function () {
		console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
	});
}