var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.filter = {

        bind: function()
        {
            var $grid = $('#projects-list');
            var $categories = $('#categories');

            $('body').on('click', '.j-filter', function(e){
                e.preventDefault();

                if (!$(this).hasClass('is-current')) {
                    var href = $(this).attr('href');
                    var filter = href.replace('#group-', '');

                    $categories.find('.j-filter.is-current').removeClass('is-current');

                    $grid.find('.project-item').each(function() {
                        var categories = $(this).data('category').split(',');
                        
                        if (categories.indexOf(filter) >= 0 || filter == 'all') {
                            $(this).removeClass('project-item--disable').addClass('project-item--active');
                        } else {
                            $(this).removeClass('project-item--active').addClass('project-item--disable');
                        }
                    });

                    $(this).addClass('is-current');
                }
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