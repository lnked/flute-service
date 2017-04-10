var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.project = {

        bind: function()
        {
            $('body').on('mouseenter', '.j-project-item', function(e){
                $(this).addClass('is-hovered');
            });

            $('body').on('mouseleave', '.j-project-item', function(e){
                $(this).removeClass('is-hovered');
            });
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