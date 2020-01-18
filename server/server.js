const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const os = require('os');

fs.writeFileSync(os.tmpdir() + '/watchlists.json',
fs.readFileSync(__dirname + '/watchlists.json'));

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

app.get('/watchlists', function(req, res) {

  res.sendFile(os.tmpdir() + '/watchlists.json');
});

app.post('/serverAddWatchlists', (req, res) => {

  const data = fs.readFileSync(os.tmpdir() + '/watchlists.json');

  const watchlists = JSON.parse(data);

  watchlists.push(req.body);

  fs.writeFileSync(os.tmpdir() + '/watchlists.json', JSON.stringify(watchlists));

  res.send('OK')

});

app.post('/serverAddWatchlistsWithmovie', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  const data = fs.readFileSync(os.tmpdir() + '/watchlists.json');

  const watchlists = JSON.parse(data);

  watchlists.push(req.body);

  fs.writeFileSync(os.tmpdir() + '/watchlists.json', JSON.stringify(watchlists));

  res.send('OK')

});


app.post('/watchlistNameChange', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  const data = fs.readFileSync(os.tmpdir() + '/watchlists.json');

  const watchlists = JSON.parse(data);

 const foo = watchlists.find((watchlist)=> req.body.id === watchlist.id);

  foo.title = req.body.title;

  fs.writeFileSync(os.tmpdir() + '/watchlists.json', JSON.stringify(watchlists));

  res.send('OK')

});


app.post('/serverDeleteWatchlists', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  const data = fs.readFileSync(os.tmpdir() + '/watchlists.json');

  const watchlists = JSON.parse(data);



  watchlists.splice(req.body.watchlistIndex, 1);

  fs.writeFileSync(os.tmpdir() + '/watchlists.json', JSON.stringify(watchlists));

  res.send('OK')

});

app.post('/serverAddmovie', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  const data = fs.readFileSync(os.tmpdir() + '/watchlists.json');

  const watchlists = JSON.parse(data);


  if (req.body.checked) {
    watchlists[req.body.watchlistIndex].movies.push(req.body.movie);
  }
  else {
    const movieIndex = watchlists[req.body.watchlistIndex].movies.indexOf(req.body.movie);
    watchlists[req.body.watchlistIndex].movies.splice(movieIndex);
  }

  fs.writeFileSync(os.tmpdir() + '/watchlists.json', JSON.stringify(watchlists));

  res.send('OK')

});

const path = require('path');
app.get('/app.js', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/app.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(port);
console.log('Magic happens on port ' + port);


