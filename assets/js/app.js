//JQuery Module Pattern

// An object literal
var app = {
    init: function () {
        app.functionOne();
    },
    functionOne: function () {
    }
};

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

$("document").ready(function () {
    app.init();
    initMap();

    $('.clients-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        dots: true
    });

    $('.projects-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('.left-arrow'),
        nextArrow: $('.right-arrow')
    });

    $('.preview-img').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        swipe: false,
        asNavFor: '.slider-nav',
        prevArrow: $('.left-arrow-preview'),
        nextArrow: $('.right-arrow-preview')
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.preview-img',
        focusOnSelect: true,
        vertical: true,
        centerPadding: '60px',
        enterMode: true,
    });

    $('.modal').on('shown.bs.modal', function (e) {
        $('.preview-img')[0].slick.setPosition();
        $('.preview-img').resize();
        $('.slider-nav')[0].slick.setPosition();
        $('.slider-nav').resize();
    });

    $('body').on('click', '.right-arrow-preview', function () {
        $('.preview-img')[0].slick.setPosition();
        $('.preview-img').resize();
        $('.slider-nav')[0].slick.setPosition();
        $('.slider-nav').resize();
    });

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


});
