export default function Explore() {
  const genereStyle = {
    display: 'inline-block',
    marginRight: '5px'
  };
  // List of songs
  // - Current page number
  // - Buttons Previous/Next
  return (
    <div>
      <div>
        <ul style={genereStyle}>
          <li style={genereStyle}><a href="#">Jazz</a></li>
          <li style={genereStyle}><a href="#">Classic</a></li>
          <li style={genereStyle}><a href="#">Rock</a></li>
          <li style={genereStyle}><a href="#">Metal</a></li>
          <li style={genereStyle}><a href="#">ballads</a></li>
          <li style={genereStyle}><a href="#">Shity Music</a></li>
        </ul>
      </div>
      <div>
       <ul>
         <li><img src="http://lorempixel.com/100/100/" alt="#"/></li>
         <li><img src="http://lorempixel.com/100/100/" alt="#"/></li>
         <li><img src="http://lorempixel.com/100/100/" alt="#"/></li>
       </ul>
      </div>
      <div>
        <h5>Current page number</h5>
        <button>next page</button>
        <button>previous page</button>
      </div>
    </div>
  );
};
