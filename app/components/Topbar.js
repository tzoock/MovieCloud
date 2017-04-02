import {
  NavLink,
  Link
} from "react-router-dom"

export default function Topar() {

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
        <div className="search-nav">
          <i className="fa fa-search"/>
          <input type="text" className="nav-search-input" placeholder="SEARCH"/>
        </div>
        <div className="nav-log">
          <Link to="#">Sign Out</Link>
        </div>
      </div>
      {/*<nav className="nav-style">*/}
      {/*<Link to="/" className="logo-style">*/}
      {/*<i className="logo-icon fa fa-mixcloud"/>*/}
      {/*<p>SongCloud</p>*/}
      {/*</Link>*/}
      {/*<div className="nav-tabs">*/}
      {/*<div className="tab">*/}
      {/*<NavLink to="/Explore" activeClassName='selected'>*/}
      {/*Explore*/}
      {/*</NavLink>*/}
      {/*</div>*/}
      {/*<div className="tab">*/}
      {/*<NavLink to="/Playlists" activeClassName='selected'>*/}
      {/*Play Lists*/}
      {/*</NavLink>*/}
      {/*</div>*/}
      {/*</div>*/}
      {/*<div className="search-log">*/}
      {/*<div className="search-nav">*/}
      {/*<i className="fa fa-search"/>*/}
      {/*<input type="text" className="nav-search-input" />*/}
      {/*</div>*/}

      {/*<Link to="#" className="nav-log">Sign Out</Link>*/}
      {/*</div>*/}
      {/*</nav>*/}
    </header>
  );
};
