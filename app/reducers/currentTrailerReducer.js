export default function currentTrailer(currentTrailer = null, action) {

  if (action.type === 'UPDATE_CURRENT_MOVIE') {

    currentTrailer = action.movie;

    return currentTrailer;
  }

  return currentTrailer;
}
