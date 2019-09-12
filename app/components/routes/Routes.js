import React from 'react';
import Signup from '../auth/Signup';
import SignIn from '../auth/SignIn';
import Root from '../root/Root';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Explore from "../Explore/Explore";

export default function Routes () {


    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/signup" component={ Signup }/>
          <Route exact path="/signin" component={ SignIn }/>
          <Route path="/" component={ Root }/>
        </Switch>
      </BrowserRouter>
    )
  }


