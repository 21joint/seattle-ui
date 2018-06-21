import Masonry from 'masonry-layout/dist/masonry.pkgd.min';
import 'bootstrap/js/src/util';
import 'bootstrap/js/src/scrollspy';
import './main.scss';


jQuery(window).on('load', function () {
  // vanilla JS
  var msnry = new Masonry('.masonry', {
    itemSelector: '.grid-item',
    horizontalOrder: true
  });
});
