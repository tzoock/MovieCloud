import {
  NavLink,
  Link
} from "react-router-dom"

import './topBar.scss'

export default function Topar() {

  function searchSubmit(event) {
    event.preventDefault();
console.info(event);
    this.props.history.push(`/Explore/${event.value}`);
  }



  return (
    <header className="top-bar">
      <nav className="nav-style">
        <Link to="/" className="logo-style">
          <i className="logo-icon fa fa-mixcloud"/>
          <p>SongCloud</p>
        </Link>
        <NavLink to="/Explore" className="tab" activeClassName='selected'>
          Explore
        </NavLink>
        <NavLink to="/Playlists" className="tab" activeClassName='selected'>
          Play Lists
        </NavLink>
      </nav>
      <div className="right-top-bar">
        <form className="search-nav"
        onSubmit={(event)=>this.searchSubmit(event)}>
          <i className="fa fa-search"/>
          <input type="text" className="nav-search-input" placeholder="SEARCH"/>
        </form>
        <div className="nav-log">
          <Link to="/signin">Sign Out</Link>
        </div>
      </div>
    </header>
  );
};
