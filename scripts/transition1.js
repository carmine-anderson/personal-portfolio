// Fade IN on load (handles normal load + bfcache back/forward)
const enableFadeIn = () => {
    if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        document.body.classList.remove('fade-ready', 'fade-out');
        // force reflow to ensure transition starts
        void document.body.offsetWidth;
        document.body.classList.add('fade-in');
    }
};

// Prepare initial state ASAP
document.documentElement.classList.add('js'); // optional flag
if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.body.classList.add('fade-ready');
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', enableFadeIn);

// Also handle back/forward cache restores
window.addEventListener('pageshow', (e) => {
    if (e.persisted) enableFadeIn();
});

// Intercept internal link clicks to fade OUT before navigating
document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    // Skip new tabs, downloads, anchors, or modified clicks
    if (
        a.target === '_blank' ||
        a.hasAttribute('download') ||
        a.getAttribute('href')?.startsWith('#') ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    ) return;

    // Only fade for same-origin navigations
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    // Respect reduce motion
    if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    // Prevent immediate navigation, fade out, then go
    e.preventDefault();
    document.body.classList.remove('fade-in');
    // force reflow so the next class transition applies
    void document.body.offsetWidth;
    document.body.classList.add('fade-out');

    // Match the CSS duration (260ms). Add a tiny buffer.
    setTimeout(() => { location.href = url.href; }, 280);
});
