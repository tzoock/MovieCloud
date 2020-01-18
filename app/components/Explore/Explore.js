import React from "react"
import {Link} from "react-router-dom"
import MDSpinner from "react-md-spinner";
import MovieCard from "../MovieCard/MovieCard"

import "./explore.css";


export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      Loading: "loading",
      page: 1,
      limit: 1,
      movies: []
    };

  }

  nextPage() {
    this.setState({
      page: this.state.page + 1,
      Loading: "loading"
    })

  }

  prevPage() {
    this.setState({
      page: this.state.page - 1,
      Loading: "loading"
    })

  }

  GetGenres() {
    const APIkey = '986d1ab5ee8970693590530f5b28f785';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`);

    xhr.addEventListener('load', () => {
      this.setState({genres: JSON.parse(xhr.responseText), Loading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({Loading: 'error'});
    });
    xhr.send();
  }

  GetMovies(isGenere = true) {
    const action = isGenere ? "discover" : "search"
    const genre = this.props.match.params.genre === "Most-Popular" ? "" : isGenere ? "&with_genres=" + this.props.match.params.genre : "&query=" + this.props.match.params.genre.replace("search=", "");
    const APIkey = '986d1ab5ee8970693590530f5b28f785';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.themoviedb.org/3/${action}/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}${genre}`);

    xhr.addEventListener('load', () => {
      const resJson = JSON.parse(xhr.responseText);
      this.setState({
        movies: resJson.results,
        limit: resJson.total_pages,
        Loading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({Loading: 'error'});
    });
    xhr.send();
  }



  componentDidMount() {
    this.GetGenres();
    this.GetMovies();
    
  }

  componentDidUpdate(prevProps, prevState) {
    const isGenre = !(this.props.match.params.genre.substring(0, 7) === ('search='));
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
        this.setState({
          page: 1,
          Loading: "loading"
        }, () => {
          this.GetMovies(isGenre);
        })
  
    }
    if (prevState.page !== this.state.page) {
        this.GetMovies(isGenre);
    }
  }


  render() {
    switch (this.state.Loading) {
      case 'loading':
        return (
          <div className="midMe">
            <MDSpinner size={100} duration={2000} singleColor="#03a9f4"/>
          </div>
        );
      case 'error':
        return (
          <div className="midMe">

            <h1>Error!</h1>

          </div>
        );
      case 'loaded':
        return (
          <div className="explore-wrap">
            <div className="genres-section">
              <div className="genere-style">

              {this.state.genres.genres.map((genre, i) => i<=10 ? <div key={genre.id} className="genre-tab">
                  <Link to={`/Explore/${genre.id}`} className="genre-link">
                    {genre.name}
                  </Link>
                </div>
                :
                null
              )}
              
              </div>
            </div>

            <div>
              {/* <div className="chosen-genre">Genre: {this.props.match.params.genre}</div> */}
              <div className="movie-cards-wrapper">
                {this.state.movies.map((movie, i) => <div key={movie.id} className="movie-card">
                    <MovieCard movie={movie}
                              from={this.props.history}/>
                  </div>
                )}
              </div>
            </div>
            <div className="pager">
              <div>
                <button className="page-btn" onClick={ this.prevPage.bind(this)} disabled={this.state.page === 1}>Prev</button>
                <p>page: {this.state.page}</p>
                <button className="page-btn" onClick={ this.nextPage.bind(this)} disabled={ this.state.page === this.state.limit}>Next</button>
              </div>
            </div>

          </div>
        );
    }
  }
}
;




