import React from "react"
import MDSpinner from "react-md-spinner";
import SongCard from "./SongCard"

export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loading: "loading"
    }
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://create-bootcamp-songcloud-server.now.sh/tracks?genre=trance');
    xhr.addEventListener('load', () => {
      this.setState({
        songs: JSON.parse(xhr.responseText),
        loading: 'loaded'
      });
    });
    xhr.addEventListener('error', () => {
      this.setState({loading: 'error'});
    });
    xhr.send();
  }

  render() {
    switch (this.state.loading) {
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
          <div>
            <div>
              <div>

              <ul className="genere-style">

                <li><a href="#">Jazz</a></li>

                <li><a href="#">Classic</a></li>

                <li><a href="#">Rock</a></li>

                <li><a href="#">Metal</a></li>

                <li><a href="#">ballads</a></li>

                <li><a href="#">Shity Music</a></li>

              </ul>

            </div>
              <h2>Genre:</h2>
              <div className="song-cards-wrapper">
                {this.state.songs.map((song, i) => <div key={song.id} className="song-card">
                    <SongCard props={this.state.songs[i]}/>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h5>Current page number</h5>
              <button>next page</button>
              <button>previous page</button>
            </div>
          </div>
        );
    }
  }
}
;




