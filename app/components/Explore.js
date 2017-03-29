export default function Explore() {

  return (
    <div>
      <div>
        <ul className="genere-style">
          <li className="genere-style"><a href="#">Jazz</a></li>
          <li className="genere-style"><a href="#">Classic</a></li>
          <li className="genere-style"><a href="#">Rock</a></li>
          <li className="genere-style"><a href="#">Metal</a></li>
          <li className="genere-style"><a href="#">ballads</a></li>
          <li className="genere-style"><a href="#">Shity Music</a></li>
        </ul>
      </div>
      <div>
       <ul>
         <li className="song-card">
           <div className="song-card-img"></div>
           <div className="song-card-info"></div>
         </li>
         <li className="song-card">
           <div className="song-card-img"></div>
         </li>
         <li className="song-card">
           <div className="song-card-img"></div>
         </li>
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
