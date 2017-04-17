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
export default function playlists(playlists = damiPlaylists, action) {
  const copyOfPlaylists = [...playlists];

  if (action.type === 'CREATE_PLAYLIST') {
    const newPlaylist = {
      editMode: true,
      id: uuid(),
      title: 'Untitled',
      songs: action.song ? [action.song] : []
    };
    copyOfPlaylists.push(newPlaylist);
    return copyOfPlaylists;
  }

  if (action.type === 'CHANGE_EDIT_MODE') {
    copyOfPlaylists[action.playlistIndex].editMode = !playlists[action.playlistIndex].editMode;
    return copyOfPlaylists;
  }

  if (action.type === 'CHANGE_PLAYLIST_NAME') {
    copyOfPlaylists[action.playlistIndex].title = action.playlistName === '' ? 'Untitled' : action.playlistName;
    copyOfPlaylists[action.playlistIndex].editMode = !playlists[action.playlistIndex].editMode;
    return copyOfPlaylists;
  }

  if (action.type === 'DELETE_PLAYLIST') {
    copyOfPlaylists.splice(action.playlistIndex, 1);
    return copyOfPlaylists;
  }

  return playlists;
}
