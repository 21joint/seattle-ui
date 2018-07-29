/**
 * Application entry point
 */

if (process.env.NODE_ENV === 'dev') {
  import('./externals');
}

import ('./assets/styles/index.scss');
