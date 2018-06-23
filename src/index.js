/**
 * Application entry point
 */
import $ from 'jquery';
import './assets/styles/index.scss';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';
import './partials/header/header';
import './partials/hero/hero';

$('.checkout-single--venue').find('> .flex-row').addClass('align-items-center');
$('.checkout-single--venue').each(function(index, venue) {
  var $txtCol = $(venue).find('.checkout-venue--content > .flex-row > [class*=flex-col] p');
  var $moreInfoBtn = $(venue).find('.btn-info--toggle');
  $moreInfoBtn.insertAfter($(venue).find('.collapse'));
  $(venue).find('.checkout-venue--info ul > li:first-child').prepend($txtCol);
});
