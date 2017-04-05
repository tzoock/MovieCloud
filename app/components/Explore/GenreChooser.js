import React from 'react'
import {
  NavLink,
  Link
} from "react-router-dom"


export default function GenreChooser () {

  return (
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
  )
}
