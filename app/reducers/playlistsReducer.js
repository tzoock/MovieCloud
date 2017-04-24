import uuid from "uuid";

const damiPlaylists = [
  {
    editMode: false,
    id: uuid(),
    title: 'my 1st playlist',
    songs: [
      {
        id: uuid(),
        title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
        duration: 219082,
        stream_url: "https://api.soundcloudcom/tracks/250711755/stream",
        uri: "https://api.soundcloud.com/tracks/250711755",
        artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
      }]
  },
  {
    editMode: false,
    id: uuid(),
    title: 'my 2nd playlist',
    songs: []
  }
];

export default function playlists(playlists = [], action) {
  const copyOfPlaylists = [...playlists];

  if (action.type === 'GOT_DATA') {
    if (playlists>0) {
      return playlists
    }
else {
      return action.data
    }

  }

  if (action.type === 'CREATE_PLAYLIST') {

    copyOfPlaylists.push(action.newPlaylistData);
    return copyOfPlaylists;
  }

  if (action.type === 'CREATE_PLAYLIST_WITH_SONG') {
    copyOfPlaylists.push(action.newPlaylistData);
    return copyOfPlaylists;
  }

  if (action.type === 'CHANGE_EDIT_MODE') {
    copyOfPlaylists[action.playlistIndex].editMode = !playlists[action.playlistIndex].editMode;
    return copyOfPlaylists;
  }

  if (action.type === 'CHANGE_PLAYLIST_NAME') {
    copyOfPlaylists[action.playlistIndex].title = action.playlistName;
    copyOfPlaylists[action.playlistIndex].editMode = false;
    return copyOfPlaylists;
  }

  if (action.type === 'DELETE_PLAYLIST') {
    copyOfPlaylists.splice(action.playlistIndex, 1);
    return copyOfPlaylists;
  }

  if (action.type === 'UPDATE_SONG') {
    if (action.checked) {
      copyOfPlaylists[action.playlistIndex].songs.push(action.song);
    }
    else {
      const songIndex = copyOfPlaylists[action.playlistIndex].songs.indexOf(action.song);
      copyOfPlaylists[action.playlistIndex].songs.splice(songIndex);
    }

    return copyOfPlaylists
  }

  if (action.type === 'RMV_SONG') {


  }

  return playlists;
}
