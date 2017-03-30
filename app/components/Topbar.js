import {
  NavLink,
  Link
} from "react-router-dom"

export default function Topbar() {

  return (
    <header className="headerStyle">
      <nav className="nav-style">
        <Link to="/" className="logo-style">
          <i className="logo-icon fa fa-mixcloud"/>
        </Link>
        <div className="nav-tabs">
          <div className="tab">
            <NavLink to="/Explore" activeClassName='selected'>
              Explore
            </NavLink>
          </div>
          <div className="tab">
            <NavLink to="/Playlists" activeClassName='selected'>
              Play Lists
            </NavLink>
          </div>
        </div>
        <div className="search-log">
          <div className="search-nav">
            <i className="fa fa-search"></i>
            <input type="text" className="nav-search-input" />
          </div>

          <Link to="#" className="nav-log">Sign Out</Link>
        </div>
      </nav>
    </header>
  );
};
