import React from 'react';
import {
  NavLink,
  Link
} from "react-router-dom"

import './topBar.css'

export default class Topar extends React.Component {
  constructor() {
    super();
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchSubmit(event) {
    event.preventDefault();
    
    this.props.history.push(`/Explore/search=${this.search.value}`);
  }


  render() {
    return (
      <header className="top-bar">
        <nav className="nav-style">
          <Link to="/" className="logo-style">
            <i className="logo-icon fa fa-mixcloud"/>
            <p>MovieCloud</p>
          </Link>
          <NavLink to="/Explore" className="tab" activeClassName='selected'>
            Explore
          </NavLink>
          <NavLink to="/Watchlists" className="tab" activeClassName='selected'>
            Watch Lists
          </NavLink>
        </nav>
        <div className="right-top-bar">
          <form className="search-nav"
          onSubmit={(event)=>this.searchSubmit(event)}>
            <i className="fa fa-search"/>
            <input type="text" className="nav-search-input" placeholder="SEARCH" ref={(searchValue) => this.search = searchValue}/>
          </form>
        </div>
      </header>
    );
  }

};
