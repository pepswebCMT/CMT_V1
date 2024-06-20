/* // src/serviceWorkerRegistration.js

// Enregistre le service worker pour rendre l'application disponible hors ligne et plus rapide
export function register(config) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker.register(swUrl).then((registration) => {
                console.log('Service worker registered:', registration);
            }).catch((error) => {
                console.error('Error during service worker registration:', error);
            });
        });
    }
}
 */