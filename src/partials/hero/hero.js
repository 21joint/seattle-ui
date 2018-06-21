import _ from 'lodash';
import jQuery from 'jquery';
import 'owl.carousel';
import data from '../../data';

const places = data.places;
const buildSlides = function () {
  let _slides = '';
  _.each(places, (place) => {
    _slides += `<div class="single-slide">
        <div class="single-slide--description">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class=" col-12 col-sm-8 col-md-5">
                <h1>${place.title}</h1>
                <p>${place.description} </p>
                <div class="p-2">
                  <a role="button" href="${place.directions}" class="btn btn-primary" target="_blank">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  return _slides;
};

jQuery(document).ready(function () {

  $('#heroSlider').html(buildSlides()).owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    navSpeed: 0,
    autoplaySpeed: 0,
    center: true,
    autoplay: true
  })
});
