import {createStore, combineReducers} from 'redux';


import currentTrack from './reducers/current-track';
import playlists from './reducers/playlistsReducer'


const reducers = combineReducers({
  currentTrack,
  playlists
});


const store = createStore(reducers);

export default store;
