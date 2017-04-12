import { createStore, combineReducers } from 'redux';


import currentTrack from './reducers/current-track';



const reducers = combineReducers({
    currentTrack
  });





const store = createStore(reducers);

export default store;
