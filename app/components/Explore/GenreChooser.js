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
        <li><NavLink to="/Explore/trance">Trance</NavLink></li>
        <li><NavLink to="/Explore/dubstep">Dub-Step</NavLink></li>
        <li><NavLink to="/Explore/house">House</NavLink></li>
        <li><NavLink to="/">Metal</NavLink></li>
        <li><NavLink to="">ballads</NavLink></li>
        <li><NavLink to="">Shity Music</NavLink></li>
      </ul>
    </div>
  )
}
