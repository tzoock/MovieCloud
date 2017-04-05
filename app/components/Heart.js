import React from "react"


export default function Heart() {


  return(
    <div>

  <div className="dropdown-heart">
  <div className="drop-heart-header">
  <h6>Add to Playlist</h6>
  <p onClick={props.createPlaylist()}>Create playlist +</p>
  </div>
  <ul className="playlist-list-of checkbox">
  <li>
  <input type="checkbox" id="playlist-checkbox"/>
  <label htmlFor="playlist-checkbox">Rock&roll</label>
  </li>
  </ul>
  </div>
    </div>
  )



}

{/*<div>*/}
{/*<i className="heart-font fa fa-heart-o" ref={(heartDomElm) => {*/}
{/*this.heart = heartDomElm*/}
{/*}} onClick={() => {*/}
{/*this.heartClick()*/}
{/*}}>*/}
{/*<div className="dropdown-heart">*/}
{/*<div className="drop-heart-header">*/}
{/*<h6>Add to Playlist</h6>*/}
{/*<Link to='/Playlist'>Create playlist +</Link>*/}
{/*</div>*/}
{/*<ul className="playlist-checkbox">*/}
{/*<li>*/}
{/*<input type="checkbox" id="cbox1"/>*/}
{/*<label htmlFor="cbox1">Rock&roll</label>*/}
{/*</li>*/}
{/*</ul>*/}
{/*</div>*/}
{/*</i>*/}
{/*</div>*/}
