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
    var mapa1;
    var lokalizacja;
    var MY_MAPTYPE_ID = 'custom_style';

    var mapLat = 53.738913;
    var mapLng = 20.481662;
    lokalizacja = new google.maps.LatLng(mapLat, mapLng);

    var isMobile = true;
    if (window.matchMedia) {
        isMobile = !window.matchMedia('(max-device-width: 600px)').matches;
    }
    var mapOptions = {                              // DEFINICJA PARAMETRÓW MAPY
        center: lokalizacja,                    // ustalenie środka mapy
        zoom: 15,                                    // ustalenie stopnia przybliżenia
        panControl: false,                          // kontrolka kierunku mapy
        zoomControl: false,                          // kontrolka przyblizenia
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControl: false,                       // kontrolka typu mapy
        scaleControl: false,                         // kontrolka widocznosci skali
        streetViewControl: false,                   // kontrolka streetView
        overviewMapControl: false,                  // kontrolka małej mapy w rogu
        scrollwheel: false,                         // wyłączenie scrolowania mapy
        draggable: isMobile,
        mapTypeId: MY_MAPTYPE_ID,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        }
        //mapTypeId:google.maps.MapTypeId.ROADMAP   // typ mapy do wyświetlenia
    };

    mapa1 = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    var styleOpts = [
        {
            "featureType": "landscape",
            "stylers": [
                {"saturation": -100},
                {"lightness": 65},
                {"visibility": "on"}
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {"saturation": -100},
                {"lightness": 51},
                {"visibility": "simplified"}
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {"saturation": -100},
                {"visibility": "simplified"}
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {"saturation": -100},
                {"lightness": 30},
                {"visibility": "on"}
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {"saturation": -100},
                {"lightness": 40},
                {"visibility": "on"}
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {"saturation": -100},
                {"visibility": "simplified"}
            ]
        },
        {
            "featureType": "administrative.province",
            "stylers": [
                {"visibility": "off"}
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {"visibility": "on"},
                {"lightness": -25},
                {"saturation": -100}
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {"hue": "#ffff00"},
                {"lightness": -25},
                {"saturation": -97}
            ]
        }
    ];

    var styledMapOptions = {
        name: 'Skala szarości'
    };
    var customMapType = new google.maps.StyledMapType(styleOpts, styledMapOptions);
    mapa1.mapTypes.set(MY_MAPTYPE_ID, customMapType);


    // DODATKOWE ELEMENTY NA MAPIE
    var iconBase = {
        url: "./assets/img/map-pin.png", // url
        scaledSize: new google.maps.Size(50, 50),
    };
    var marker = new google.maps.Marker({           // DODAWANIE MARKERA
        position: lokalizacja,
        map: mapa1,
        title: escape("Lokalizacja"),
        draggable: false, // true                              // możliwość przenoszenia markera
        icon: iconBase
    });

    var infowindow = new google.maps.InfoWindow({   // DODANIE CHMURKI PRZY MARKERZE
        content: "HORYZONT GEODEZJA KAMIL RYNKOWSKI",
        escape: true
    });

    // EVENT LISTENERS
    google.maps.event.addListener(marker, 'click', function () { // DODANIE KLIKNIECIA NA MARKER
        infowindow.open(mapa1, marker);
    });
}

function checkWidth() {
    var windowsize = $(window).width();
    var containersize = $('.container').width() + 100;

    if (windowsize >= 880) {
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
        lazyLoad: 'ondemand'
    });
    $('.banner-quote').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        swipe: false
    });

    $('.progress-status').addClass('start-animation');

    setInterval(function() {
        $('.banner-slider').slick('slickNext');
        $('.banner-quote').slick('slickNext');
    }, interval);
}

function startClientsSlider() {
    $('.clients-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        accessibility: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
        ]
    });
}

function startProjectsSlider() {
    $('.info-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.projects-slider',
        dots: false,
        draggable: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    swipe: true
                }
            },
        ]
    });

    $('.projects-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.info-slider',
        dots: false,
        draggable: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    swipe: true
                }
            },
        ]
    });

    $('.gallery-navigation .left-arrow').click(function () {
        $(".info-slider").slick('slickPrev');
        $(".projects-slider").slick('slickPrev');
    });

    $('.gallery-navigation .right-arrow').click(function () {
        $(".info-slider").slick('slickNext');
        $(".projects-slider").slick('slickNext');
    });

    var stHeight = $('.info-slider').height();
    $('.info-slider .slick-slide').css('height',stHeight + 'px' );

//    modal slider

    $('.modal-project').on('shown.bs.modal', function (e) {
        var modalId = '#' + $(this).attr('id') + ' ';
        var isInit = $(this).find('.slick-initialized').length;
        if (!isInit) {
            $(modalId + '.preview-img').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: false,
                swipe: false,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            swipe: true
                        }
                    },
                ]
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
                swipe: false,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            vertical: false,
                        }
                    },
                ]
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

function google_maps_lazyload(api_key) {
    'use strict'

    if (api_key) {
        var options = {
            rootMargin: '400px',
            threshold: 0
        };

        var map = document.getElementById('googleMap');
        if(map) {
            var observer = new IntersectionObserver(
                function(entries, observer) {
                    var isIntersecting = typeof entries[0].isIntersecting === 'boolean' ? entries[0].isIntersecting : entries[0].intersectionRatio > 0
                    if (isIntersecting) {
                        loadjs('https://maps.googleapis.com/maps/api/js?region=PL&callback=initMap&key=' + api_key )
                        observer.unobserve(map)
                    }
                },
                options
            );

            observer.observe(map)
        }
    }
}



$(window).on('load', function () {
    $('.loader-wrapper').hide();
    google_maps_lazyload("AIzaSyC4E7we2d2Emb_le7XWw_aHGPOaTJiPCHU");
});

$("document").ready(function () {
    app.init();
    checkWidth();
    $(window).resize(checkWidth);
    startBannerSlider();
    startClientsSlider();
    startProjectsSlider();

    $(".link a").bind('click', function (event) {
        if (document.location.pathname === '/' || document.location.pathname.indexOf('index') >-1 ) {
            event.preventDefault();
            var $anchor = $(this);
            if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 600, 'easeOutQuad');
            }
        }
    });

    $(".to-top").bind('click', function (event) {
        event.preventDefault();
        var $anchor = $(this);
        if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeOutQuad');
        }
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

    $('.openReference').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var currentSlideIndex = $('.info-slider').slick('slickCurrentSlide') + 1;

        $('#modalReference' + currentSlideIndex).modal('show');
    });

    $("#contact-form").on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        var dataString = 'email=' + email + '&subject=' + subject + '&message=' + message;
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: dataString,
            cache: false,
            success: function(){
                $("#mailresult").html("Twoja wiadomość została wysłana");
                document.getElementById("contact-form").reset();
                setTimeout(function(){
                    $("#mailresult").html("");
                }, 2000);
            }
        });
    });

    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
        $('.mobile-menu').toggleClass('open');
    });
});
