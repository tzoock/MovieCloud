import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Topbar from './Topbar';
import Explore from './Explore';
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
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<Signup/>*/}
          {/*<Signin/>*/}

          <Topbar/>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Explore"/>} component={Explore}/>
            <Route path={"/Explore"} component={Explore}/>
            <Route path={"/Playlists"} component={Playlists}/>

          </Switch>
          {/*<Player/>*/}
        </div>
      </BrowserRouter>
    );
  }
}
