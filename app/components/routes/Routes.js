import React from 'react';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Root from '../root/Root';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export default function Routes () {


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={ Signup }/>
          <Route exact path="/login" component={ Login }/>
          <Route path="/" component={ Root }/>
        </Switch>
      </BrowserRouter>
    )
  }


