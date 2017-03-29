export default function Topbar() {


  return (
    <header className="headerStyle">
      <nav className="nav-style">
        <a href="#" className="logo-style">
          <i className="logo-icon fa fa-mixcloud" aria-hidden="true"/>
        </a>
        <div className="nav-tabs">
          <div className="tab">
            <a href="#">
              Explore
            </a>
          </div>
          <div className="tab">
            <a href="#">
              Play Lists
            </a>
          </div>
        </div>
        <div className="search-log">
          <div className="search-nav">
            <i className="fa fa-search"></i>
            <input type="text" className="nav-search-input" value={'search'}/>
          </div>

          <a href="#" className="nav-log">Sign Out</a>
        </div>
      </nav>
    </header>
  );
};
