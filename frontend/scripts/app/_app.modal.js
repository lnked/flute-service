var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.modal = {

        config: {
            prefix: 'tmpl-modal-',
            trigger: '.j-open-popup',
            dismiss: '.j-close-popup'
        },

        prepare: function(selector)
        {
            var nested = [];

            if (typeof(selector) !== 'undefined' && selector.length > 1)
            {
                if (selector.substr(0, 1) == '#')
                {
                    selector = selector.substr(1);
                }

                if (selector.indexOf('/') >= 0)
                {
                    nested = selector.split('/');
                    selector = nested[0];
                }
            
                selector = _this_.config.prefix  + selector;
            }

            return selector;
        },

        _close: function(modal)
        {
            var change = modal.find('[data-change]');

            modal.removeClass('is-animate');
            change.removeClass('is-animate');
            
            setTimeout(function() {
                change.removeClass('is-open');
                modal.removeClass('is-open');
            }, 500);
        },

        _open: function(modal)
        {
            var change = modal.find('[data-change]');

            modal.addClass('is-open');
            change.addClass('is-open');
            
            setTimeout(function(){
                modal.addClass('is-animate');
                change.addClass('is-animate');
                
                autosize($(modal).find('textarea'));
            }, 10);

            $('body').trigger('modal.open', modal);
        },

        bind: function()
        {
            $('body').on('click', _this_.config.dismiss, function(e){
                e.preventDefault();

                _this_._close($(this).closest('.modal'));

                return !1;
            });

            $('body').on('click', _this_.config.trigger, function(e){
                e.preventDefault();

                var selector = $(this).data('target') || $(this).data('popup') || $(this).attr('href'),
                    modal = null;

                if (document.getElementById(_this_.prepare(selector)) !== null)
                {
                    modal = $(template(_this_.prepare(selector), {}));

                    $('body').append(modal);

                    _this_._open(modal);
                }

                return !1;
            })
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