export default function showTrailerModal(showTrailerModal = false, action) {
  if (action.type === 'OPEN_MODAL') {
    showTrailerModal = true;
    return showTrailerModal
  }

  if (action.type === 'CLOSE_MODAL') {
    showTrailerModal = false;
    return showTrailerModal
  }

  return showTrailerModal;
}
