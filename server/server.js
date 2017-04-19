const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

// BASE SETUP
// ==============================================


const app     = express();
const port    = 3000;


app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true
}))

app.use(bodyParser.json());
// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/playlists', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.sendFile(__dirname + '/playlist.json');
});

app.post('/playlists', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('yaaaaaaaaaaaa');
  const data = fs.readFileSync(__dirname + '/playlist.json');

  const playlists = JSON.parse(data);

  playlists.push(req.body);

  fs.writeFileSync(__dirname + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});


app.post('/playlistNameChange', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('change name');
  const data = fs.readFileSync(__dirname + '/playlist.json');

  const playlist = JSON.parse(data);

 const foo = playlist.find((playlist)=> req.body.id === playlist.id);
console.info(foo);

  foo.title = req.body.title;

  fs.writeFileSync(__dirname + '/playlist.json', JSON.stringify(playlist));

  res.send('OK')

});


app.listen(port);
console.log('Magic happens on port ' + port);

// server.js

// // we'll create our routes here
//
// // get an instance of router
// var router = express.Router();
//
// // home page route (http://localhost:8080)
// router.get('/', function(req, res) {
//   res.send('im the home page!');
// });
//
// // about page route (http://localhost:8080/about)
// router.get('/about', function(req, res) {
//   res.send('im the about page!');
// });
//
// // apply the routes to our application
// app.use('/', router);
//
// app.route('/login')
//
// // show the form (GET http://localhost:8080/login)
//   .get(function(req, res) {
//     res.send('this is the login form');
//   })
//
//   // process the form (POST http://localhost:8080/login)
//   .post(function(req, res) {
//     console.log('processing');
//     res.send('processing the login form!');
//   });
