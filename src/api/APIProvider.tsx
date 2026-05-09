// This file provides the @api alias for tiaframe apps.
// It maps the standard useAPI hook to our iframe-aware SDK.
export { useAPI } from '../tia-sdk';

// Export types so they are available via @api as well
export type { TiaAPI as FsAPI } from '../tia-sdk';
