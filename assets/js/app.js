//JQuery Module Pattern

// An object literal
var app = {
    init: function () {
        app.functionOne();
    },
    functionOne: function () {
    }
};

var currentProjectSlide = 1;

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmlraXRha3VsaXNoIiwiYSI6ImNrOXI3NDM4MjByYmozZ21lcTlheHF3aWYifQ.f3K1k5ougE1FGvCE5BXRDw';
    var map = new mapboxgl.Map({
        container: 'map',
        center: [20.481979, 53.739020],
        zoom: 15,
        style: 'mapbox://styles/mapbox/light-v10'
    });

    map.addControl(new mapboxgl.NavigationControl());

    var geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [20.481979, 53.739020]
            }
        }]
    };

    geojson.features.forEach(function (marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });
}

function checkWidth() {
    var windowsize = $(window).width();
    var containersize = $('.container').width() + 100;

    if (windowsize >= 992) {
        var smallBlock = ((windowsize - containersize) / 2) + (containersize / 4);
        var bigBlock = ((windowsize - containersize) / 2) + (containersize / 4 * 3);

        $('.logo-block').width(smallBlock);
        $('.menu-block').width(bigBlock);
        $('.banner-slider').width(bigBlock);
        $('.slide-item').width(bigBlock);
    }
}

function startBannerSlider() {
    var interval = 5000;

    $('.banner-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        dots: false,
        arrows: false,
        swipe: false,
        autoplay: true,
        autoplaySpeed: interval
    });
    $('.banner-quote').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        swipe: false,
        autoplay: true,
        autoplaySpeed: interval
    });

    $('.progress-status').animate({'width': '100%'}, interval - 50);

    $('.banner-quote').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.progress-status').width(0);
        $('.progress-status').animate({'width': '100%'}, interval);
    });
}

function startClientsSlider() {
    $('.clients-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        accessibility: false
    });
}

function startProjectsSlider() {
    $('.info-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        draggable: false,
        swipe: false
    });

    $('.projects-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        draggable: false,
        swipe: false
    });

    $('.gallery-navigation .left-arrow').click(function () {
        $(".info-slider").slick('slickPrev');
        $(".projects-slider").slick('slickPrev');
    });

    $('.gallery-navigation .right-arrow').click(function () {
        $(".info-slider").slick('slickNext');
        $(".projects-slider").slick('slickNext');
    });

//    modal slider

    $('.modal-project').on('shown.bs.modal', function (e) {
        var modalId = '#' + $(this).attr('id') + ' ';
        var isInit = $(this).find('.slick-initialized').length;
        if (!isInit) {
            $(modalId + '.preview-img').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: true,
                draggable: false,
                swipe: false
            });
            $(modalId + '.slider-nav').slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                asNavFor: modalId + '.preview-img',
                focusOnSelect: true,
                vertical: true,
                centerPadding: '60px',
                accessibility: false,
                draggable: false,
                swipe: false
            });

            $(modalId + '.left-arrow-preview').click(function () {
                $(modalId + '.preview-img').slick('slickPrev');
            });

            $(modalId + '.right-arrow-preview').click(function () {
                $(modalId + '.preview-img').slick('slickNext');
            });
        }
    });
}

$("document").ready(function () {
    app.init();
    // initMap();
    checkWidth();
    $(window).resize(checkWidth);

    startBannerSlider();
    startClientsSlider();
    startProjectsSlider();

    $(".link a, .to-top").bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 600, 'easeOutQuad');
        event.preventDefault();
    });

    $(".lang a").bind('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(".lang-block").toggleClass("show");
    });

    $("body").on("click", function (event) {
        if (!$(event.target).is(".lang-block")) {
            $(".lang-block").removeClass("show");
        }
    });

    $('#openReference').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var currentSlideIndex = $('.info-slider').slick('slickCurrentSlide') + 1;

        $('#modalReference' + currentSlideIndex).modal('show');
    })
});
