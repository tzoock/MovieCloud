import React from "react";
import SongCard from "./SongCard";

export default function Playlists(props) {
  return (
    <div className="playlist-body">
      <div className="playlists-bar">

        <div className="playlists-bar-top">
          <button className="add-playlist-btn">Add new playlist</button>
        </div>
        <div className="playlists-bar-bottom">
          <ul>
            {props.playlists.map((playlist, i) => <li key={playlist.id} >
             {playlist.title}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="right-playlists">
        {props.playlists.map((playlist, i) => <div key={playlist.id} className="user-playlist">
          <div className="playlist-header">
            <p>{playlist.title}</p>
          </div>
         <div>
           {playlist.songs.map((song, i) => <div key={song.id} className="song-card">
               <SongCard data={song}  updateCurrentTrack={props.updateCurrentTrack} />
             </div>
           )}
         </div>
          </div>
        )}
      </div>
    </div>
  );
};
