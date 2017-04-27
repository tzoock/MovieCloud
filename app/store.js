import {createStore, combineReducers} from 'redux';


import currentTrack from './reducers/current-trackReducer';
import playlists from './reducers/playlistsReducer';
import playinMode from './reducers/playinModeReducer';


const reducers = combineReducers({
  currentTrack,
  playlists,
  playinMode
});


const store = createStore(reducers);

export default store;
