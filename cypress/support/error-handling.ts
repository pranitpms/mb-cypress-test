const ignoredErrors = /ResizeObserver|Script error|ChunkLoadError|Hydration|Minified React error|reading 'initialised'/i;

export function handleGlobalError() {
    Cypress.on('uncaught:exception', (err) => {
        const isIgnored =
            ignoredErrors.test(err.message) ||
            (/initialised/.test(err.message) && /HTMLScriptElement/.test(err.stack ?? ''));

        if (isIgnored) {
            console.warn('[Cypress] Ignoring known exception:', err.message);
            return false;
        }
        return true;
    });
}
