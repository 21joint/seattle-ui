/**
 * Application entry point
 */

if (process.env.NODE_ENV === 'development') {
  import('./externals');
}

import ('./assets/styles/index.scss');
