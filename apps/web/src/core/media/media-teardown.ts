/**
 * Fully stop a media element and drop its resource.
 *
 * Pausing alone leaves a resumable media session behind; hardware media keys
 * can then restart the element after client-side navigation.
 */
export function releaseMediaElement(media: HTMLMediaElement) {
  media.pause();

  if (media.srcObject && 'getTracks' in media.srcObject) {
    for (const track of media.srcObject.getTracks()) {
      track.stop();
    }
  }

  media.srcObject = null;
  media.removeAttribute('src');
  media.load();
}

export function releaseMediaElements(media: Iterable<HTMLMediaElement>) {
  for (const element of media) {
    releaseMediaElement(element);
  }
}

/** Drop the document-level Now Playing entry when supported. */
export function clearMediaSession() {
  if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
    return;
  }

  navigator.mediaSession.playbackState = 'none';
  navigator.mediaSession.metadata = null;
}
