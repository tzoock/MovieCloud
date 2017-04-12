export default function currentTrack(currentTrack = null, action) {
  if (action.type === 'UPDATE_CURRENT_TRACK') {
currentTrack = action.song;

    return currentTrack;
  }

  return currentTrack;
}
