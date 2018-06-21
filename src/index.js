/**
 * Application entry point
 */
import './externals.scss';
import './index.scss';


jQuery.extend(jQuery.easing, {
  easeNav (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (-- t) * t * t * t * t;
  }
});
