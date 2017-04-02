import React from "react"
import {
  NavLink,
  Link
} from "react-router-dom"
import MDSpinner from "react-md-spinner";
import SongCard from "../SongCard"
import GenreChooser from "./GenreChooser"


export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      Loading: "loading"
    };

    // const genre = this.props.match.params.genre;
    // console.info(genre);
  }


  // componentDidMount() {
  //   const genre = this.props.match.params.genre;
  //   const xhr = new XMLHttpRequest();
  //
  //   xhr.open('GET', `https://create-bootcamp-songcloud-server.now.sh/tracks?genre=${genre}`);
  //
  //   xhr.addEventListener('load', () => {
  //     this.setState({
  //       songs: JSON.parse(xhr.responseText),
  //       loading: 'loaded'
  //     });
  //   });
  //   xhr.addEventListener('error', () => {
  //     this.setState({loading: 'error'});
  //   });
  //   xhr.send();
  // }

  GetXhr() {

    const genre = this.props.match.params.genre;
    console.info(this.props.match.params.genre);

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://create-bootcamp-songcloud-server.now.sh/tracks?genre=${genre}`);
    console.info('url', `https://create-bootcamp-songcloud-server.now.sh/tracks?genre=${genre}`);

    xhr.addEventListener('load', () => {
      this.setState({tracks: JSON.parse(xhr.responseText), Loading: 'loaded'});
      console.info('loaded');
    });
    xhr.addEventListener('error', () => {
      this.setState({Loading: 'error'});
    });
    xhr.send();
  }

  componentDidMount() {
    console.info('mount');
    this.GetXhr();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.genre === this.props.match.params.genre)
      return;
    console.log('did update');
    this.GetXhr();
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
        return <div>Error!</div>;
      case 'loaded':
        return (
          <div className="explore-wrap">
            <GenreChooser />
            <p>Genre:</p>
            <div>
              <div className="song-cards-wrapper">
                {this.state.tracks.map((song, i) => <div key={song.id} className="song-card">
                    <SongCard props={this.state.tracks[i]}/>
                  </div>
                )}
              </div>
            </div>
            <div className="pager">
              <button className="page-btn">Prev</button>
              <p>page 1</p>
              <button className="page-btn">Next</button>
            </div>

          </div>
        );
    }
  }
}
;




