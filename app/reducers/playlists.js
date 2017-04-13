import uuid from "uuid";

export default function playlists(playlists = [
                                    {
                                      editMode: false,
                                      id: uuid(),
                                      title: 'my 1st playlist',
                                      songs: [
                                        {
                                          id: 250711755,
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
                                  ], action) {

  if (action.type === 'CREATE_PLAYLIST') {
    const newPlaylist = {
      editMode: true,
      id: action.song ? action.song.id : uuid(),
      title: 'Untitled playlist',
      songs: action.song ? [action.song] : []
    };
    console.info('dsf');
    const copyOfPlaylists = [...playlists];
    copyOfPlaylists.push(newPlaylist);

    playlists = copyOfPlaylists;

    return playlists;
  }

  if (action.type === 'CHANGE_EDIT_MODE') {
console.info('ggg');
    const copyPlaylists = [...playlists];
    copyPlaylists[action.playlistIndex].editMode = !playlists[action.playlistIndex].editMode;

    playlists = copyPlaylists;

    return playlists;
  }

  if (action.type === 'CHANGE_PLAYLIST_NAME') {
    console.info(action.playlistName);
    const copyPlaylists = [...playlists];
    copyPlaylists[action.playlistIndex].title = action.playlistName === '' ? 'Untitled playlist' : action.playlistName;

    playlists = copyPlaylists;

    return playlists;

  }

  if (action.type === 'DELETE_PLAYLIST') {

    const copyPlaylists = [...playlists];

    copyPlaylists.splice(action.playlistIndex, 1);
    playlists = copyPlaylists;

    return playlists;

  }

  return playlists;
}
