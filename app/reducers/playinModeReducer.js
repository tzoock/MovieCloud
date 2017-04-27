export default function playinMode(playinMode = false, action) {

  if (action.type === 'TOGGLE_PLAYIN') {

    if (playinMode) {
      console.info('false');
      playinMode = false;
      return playinMode
    }
    if (!playinMode) {
      console.info('true');

      playinMode = true;
      return playinMode
    }
    console.info('playinMode');
    return playinMode
  }

  if (action.type === 'PLAY_PLAYIN') {
    playinMode = true;
    return playinMode
  }

  if (action.type === 'PAUSE_PLAYIN') {
    playinMode = false;
    return playinMode
  }

  return playinMode;
}
