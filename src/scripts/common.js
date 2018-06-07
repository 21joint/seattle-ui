import '../scss/index.scss';
import $ from 'jquery';
import 'bootstrap-sass';
import Weather from '../modules/weather/weather';

var navAnimations = function () {
    var doin = false;
    var scrolled = $(window).scrollTop();
    var trns = parseFloat($('.sltl-header').css('transition').split(' ')[1]) * 1000;
    console.log(trns);
    if (!doin) {
        if (scrolled > 5) {
            doin = true;
            $('.sltl-header').addClass('animated alpha');
            !$('.sltl-header').hasClass('animated-2') && setTimeout(function () {
                 $('.sltl-header').addClass('animated-2');
                doin = false;
            }, trns);

        }
        else {
            doin = true;
            $('.sltl-header').removeClass('animated-2');
            setTimeout(function () {
                $('.sltl-header').removeClass('animated alpha');
                doin = false;
            }, trns);
            $(window).width() >= 1200 && $('.sltl-menu--toggle[aria-expanded=true]').dropdown('toggle');
        }
    }
};

$(document).ready(() => {
    $('.sltl-menu--toggle')
        .on('click', () => $('.sltl-header').toggleClass('animated'));
    $('.sltl-mobilenav').on('click', function (e) {
        if (!$(e.target).is('button')) {
            e.stopPropagation();
        }
    });
    $('.sltl-mobilenav--top').append(Weather({
        "lat": 40.7762691,
        "lnt": -112.2006695,
        "unit": "f"
    }).then((res) => {
        console.log(res);
        $('.sltl-btn--weather').append($(`<div class="sltl-weather"><i class="climacon i${res.code}"></i><span class="sltl-weather--temp"><b>${res.temp}</b><sup>°</sup></span></div>`));
    }));
});


$(window).on('scroll', navAnimations);
