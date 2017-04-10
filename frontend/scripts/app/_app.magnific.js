var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.magnific = {

        bind: function()
        {
            if ($('.j-project-item').length) {
                $('.j-project-item').each(function(){
                    $(this).magnificPopup({
                        delegate: '.zoom',
                        type: 'image',
                        preloader: true,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            tCounter: '%curr% of %total%'
                        },
                        zoom: {
                            enabled: false,
                            duration: 300,
                            easing: 'ease-in-out',
                            opener: function(openerElement) {
                                return openerElement.is('img') ? openerElement : openerElement.find('img');
                            }
                        },
                        closeOnContentClick: true
                    });
                });
            }
            else {
                $('.zoom').magnificPopup({
                    type:'image',
                    preloader: true,
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: false,
                        duration: 300,
                        easing: 'ease-in-out',
                        opener: function(openerElement) {
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                    },
                    closeOnContentClick: true
                });
            }
        },

        init: function(config)
        {
            _this_ = this;

            if (typeof config !== 'undefined')
            {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }

    };

})(document.body);