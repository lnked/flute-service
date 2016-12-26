var app = app || {};

(function(body){
    "use strict";

    app = {

        _extend: function(source, config)
        {
            if (typeof config !== 'undefined')
            {
                for (var x in config)
                {
                    source[x] = config[x];
                }
            }

            return source;
        },

        bind: function()
        {
            for(var _ in this)
            {
                if (typeof(this[_]) == 'object' && typeof(this[_].init) !== 'undefined')
                {
                    if (typeof(this[_].init) == 'function')
                    {
                        this[_].init();
                    }
                }
            }
        },

        init: function()
        {
            this.bind();
        }

    };

})(document.body);
var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.modal = {

        config: {
            prefix: 'tmpl-modal-',
            trigger: '.j-open-popup'
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
            $('body').on('click', _this_.config.trigger, function(e){
                e.preventDefault();

                var selector = $(this).data('target') || $(this).attr('href'),
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
var app = app || {};

(function(body){
    "use strict";

    var _this_;

    app.quantity = {

        config: {
            element: '.j-quantity',
            input: '.j-quantity-count',
            control: '.j-quantity-control',
            complete: null
        },

        element: null,

        setValue: function(quantity)
        {
            var min = 1, max = 100;

            if (this.element.data('min')) {
                min = this.element.data('min');   
            }
            
            if (this.element.data('max')) {
                max = this.element.data('max');   
            }

            if (quantity > max) {
                quantity = max;
            }
            
            if (quantity < min) {
                quantity = min;
            }

            this.element.find(this.config.input).val(quantity);

        },

        increase: function(quantity)
        {
            quantity += 1;

            this.setValue(quantity);
        },

        decrease: function(quantity)
        {
            if (quantity > 1) {
                quantity -= 1;
            }

            this.setValue(quantity);
        },

        callback: function()
        {
            if (typeof(this.element.data('product')) !== 'undefined' && typeof(this.config.complete) == 'function')
            {
                this.config.complete.call(null, this.element, this.element.data('product'));
            }
        },

        keys: function()
        {
            var _this = this, role = '';

            $('body').on('keydown', _this_.config.input, function(e) {
                if ([38, 40].indexOf(e.keyCode) >= 0)
                {
                    e.preventDefault();

                    role = {
                        38: 'increase',
                        40: 'decrease'
                    };

                    _this_.element = $(this).closest(_this_.config.element);

                    _this[role[e.keyCode]](parseInt(_this_.element.find(_this_.config.input).val()));

                    _this_.callback();

                    return false;
                }
            });
        },

        bind: function()
        {
            var role = '';

            $('body').on('click', _this_.config.control, function(e) {
                e.preventDefault();

                _this_.element = $(this).closest(_this_.config.element);

                role = $(this).data('role');
         
                if(['increase', 'decrease'].indexOf(role) >= 0)
                {
                    _this[role](parseInt(_this_.element.find(_this_.config.input).val()));
                }

                _this_.callback();

                return !1;
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
            _this_.keys();
        }

    };

})(document.body);

// this.quantity.init({
//     complete: function(element, id) {
//         // $(element).css({
//         //     'border': '1px solid lime'
//         // });

//         console.log("id :", id);
//     }
// });

// <div class="quantity j-quantity clearfix" data-product="1000" data-min="1" data-max="999">
//     <button type="button" class="quantity__control _decrease j-quantity-control" data-role="decrease"></button>
//     <input type="text" name="count[1000]" value="1" data-role="quantity-input" class="quantity__count j-quantity-count" maxlength="3" autocomplete="off">
//     <button type="button" class="quantity__control _increase j-quantity-control" data-role="increase"></button>
// </div>
(function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if(document.readyState === "complete") {
        callback();
    } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch(e) {}

        if(top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
})(function(){ app.init(); });