import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"
import uuid from "uuid";

import './MovieCard.css'

import { connect } from "react-redux";
import { serverLocation } from '../../serverLocation';


class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartMode: '',
      dropDownMode: false,
      dropDownOverview: false,
      value: ''
    };
  }

  MovieTextLimiter(title) {
    if (title.length > 35) {
      return title.slice(0, 32) + '...'
    }
    else {
      return title;
    }
  }

  toggleDropHeart() {

    this.setState({
      dropDownMode: !this.state.dropDownMode
    })

  }

  toggleDropOverview() {
    this.setState({
      dropDownOverview: !this.state.dropDownOverview
    })
  }

  whereFrom() {
    if (this.props.from.location.pathname.includes('/Watchlists')) {
      return (
        <div className="drop-heart-header">
          <h6>Edit Watchlists</h6>
        </div>)
    }
    else {
      return (
        <div className="drop-heart-header">
          <h6>Add to Watchlists</h6>
          <div className='create-watchlist'
            onClick={() => {
              this.handleNewWatchlists()
            }}>
            Create watchlist +
          </div>
        </div>)
    }
  }

  handleNewWatchlists() {
    this.toggleDropHeart();
    const newWatchlists = {
      editMode: true,
      id: uuid(),
      title: 'Untitled',
      movies: [this.props.movie]
    };

    this.serverAddWatchlists(newWatchlists);
    this.props.createWatchlistsWithmovie(newWatchlists);

  }

  serverAddWatchlists(data) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddWatchlistsWithmovie`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      
      this.props.from.push('/Watchlists')
    });

    xhr.addEventListener('error', () => {
      
    });

    xhr.send(JSON.stringify(data));

    return false;
  }

  serverAddmovie(watchlistIndex, checked) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/serverAddmovie`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      
    });

    xhr.addEventListener('error', () => {
      
    });

    xhr.send(JSON.stringify({
      movie: this.props.movie,
      watchlistIndex: watchlistIndex,
      checked: checked
    }));

    return false;
  }

  handleWatchlistChecking(event, watchlistIndex) {

    const checked = event.target.checked;
    this.props.updatemovie(this.props.movie, watchlistIndex, checked);
    this.serverAddmovie(watchlistIndex, checked)
  }

  checkMe() {
    return this.props.watchlists.map((watchlist, i) => {
      let checkMe = false;

      watchlist.movies.forEach((movie) => {
        if (movie.id === this.props.movie.id) {
          checkMe = true;
        }
      });

      return (<label key={watchlist.id}>
        <input type="checkbox"
          checked={checkMe}
          onChange={(event) => {
            this.handleWatchlistChecking(event, i)
          }}
        />
        {watchlist.title}
      </label>

      )
    })
  }

  clickMovieHandler() {
    this.props.handleCurrentmovie(this.props.movie);
    this.props.openModal();
  }


  render() {
    const movieImg = 'https://image.tmdb.org/t/p/w300/' + this.props.movie.backdrop_path;

    return (
      <div>
        <div className="movie-card-img"
          style={{ backgroundImage: `url(${movieImg})` }}
          onClick={() => {
            this.clickMovieHandler()
          }}>
            <div className = 'movie-view-mode' >
              <span className = 'fa fa-play-circle-o' />
            </div>


        </div>
        <div className="movie-card-info">
          <div className="movie-title">{this.MovieTextLimiter(this.props.movie.title)}</div>
          <div className="movie-overview">
            {this.MovieTextLimiter(this.props.movie.overview)}
          </div>
        </div>

        <i className="overview-font fa fa-info-circle"
          onClick={() => {
            this.toggleDropOverview()
          }} />

        {this.state.dropDownOverview ?
          <div className='dropdown-overview'>
            {this.props.movie.overview}
          </div>
          :
          null}

        <i className="heart-font fa fa-heart-o"
          onClick={() => {
            this.toggleDropHeart()
          }} />


        {this.state.dropDownMode ?
          <div className='dropdown-heart'>

            {this.whereFrom()}

            <div className="watchlist-list-of-checkbox">

              {this.checkMe()}

            </div>
          </div>
          :
          null}



      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCurrentmovie(movie) {
      dispatch({
        type: 'UPDATE_CURRENT_MOVIE',
        movie: movie
      })
    },
    openModal() {
      dispatch({
        type: 'OPEN_MODAL'
      })
    },
    createWatchlistsWithmovie(newWatchlists) {
      dispatch({
        type: 'CREATE_WATCHLIST_WITH_MOVIE',
        newWatchlistsData: newWatchlists
      })
      // this.props.createWatchlists(this.props.movie)
    },
    updatemovie(movie, watchlistIndex, checked) {
      dispatch({
        type: 'UPDATE_MOVIE',
        movie: movie,
        watchlistIndex: watchlistIndex,
        checked: checked
      })
    },
    rmvmovie(movie, watchlistIndex) {
      dispatch({
        type: 'RMV_MOVIE',
        movie: movie,
        watchlistIndex: watchlistIndex
      })
    }
  }
}

function mapStateToProps(store) {
  return {
    watchlists: store.watchlists,
    currentTrailer: store.currentTrailer,
    showTrailerModal: store.showTrailerModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
