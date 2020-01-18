import React from 'react';
import uuid from 'uuid';
import Topbar from '../topBar/Topbar';
import Explore from '../Explore/Explore';
import Watchlists from '../Watchlists/Watchlists';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {connect} from "react-redux";
import {serverLocation} from '../../serverLocation';
import TrailerModal from '../TrailerModal/TrailerModal';



class Root extends React.Component {
  constructor() {
    super();

  }

  GetXhr() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${serverLocation}/watchlists`);

    xhr.addEventListener('load', () => {
      this.props.gotData(JSON.parse(xhr.responseText));
    });


    xhr.send();
  }

  componentDidMount() {
    this.GetXhr()
  }

  render() {
    return ( <div>
        <Topbar history={this.props.history}/>
            <Route exact path="/" component={() => {
              return <Redirect to="/Explore"/>
            }}/>
            <Route exact path="/Explore" component={() => {return <Redirect to="/Explore/Most-Popular"/>}}/>
            <Route path="/Explore/:genre" component={ Explore }/>
            <Route path={"/Watchlists"} component={ Watchlists }/>
        <TrailerModal/>
      </div>
    )

  }
}

function mapDispatchToProps(dispatch) {
  return {
    gotData(data) {
      dispatch({
        type: 'GOT_DATA',
        data: data
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Root);
