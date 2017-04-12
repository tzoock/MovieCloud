import React from "react"
import {
  NavLink,
  Link
} from "react-router-dom"
import MDSpinner from "react-md-spinner";
import SongCard from "../songCard/SongCard"

import "./explore.scss";


export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      Loading: "loading",
      offset: 0,
      limit: 20
    };

  }

  nextPage() {
    console.info('next');
    this.setState({
      offset: this.state.offset + this.state.limit,
      Loading: "loading"
    })

  }

  prevPage() {
    console.info('prev');
    this.setState({
      offset: this.state.offset - this.state.limit,
      Loading: "loading"
    })

  }

  GetXhr() {

    const genre = this.props.match.params.genre;
    const clientId = '2t9loNQH90kzJcsFCODdigxfp325aq4z';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=${clientId}&limit=${this.state.limit}&offset=${this.state.offset}&tags=${genre}`);


    xhr.addEventListener('load', () => {
      this.setState({tracks: JSON.parse(xhr.responseText), Loading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({Loading: 'error'});
    });
    xhr.send();
  }

  componentDidMount() {

    this.GetXhr();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.info(this.props.updateCurrentTrack);
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState( {
        offset: 0,
        Loading: "loading"
      }, ()=>{
        this.GetXhr();
      })
    }
    if (prevState.offset !== this.state.offset) {
      this.GetXhr();
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
              <p>Genres:</p>
              <ul className="genere-style">
                <li><NavLink to="/Explore/trance" className="genre-tab">Trance</NavLink></li>
                <li><NavLink to="/Explore/dubstep">Dub-Step</NavLink></li>
                <li><NavLink to="/Explore/house">House</NavLink></li>
                <li><NavLink to="/Explore/metal">Metal</NavLink></li>
                <li><NavLink to="/Explore/ballads">ballads</NavLink></li>
              </ul>
            </div>
            <p>Genre:</p>
            <div>
              <div className="song-cards-wrapper">
                {this.state.tracks.map((song, i) => <div key={song.id} className="song-card">
                    <SongCard song={song}
                              updateCurrentTrack={this.props.updateCurrentTrack}
                              playlists={this.props.playlists}
                              createPlaylist={this.props.createPlaylist}
                              from={this.props.match.path}
                              checkMe={this.props.checkMe}
                              isInPlaylist={this.props.isInPlaylist}/>
                  </div>
                )}
              </div>
            </div>
            <div className="pager">
              <div>
              <button className="page-btn" onClick={ this.prevPage.bind(this)} disabled={this.state.offset === 0}>Prev
              </button>
              <p>page: {(this.state.offset / this.state.limit) + 1}</p>
              <button className="page-btn" onClick={ this.nextPage.bind(this)}>Next</button>
              </div>
            </div>

          </div>
        );
    }
  }
}
;




