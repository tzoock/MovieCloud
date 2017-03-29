export default function Player() {
  const playerStyle = {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    left: '0'
  };

  return (
    <footer style={playerStyle}>
      <img src="#" alt="#"style={{display:'inline-block'}}/>
      <h3 style={{display:'inline-block'}}>Song name</h3>
      <audio controls src="#" style={{display:'inline-block'}}>
      </audio>
    </footer>
  );
};
