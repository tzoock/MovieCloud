import React from "react"

export default class Heart extends React.Component {

  constructor() {
    super()
  }


  render() {
    return (
      <div>
        <i className="heart-font fa fa-heart-o" ref={(heartDomElm) => {
          this.heart = heartDomElm
        }} onClick={() => {
          this.addToPlaylistMnu()
        }}>
          <div className="drop-heart">
            <div className="drop-heart-header">
              <h6>Add to Playlist</h6>
              <Link to='/Playlist'>Create playlist +</Link>
            </div>
            <ul className="playlist-list">
              <li>
                <input type="checkbox" id="cbox1"/>
                <label htmlFor="cbox1">Rock&roll</label>
              </li>
            </ul>
          </div>
        </i>
      </div>
    );
  }
};
