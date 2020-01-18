import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import uuid from "uuid";

import {connect} from "react-redux";
import './watchlist.css'
require('smoothscroll-polyfill').polyfill();
import {serverLocation} from '../../serverLocation';

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editMode: false
    };

  }

  componentDidUpdate() {

    if (this.state.editMode === true) {
      this.focusMe.focus();
    }

    if (this.props.scroller === this.props.watchlists[this.props.watchlistIndex].id) {
      this.scroolMe.scrollIntoView({block: "start", behavior: "smooth"});
      this.props.handleScroolBlur()
    }

  }

  componentDidMount() {
if (this.props.editMode) {
  this.setState({editMode: true})
}
    if (this.state.editMode === true) {
      this.focusMe.focus();
    }

  }

  inputToName(event) {
    if (event.key === 'Enter' || event.type === 'blur') {

      this.props.changeName(this.props.watchlistIndex, event.target.value);
      this.setState({editMode: false});
      this.serverWatchlistsNameChange(this.props.watchlist);
    }
  }

  handleWatchlistsNameChange(event) {
    this.setState({value: event.target.value});
  }

  toggleWatchlistsTitle() {
    this.setState({editMode: !this.state.editMode})
  }

  serverWatchlistsNameChange(watchlist) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/watchlistNameChange`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      
    });

    xhr.addEventListener('error', () => {
      
    });

    xhr.send(JSON.stringify(watchlist));

    return false;
  }

  serverDeleteWatchlists (watchlistIndex) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverDeleteWatchlists`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      
    });

    xhr.addEventListener('error', () => {
      
    });

    xhr.send(JSON.stringify(watchlistIndex));

    return false;
  }

  deleteWatchlistsHandler(watchlistIndex) {
    this.props.deleteWatchlists(watchlistIndex);
    this.serverDeleteWatchlists({watchlistIndex})
  }

  render() {
    return (
      <div>
        { this.state.editMode ?
          <div className="watchlist-header">
            <input type="text"
                   className='input-watchlist-name'
                   onKeyDown={(event) => {
                     this.inputToName(event)
                   }}
                   placeholder={this.props.watchlists[this.props.watchlistIndex].title}
                   onChange={() => {
                     this.handleWatchlistsNameChange(event)
                   }}
                   onBlur={(event) => {
                     this.inputToName(event)
                   }}
                   ref={(ref) => {
                     this.focusMe = ref
                   }}
            />
          </div>
          :
          <div className="watchlist-header">
            <div className='watchlist-name'
                 onClick={() => {
                   this.setState({editMode: true})
                 }}
                 ref={(ref) => {
                   this.scroolMe = ref
                 }}>
              {this.props.watchlists[this.props.watchlistIndex].title}
            </div>
            <span className="movie-count">{this.props.watchlists[this.props.watchlistIndex].movies.length}</span>
            <butten className="deleteBtn"
                    onClick={() => {
                      this.deleteWatchlistsHandler(this.props.watchlistIndex)
                    }
                    }>
              Delete
            </butten>
          </div>}

        <div className="watchlist-content">
          {this.props.watchlists[this.props.watchlistIndex].movies.length > 0 ?
            this.props.watchlists[this.props.watchlistIndex].movies.map((movie, i) => (
              <div key={uuid()} className="movie-card">
                <MovieCard movie={movie}
                          from={this.props.from}
                          movieIndex={i}/>
              </div>)
            )
            :
            <div className="emptyWatchlists">
              <h3>Please add some movie to the watchlist</h3>
            </div>
          }

        </div>
      </div>
    )

  }
}


function mapDispatchToProps(dispatch) {
  return {
    watchlistNameToInput(watchlistIndex) {
      dispatch({
        type: 'CHANGE_EDIT_MODE',
        watchlistIndex: watchlistIndex
      })
    },
    deleteWatchlists(watchlistIndex) {
      dispatch({
        type: 'DELETE_WATCHLIST',
        watchlistIndex: watchlistIndex
      });
    },
    changeName(watchlistIndex, watchlistName) {
      dispatch({
        type: 'CHANGE_WATCHLIST_NAME',
        watchlistIndex: watchlistIndex,
        watchlistName: watchlistName,

      })
    }

  }
}

function mapStateToProps(store) {
  return {
    watchlist: store.watchlist
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
