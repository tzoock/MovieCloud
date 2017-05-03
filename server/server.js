const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const os = require('os');

fs.writeFileSync(os.tmpdir() + '/playlist.json', fs.readFileSync(__dirname + '/playlist.json'));

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
  res.sendFile(os.tmpdir() + '/playlist.json');
});

app.post('/serverAddPlaylist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('yaaaaaaaaaaaa');
  const data = fs.readFileSync(os.tmpdir() + '/playlist.json');

  const playlists = JSON.parse(data);

  playlists.push(req.body);

  fs.writeFileSync(os.tmpdir() + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});

app.post('/serverAddPlaylistWithSong', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('yaaaaaaaaaaaa');
  const data = fs.readFileSync(os.tmpdir() + '/playlist.json');

  const playlists = JSON.parse(data);

  playlists.push(req.body);

  fs.writeFileSync(os.tmpdir() + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});


app.post('/playlistNameChange', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('change name');
  const data = fs.readFileSync(os.tmpdir() + '/playlist.json');

  const playlists = JSON.parse(data);

 const foo = playlists.find((playlist)=> req.body.id === playlist.id);
// console.info(foo);
console.info(req.body.title);

  foo.title = req.body.title;

  fs.writeFileSync(os.tmpdir() + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});


app.post('/serverDeletePlaylist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info(req.body);
  const data = fs.readFileSync(os.tmpdir() + '/playlist.json');

  const playlists = JSON.parse(data);



  playlists.splice(req.body.playlistIndex, 1);

  fs.writeFileSync(os.tmpdir() + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});

app.post('/serverAddSong', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  const data = fs.readFileSync(os.tmpdir() + '/playlist.json');

  const playlists = JSON.parse(data);


  if (req.body.checked) {
    playlists[req.body.playlistIndex].songs.push(req.body.song);
  }
  else {
    const songIndex = playlists[req.body.playlistIndex].songs.indexOf(req.body.song);
    playlists[req.body.playlistIndex].songs.splice(songIndex);
  }

  fs.writeFileSync(os.tmpdir() + '/playlist.json', JSON.stringify(playlists));

  res.send('OK')

});

const path = require('path');
app.get('/app.js', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/app.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(port);
console.log('Magic happens on port ' + port);


