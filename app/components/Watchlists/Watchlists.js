import React from "react";
import Watchlist from "../Watchlist/Watchlist";
import uuid from "uuid";

import './watchlists.css'
import {connect} from "react-redux";
import {serverLocation} from '../../serverLocation';

class Watchlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTo: ''
    };

    this.handleCreateWatchlists = this.handleCreateWatchlists.bind(this);
    this.handleScroolBlur = this.handleScroolBlur.bind(this);
  }

  handleScrool(watchlistId) {
    this.setState({scrollTo: watchlistId})
  }


  serverAddWatchlists(newWatchlists) {
      const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddWatchlists`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      
    });

    xhr.addEventListener('error', () => {
      
    });

    xhr.send(JSON.stringify(newWatchlists));

    return false;
  }


  handleCreateWatchlists() {

    const newWatchlistsNomovie = {
      editMode: true,
      id: uuid(),
      title: 'Untitled',
      movies: []
    };

    this.serverAddWatchlists(newWatchlistsNomovie);
    this.props.createWatchlists(newWatchlistsNomovie)
  }

  handleScroolBlur() {
    this.setState({scrollTo: ''})
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="watchlists-wrap">
        <div className="watchlists-bar">

          <div className="watchlists-bar-top">
            <button className="add-watchlist-btn" onClick={ () => (this.handleCreateWatchlists()) }>Add new
              watchlist
            </button>
          </div>
          <div className="watchlists-bar-bottom">
            <div>
              {this.props.watchlists.map((watchlist, i) =>
                <div key={watchlist.id}
                     onClick={() => {
                       this.handleScrool(watchlist.id)
                     }}
                     // onBlur={() => {
                     //   this.handleScroolBlur
                     // }}
                     className="watchlist-bar-titles">
                  {watchlist.title }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-watchlists">
          {this.props.watchlists.map((watchlist, i) =>
            <div key={watchlist.id}
                 className="user-watchlist">

              < Watchlist
                watchlists={this.props.watchlists}
                watchlistIndex={i}
                from={this.props.history}
                scroller={this.state.scrollTo}
                handleScroolBlur={this.handleScroolBlur}
              />


            </div>
          )}
        </div>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {

  return {
    createWatchlists(newWatchlists) {
      dispatch({
        type: 'CREATE_WATCHLIST',
        newWatchlistsData: newWatchlists
      })
    }

  }
}

function mapStateToProps(store) {
  return {
    watchlists: store.watchlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Watchlists);
