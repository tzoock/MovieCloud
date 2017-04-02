import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Topbar from './Topbar';
import Explore from './Explore/Explore';
import Playlists from './Playlists';
import Player from './Player';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'


export default class Root extends React.Component{
  constructor() {
    super();
    this.state = {

    }

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<Signup/>*/}
          {/*<Login/>*/}

          <Topbar/>
          <Switch>
            <Route exact path="/" component={() => {return <Redirect to="/Explore/trance"/>}}/>

            <Route exact path="/Explore" component={() => {return <Redirect to="/Explore/trance"/>}}/>

            <Route path="/Explore/:genre"  component={ Explore }/>

            <Route path={"/Playlists"} component={Playlists}/>

          </Switch>
          <Player/>
        </div>
      </BrowserRouter>
    );
  }
}
