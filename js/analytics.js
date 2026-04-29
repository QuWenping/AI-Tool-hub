// Vercel Web Analytics initialization
// Import the inject function from @vercel/analytics
import { inject } from '../node_modules/@vercel/analytics/dist/index.mjs';

// Initialize Vercel Web Analytics
inject({
  mode: 'production', // Set to 'production' to enable tracking
  debug: false
});
