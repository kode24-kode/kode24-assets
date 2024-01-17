/**
 * Listens to clicks on search button in mobile view
 * and handles interaction
 */

declare global {
  interface Window {
    _sp_?: {
      gdpr?: {
        loadPrivacyManagerModal?: (id: number) => void;
      };
    };
  }
}

export function handleSourcePointClick() {
  if (
    document.getElementById('ad-settings') &&
    document.getElementById('ad-settings')?.addEventListener
  ) {
    document
      .getElementById('ad-settings')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        window?._sp_?.gdpr?.loadPrivacyManagerModal?.(978855);
      });
  }
}
