import {createStore, combineReducers} from 'redux';


import currentTrailer from './reducers/currentTrailerReducer';
import watchlists from './reducers/watchlistsReducer';
import showTrailerModal from './reducers/showTrailerModalReducer';


const reducers = combineReducers({
  currentTrailer,
  watchlists,
  showTrailerModal
});


const store = createStore(reducers);

export default store;
