import React from "react"
import { connect } from "react-redux";
import MDSpinner from "react-md-spinner";
import './TrailerModal.css'
import { Switch } from "react-router-dom";



class TrailerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: "loading",
      YTKey: ""
    }
  }

  GetYtId() {
    const APIkey = '986d1ab5ee8970693590530f5b28f785';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.themoviedb.org/3/movie/${this.props.currentTrailer.id}/videos?api_key=${APIkey}`);

    xhr.addEventListener('load', () => {
      this.setState({YTKey: JSON.parse(xhr.responseText).results[0].key, Loading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({Loading: 'error'});
    });
    xhr.send();
  }


  componentDidUpdate(prevProps, prevState) {
    this.GetYtId();
  }

  handleCloseModal() {
    this.props.closeModal();
    this.setState({
      Loading: 'loading'
    })
  }

  buildYTIframe() {
    const TrailerSrc = "https://www.youtube.com/embed/" + this.state.YTKey;

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
          <div className='yt-iframe-wrapper'>
            <iframe width="100%" height="100%" src={TrailerSrc} frameBorder="0" allowFullScreen></iframe>
          </div>
        );
    }
  }


  render() {
    const showModalClassName = this.props.showTrailerModal ? 'trailer-modal' : 'trailer-modal hide';

    return <div className={showModalClassName}>
      <header>
        {/* <h3>{this.props.movie.title}</h3> */}
        <h2>Test title</h2>
        <i className="close-modal fa fa-close"
          onClick={() => {
            this.handleCloseModal()
          }} />
      </header>
      {this.buildYTIframe()}

    </div>


  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal() {
      dispatch({
        type: 'CLOSE_MODAL'
      })
    },
  }
}


function mapStateToProps(store) {
  return {
    currentTrailer: store.currentTrailer,
    showTrailerModal: store.showTrailerModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailerModal);


