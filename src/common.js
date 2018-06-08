import 'bootstrap-sass';
import './fonts/climacons/climacons';
import './fonts/ronian/stylesheet.scss';
import './scss/index.scss';


var Weather = function (options) {
    let _queryUri, _unit, _lat, _lnt;

    _lnt = options.lnt;
    _lat = options.lat;
    _unit = options.unit ? options.unit : 'c';

    _queryUri = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u='${_unit}' AND woeid in (SELECT woeid FROM geo.places WHERE text="(${_lat},${_lnt})")&format=json`;

    return $.ajax(_queryUri).then((res) => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.query.results ?
            res.query.results.channel.item.condition :
            {code: 'NA', temp: 'NA'};
    });
};

var onScroll = function () {
    var doin = false;
    var scrolled = $(window).scrollTop();
    var trns = parseFloat($('.sltl-header').css('transition').split(' ')[1]) * 1000;
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
        }
    }
    $(window).width() >= 1200 && $('.sltl-menu--toggle[aria-expanded=true]').dropdown('toggle');
};

$(document).ready(function () {


    $('.sltl-menu--toggle').on('click', function () {
        $('.sltl-header').toggleClass('animated');
    });
    $('.sltl-mobilenav').on('click', function (e) {
        if (!$(e.target).is('button')) {
            e.stopPropagation();
        }
    });
    $('.sltl-mobilenav--top').append(Weather({
        "lat": 40.7762691,
        "lnt": -112.2006695,
        "unit": "f"
    }).then(function (res) {
        console.log(res);
        $('.sltl-btn--weather').append($(`<div class="sltl-weather"><i class="climacon i${res.code}"></i><span class="sltl-weather--temp"><b>${res.temp}</b><sup>°</sup></span></div>`));
    }));
    $('.sltl-header--search').on('shown.bs.dropdown', function (e) {
        $(this).find('input').focus();
    })
});

$(window).on('scroll', onScroll);
