export default function Topbar() {
  const headerStyle = {
    height: '50px',
    backgroundColor: '#3a3f41',
    boxSizing: 'border-box',
    position: 'static',
    top: '0',
    left: '0',
    right: '0'
  };

  const navStyle = {
    height: '100%',
    display: 'block',
    width: '1170px',
    margin: '0 auto',

  };

  const logoStyle = {
    display: 'inline-block',
  padding: '11px 0',
  color: '#fff',
  fontSize: '20px',
  float: 'left'
  };

  const serchLogStyle = {
    float: 'right',
display:'inline'
  };

  const inlineStyle = {
    display: 'inline-block'
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <a href="#" style={logoStyle}>
          <img src="#" alt="#"/>
        </a>
        <ul style={inlineStyle}>
          <li style={inlineStyle}><a href="#">Explore</a></li>
          <li style={inlineStyle}><a href="#">Play Lists</a></li>
        </ul>
        <a href="#" style={serchLogStyle}>Sign Out</a>
        <input type="text" style={serchLogStyle}/>

      </nav>
    </header>
  );
};
