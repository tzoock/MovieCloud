import React from 'react';
import Root from '../root/Root';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Explore from "../Explore/Explore";

export default function Routes () {


    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Root }/>
        </Switch>
      </BrowserRouter>
    )
  }


