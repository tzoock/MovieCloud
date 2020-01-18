// import uuid from "uuid";

// const damiwatchlists = [
//   {
//     editMode: false,
//     id: uuid(),
//     title: 'my 1st watchlist',
//     movies: [
//       {
//         id: uuid(),
//         title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
//         duration: 219082,
//         stream_url: "https://api.soundcloudcom/tracks/250711755/stream",
//         uri: "https://api.soundcloud.com/tracks/250711755",
//         artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
//       }]
//   },
//   {
//     editMode: false,
//     id: uuid(),
//     title: 'my 2nd watchlist',
//     movies: []
//   }
// ];

export default function watchlists(watchlists = [], action) {
  const copyOfwatchlists = [...watchlists];

  if (action.type === 'GOT_DATA') {
    if (watchlists>0) {
      return watchlists
    }
else {
      return action.data
    }

  }

  if (action.type === 'CREATE_WATCHLIST') {

    copyOfwatchlists.push(action.newWatchlistsData);
    return copyOfwatchlists;
  }

  if (action.type === 'CREATE_WATCHLIST_WITH_MOVIE') {
    copyOfwatchlists.push(action.newWatchlistsData);
    return copyOfwatchlists;
  }

  if (action.type === 'CHANGE_EDIT_MODE') {
    copyOfwatchlists[action.watchlistIndex].editMode = !watchlists[action.watchlistIndex].editMode;
    return copyOfwatchlists;
  }

  if (action.type === 'CHANGE_WATCHLIST_NAME') {
    copyOfwatchlists[action.watchlistIndex].title = action.watchlistName;
    copyOfwatchlists[action.watchlistIndex].editMode = false;
    return copyOfwatchlists;
  }

  if (action.type === 'DELETE_WATCHLIST') {
    copyOfwatchlists.splice(action.watchlistIndex, 1);
    return copyOfwatchlists;
  }

  if (action.type === 'UPDATE_MOVIE') {
    if (action.checked) {
      copyOfwatchlists[action.watchlistIndex].movies.push(action.movie);
    }
    else {
      const movieIndex = copyOfwatchlists[action.watchlistIndex].movies.indexOf(action.movie);
      copyOfwatchlists[action.watchlistIndex].movies.splice(movieIndex);
    }

    return copyOfwatchlists
  }

  if (action.type === 'RMV_MOVIE') {


  }

  return watchlists;
}
