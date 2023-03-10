/**
 * Adds an iframe with the kode24-timen embeddable podcast player
 * @param {*} node
 */
export function initPodcastPlayer(node) {
  node.innerHTML = `
        <div class="row preview preview-list">
            <iframe src="https://omny.fm/shows/kode24-timen/playlists/podcast/embed?style=cover" width="100%" height="500" frameborder="0" title="kode24-timen"></iframe>
        </div>
    `;
}

export function initPodcastPlayerLoading() {
  return document.createElement("div");
}
