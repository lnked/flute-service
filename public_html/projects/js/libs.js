'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module. 
        define(['jquery'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS 
        factory(require('jquery'));
    } else {
        // Browser globals 
        factory(window.jQuery || window.Zepto);
    }
})(function ($) {

    /*>>core*/
    /**
     * 
     * Magnific Popup Core JS file
     * 
     */

    /**
     * Private static constants
     */
    var CLOSE_EVENT = 'Close',
        BEFORE_CLOSE_EVENT = 'BeforeClose',
        AFTER_CLOSE_EVENT = 'AfterClose',
        BEFORE_APPEND_EVENT = 'BeforeAppend',
        MARKUP_PARSE_EVENT = 'MarkupParse',
        OPEN_EVENT = 'Open',
        CHANGE_EVENT = 'Change',
        NS = 'mfp',
        EVENT_NS = '.' + NS,
        READY_CLASS = 'mfp-ready',
        REMOVING_CLASS = 'mfp-removing',
        PREVENT_CLOSE_CLASS = 'mfp-prevent-close';

    /**
     * Private vars 
     */
    /*jshint -W079 */
    var mfp,
        // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
    MagnificPopup = function MagnificPopup() {},
        _isJQ = !!window.jQuery,
        _prevStatus,
        _window = $(window),
        _document,
        _prevContentType,
        _wrapClasses,
        _currPopupType;

    /**
     * Private functions
     */
    var _mfpOn = function _mfpOn(name, f) {
        mfp.ev.on(NS + name + EVENT_NS, f);
    },
        _getEl = function _getEl(className, appendTo, html, raw) {
        var el = document.createElement('div');
        el.className = 'mfp-' + className;
        if (html) {
            el.innerHTML = html;
        }
        if (!raw) {
            el = $(el);
            if (appendTo) {
                el.appendTo(appendTo);
            }
        } else if (appendTo) {
            appendTo.appendChild(el);
        }
        return el;
    },
        _mfpTrigger = function _mfpTrigger(e, data) {
        mfp.ev.triggerHandler(NS + e, data);

        if (mfp.st.callbacks) {
            // converts "mfpEventName" to "eventName" callback and triggers it if it's present
            e = e.charAt(0).toLowerCase() + e.slice(1);
            if (mfp.st.callbacks[e]) {
                mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
            }
        }
    },
        _getCloseBtn = function _getCloseBtn(type) {
        if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
            mfp.currTemplate.closeBtn = $(mfp.st.closeMarkup.replace('%title%', mfp.st.tClose));
            _currPopupType = type;
        }
        return mfp.currTemplate.closeBtn;
    },

    // Initialize Magnific Popup only when called at least once
    _checkInstance = function _checkInstance() {
        if (!$.magnificPopup.instance) {
            /*jshint -W020 */
            mfp = new MagnificPopup();
            mfp.init();
            $.magnificPopup.instance = mfp;
        }
    },

    // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
    supportsTransitions = function supportsTransitions() {
        var s = document.createElement('p').style,
            // 's' for style. better to create an element if body yet to exist
        v = ['ms', 'O', 'Moz', 'Webkit']; // 'v' for vendor

        if (s['transition'] !== undefined) {
            return true;
        }

        while (v.length) {
            if (v.pop() + 'Transition' in s) {
                return true;
            }
        }

        return false;
    };

    /**
     * Public functions
     */
    MagnificPopup.prototype = {

        constructor: MagnificPopup,

        /**
         * Initializes Magnific Popup plugin. 
         * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
         */
        init: function init() {
            var appVersion = navigator.appVersion;
            mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
            mfp.isAndroid = /android/gi.test(appVersion);
            mfp.isIOS = /iphone|ipad|ipod/gi.test(appVersion);
            mfp.supportsTransition = supportsTransitions();

            // We disable fixed positioned lightbox on devices that don't handle it nicely.
            // If you know a better way of detecting this - let me know.
            mfp.probablyMobile = mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            _document = $(document);

            mfp.popupsCache = {};
        },

        /**
         * Opens popup
         * @param  data [description]
         */
        open: function open(data) {

            var i;

            if (data.isObj === false) {
                // convert jQuery collection to array to avoid conflicts later
                mfp.items = data.items.toArray();

                mfp.index = 0;
                var items = data.items,
                    item;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.parsed) {
                        item = item.el[0];
                    }
                    if (item === data.el[0]) {
                        mfp.index = i;
                        break;
                    }
                }
            } else {
                mfp.items = $.isArray(data.items) ? data.items : [data.items];
                mfp.index = data.index || 0;
            }

            // if popup is already opened - we just update the content
            if (mfp.isOpen) {
                mfp.updateItemHTML();
                return;
            }

            mfp.types = [];
            _wrapClasses = '';
            if (data.mainEl && data.mainEl.length) {
                mfp.ev = data.mainEl.eq(0);
            } else {
                mfp.ev = _document;
            }

            if (data.key) {
                if (!mfp.popupsCache[data.key]) {
                    mfp.popupsCache[data.key] = {};
                }
                mfp.currTemplate = mfp.popupsCache[data.key];
            } else {
                mfp.currTemplate = {};
            }

            mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
            mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

            if (mfp.st.modal) {
                mfp.st.closeOnContentClick = false;
                mfp.st.closeOnBgClick = false;
                mfp.st.showCloseBtn = false;
                mfp.st.enableEscapeKey = false;
            }

            // Building markup
            // main containers are created only once
            if (!mfp.bgOverlay) {

                // Dark overlay
                mfp.bgOverlay = _getEl('bg').on('click' + EVENT_NS, function () {
                    mfp.close();
                });

                mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click' + EVENT_NS, function (e) {
                    if (mfp._checkIfClose(e.target)) {
                        mfp.close();
                    }
                });

                mfp.container = _getEl('container', mfp.wrap);
            }

            mfp.contentContainer = _getEl('content');
            if (mfp.st.preloader) {
                mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
            }

            // Initializing modules
            var modules = $.magnificPopup.modules;
            for (i = 0; i < modules.length; i++) {
                var n = modules[i];
                n = n.charAt(0).toUpperCase() + n.slice(1);
                mfp['init' + n].call(mfp);
            }
            _mfpTrigger('BeforeOpen');

            if (mfp.st.showCloseBtn) {
                // Close button
                if (!mfp.st.closeBtnInside) {
                    mfp.wrap.append(_getCloseBtn());
                } else {
                    _mfpOn(MARKUP_PARSE_EVENT, function (e, template, values, item) {
                        values.close_replaceWith = _getCloseBtn(item.type);
                    });
                    _wrapClasses += ' mfp-close-btn-in';
                }
            }

            if (mfp.st.alignTop) {
                _wrapClasses += ' mfp-align-top';
            }

            if (mfp.fixedContentPos) {
                mfp.wrap.css({
                    overflow: mfp.st.overflowY,
                    overflowX: 'hidden',
                    overflowY: mfp.st.overflowY
                });
            } else {
                mfp.wrap.css({
                    top: _window.scrollTop(),
                    position: 'absolute'
                });
            }
            if (mfp.st.fixedBgPos === false || mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) {
                mfp.bgOverlay.css({
                    height: _document.height(),
                    position: 'absolute'
                });
            }

            if (mfp.st.enableEscapeKey) {
                // Close on ESC key
                _document.on('keyup' + EVENT_NS, function (e) {
                    if (e.keyCode === 27) {
                        mfp.close();
                    }
                });
            }

            _window.on('resize' + EVENT_NS, function () {
                mfp.updateSize();
            });

            if (!mfp.st.closeOnContentClick) {
                _wrapClasses += ' mfp-auto-cursor';
            }

            if (_wrapClasses) mfp.wrap.addClass(_wrapClasses);

            // this triggers recalculation of layout, so we get it once to not to trigger twice
            var windowHeight = mfp.wH = _window.height();

            var windowStyles = {};

            if (mfp.fixedContentPos) {
                if (mfp._hasScrollBar(windowHeight)) {
                    var s = mfp._getScrollbarSize();
                    if (s) {
                        windowStyles.marginRight = s;
                    }
                }
            }

            if (mfp.fixedContentPos) {
                if (!mfp.isIE7) {
                    windowStyles.overflow = 'hidden';
                } else {
                    // ie7 double-scroll bug
                    $('body, html').css('overflow', 'hidden');
                }
            }

            var classesToadd = mfp.st.mainClass;
            if (mfp.isIE7) {
                classesToadd += ' mfp-ie7';
            }
            if (classesToadd) {
                mfp._addClassToMFP(classesToadd);
            }

            // add content
            mfp.updateItemHTML();

            _mfpTrigger('BuildControls');

            // remove scrollbar, add margin e.t.c
            $('html').css(windowStyles);

            // add everything to DOM
            mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || $(document.body));

            // Save last focused element
            mfp._lastFocusedEl = document.activeElement;

            // Wait for next cycle to allow CSS transition
            setTimeout(function () {

                if (mfp.content) {
                    mfp._addClassToMFP(READY_CLASS);
                    mfp._setFocus();
                } else {
                    // if content is not defined (not loaded e.t.c) we add class only for BG
                    mfp.bgOverlay.addClass(READY_CLASS);
                }

                // Trap the focus in popup
                _document.on('focusin' + EVENT_NS, mfp._onFocusIn);
            }, 16);

            mfp.isOpen = true;
            mfp.updateSize(windowHeight);
            _mfpTrigger(OPEN_EVENT);

            return data;
        },

        /**
         * Closes the popup
         */
        close: function close() {
            if (!mfp.isOpen) return;
            _mfpTrigger(BEFORE_CLOSE_EVENT);

            mfp.isOpen = false;
            // for CSS3 animation
            if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
                mfp._addClassToMFP(REMOVING_CLASS);
                setTimeout(function () {
                    mfp._close();
                }, mfp.st.removalDelay);
            } else {
                mfp._close();
            }
        },

        /**
         * Helper for close() function
         */
        _close: function _close() {
            _mfpTrigger(CLOSE_EVENT);

            var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

            mfp.bgOverlay.detach();
            mfp.wrap.detach();
            mfp.container.empty();

            if (mfp.st.mainClass) {
                classesToRemove += mfp.st.mainClass + ' ';
            }

            mfp._removeClassFromMFP(classesToRemove);

            if (mfp.fixedContentPos) {
                var windowStyles = { marginRight: '' };
                if (mfp.isIE7) {
                    $('body, html').css('overflow', '');
                } else {
                    windowStyles.overflow = '';
                }
                $('html').css(windowStyles);
            }

            _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
            mfp.ev.off(EVENT_NS);

            // clean up DOM elements that aren't removed
            mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
            mfp.bgOverlay.attr('class', 'mfp-bg');
            mfp.container.attr('class', 'mfp-container');

            // remove close button from target element
            if (mfp.st.showCloseBtn && (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
                if (mfp.currTemplate.closeBtn) mfp.currTemplate.closeBtn.detach();
            }

            if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
                $(mfp._lastFocusedEl).focus(); // put tab focus back
            }
            mfp.currItem = null;
            mfp.content = null;
            mfp.currTemplate = null;
            mfp.prevHeight = 0;

            _mfpTrigger(AFTER_CLOSE_EVENT);
        },

        updateSize: function updateSize(winHeight) {

            if (mfp.isIOS) {
                // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
                var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                var height = window.innerHeight * zoomLevel;
                mfp.wrap.css('height', height);
                mfp.wH = height;
            } else {
                mfp.wH = winHeight || _window.height();
            }
            // Fixes #84: popup incorrectly positioned with position:relative on body
            if (!mfp.fixedContentPos) {
                mfp.wrap.css('height', mfp.wH);
            }

            _mfpTrigger('Resize');
        },

        /**
         * Set content of popup based on current index
         */
        updateItemHTML: function updateItemHTML() {
            var item = mfp.items[mfp.index];

            // Detach and perform modifications
            mfp.contentContainer.detach();

            if (mfp.content) mfp.content.detach();

            if (!item.parsed) {
                item = mfp.parseEl(mfp.index);
            }

            var type = item.type;

            _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
            // BeforeChange event works like so:
            // _mfpOn('BeforeChange', function(e, prevType, newType) { });

            mfp.currItem = item;

            if (!mfp.currTemplate[type]) {
                var markup = mfp.st[type] ? mfp.st[type].markup : false;

                // allows to modify markup
                _mfpTrigger('FirstMarkupParse', markup);

                if (markup) {
                    mfp.currTemplate[type] = $(markup);
                } else {
                    // if there is no markup found we just define that template is parsed
                    mfp.currTemplate[type] = true;
                }
            }

            if (_prevContentType && _prevContentType !== item.type) {
                mfp.container.removeClass('mfp-' + _prevContentType + '-holder');
            }

            var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
            mfp.appendContent(newContent, type);

            item.preloaded = true;

            _mfpTrigger(CHANGE_EVENT, item);
            _prevContentType = item.type;

            // Append container back after its content changed
            mfp.container.prepend(mfp.contentContainer);

            _mfpTrigger('AfterChange');
        },

        /**
         * Set HTML content of popup
         */
        appendContent: function appendContent(newContent, type) {
            mfp.content = newContent;

            if (newContent) {
                if (mfp.st.showCloseBtn && mfp.st.closeBtnInside && mfp.currTemplate[type] === true) {
                    // if there is no markup, we just append close button element inside
                    if (!mfp.content.find('.mfp-close').length) {
                        mfp.content.append(_getCloseBtn());
                    }
                } else {
                    mfp.content = newContent;
                }
            } else {
                mfp.content = '';
            }

            _mfpTrigger(BEFORE_APPEND_EVENT);
            mfp.container.addClass('mfp-' + type + '-holder');

            mfp.contentContainer.append(mfp.content);
        },

        /**
         * Creates Magnific Popup data object based on given data
         * @param  {int} index Index of item to parse
         */
        parseEl: function parseEl(index) {
            var item = mfp.items[index],
                type;

            if (item.tagName) {
                item = { el: $(item) };
            } else {
                type = item.type;
                item = { data: item, src: item.src };
            }

            if (item.el) {
                var types = mfp.types;

                // check for 'mfp-TYPE' class
                for (var i = 0; i < types.length; i++) {
                    if (item.el.hasClass('mfp-' + types[i])) {
                        type = types[i];
                        break;
                    }
                }

                item.src = item.el.attr('data-mfp-src');
                if (!item.src) {
                    item.src = item.el.attr('href');
                }
            }

            item.type = type || mfp.st.type || 'inline';
            item.index = index;
            item.parsed = true;
            mfp.items[index] = item;
            _mfpTrigger('ElementParse', item);

            return mfp.items[index];
        },

        /**
         * Initializes single popup or a group of popups
         */
        addGroup: function addGroup(el, options) {
            var eHandler = function eHandler(e) {
                e.mfpEl = this;
                mfp._openClick(e, el, options);
            };

            if (!options) {
                options = {};
            }

            var eName = 'click.magnificPopup';
            options.mainEl = el;

            if (options.items) {
                options.isObj = true;
                el.off(eName).on(eName, eHandler);
            } else {
                options.isObj = false;
                if (options.delegate) {
                    el.off(eName).on(eName, options.delegate, eHandler);
                } else {
                    options.items = el;
                    el.off(eName).on(eName, eHandler);
                }
            }
        },
        _openClick: function _openClick(e, el, options) {
            var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;

            if (!midClick && (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                return;
            }

            var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

            if (disableOn) {
                if ($.isFunction(disableOn)) {
                    if (!disableOn.call(mfp)) {
                        return true;
                    }
                } else {
                    // else it's number
                    if (_window.width() < disableOn) {
                        return true;
                    }
                }
            }

            if (e.type) {
                e.preventDefault();

                // This will prevent popup from closing if element is inside and popup is already opened
                if (mfp.isOpen) {
                    e.stopPropagation();
                }
            }

            options.el = $(e.mfpEl);
            if (options.delegate) {
                options.items = el.find(options.delegate);
            }
            mfp.open(options);
        },

        /**
         * Updates text on preloader
         */
        updateStatus: function updateStatus(status, text) {

            if (mfp.preloader) {
                if (_prevStatus !== status) {
                    mfp.container.removeClass('mfp-s-' + _prevStatus);
                }

                if (!text && status === 'loading') {
                    text = mfp.st.tLoading;
                }

                var data = {
                    status: status,
                    text: text
                };
                // allows to modify status
                _mfpTrigger('UpdateStatus', data);

                status = data.status;
                text = data.text;

                mfp.preloader.html(text);

                mfp.preloader.find('a').on('click', function (e) {
                    e.stopImmediatePropagation();
                });

                mfp.container.addClass('mfp-s-' + status);
                _prevStatus = status;
            }
        },

        /*
            "Private" helpers that aren't private at all
         */
        // Check to close popup or not
        // "target" is an element that was clicked
        _checkIfClose: function _checkIfClose(target) {

            if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
                return;
            }

            var closeOnContent = mfp.st.closeOnContentClick;
            var closeOnBg = mfp.st.closeOnBgClick;

            if (closeOnContent && closeOnBg) {
                return true;
            } else {

                // We close the popup if click is on close button or on preloader. Or if there is no content.
                if (!mfp.content || $(target).hasClass('mfp-close') || mfp.preloader && target === mfp.preloader[0]) {
                    return true;
                }

                // if click is outside the content
                if (target !== mfp.content[0] && !$.contains(mfp.content[0], target)) {
                    if (closeOnBg) {
                        // last check, if the clicked element is in DOM, (in case it's removed onclick)
                        if ($.contains(document, target)) {
                            return true;
                        }
                    }
                } else if (closeOnContent) {
                    return true;
                }
            }
            return false;
        },
        _addClassToMFP: function _addClassToMFP(cName) {
            mfp.bgOverlay.addClass(cName);
            mfp.wrap.addClass(cName);
        },
        _removeClassFromMFP: function _removeClassFromMFP(cName) {
            this.bgOverlay.removeClass(cName);
            mfp.wrap.removeClass(cName);
        },
        _hasScrollBar: function _hasScrollBar(winHeight) {
            return (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height());
        },
        _setFocus: function _setFocus() {
            (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
        },
        _onFocusIn: function _onFocusIn(e) {
            if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
                mfp._setFocus();
                return false;
            }
        },
        _parseMarkup: function _parseMarkup(template, values, item) {
            var arr;
            if (item.data) {
                values = $.extend(item.data, values);
            }
            _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

            $.each(values, function (key, value) {
                if (value === undefined || value === false) {
                    return true;
                }
                arr = key.split('_');
                if (arr.length > 1) {
                    var el = template.find(EVENT_NS + '-' + arr[0]);

                    if (el.length > 0) {
                        var attr = arr[1];
                        if (attr === 'replaceWith') {
                            if (el[0] !== value[0]) {
                                el.replaceWith(value);
                            }
                        } else if (attr === 'img') {
                            if (el.is('img')) {
                                el.attr('src', value);
                            } else {
                                el.replaceWith($('<img>').attr('src', value).attr('class', el.attr('class')));
                            }
                        } else {
                            el.attr(arr[1], value);
                        }
                    }
                } else {
                    template.find(EVENT_NS + '-' + key).html(value);
                }
            });
        },

        _getScrollbarSize: function _getScrollbarSize() {
            // thx David
            if (mfp.scrollbarSize === undefined) {
                var scrollDiv = document.createElement("div");
                scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
                document.body.appendChild(scrollDiv);
                mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
            return mfp.scrollbarSize;
        }

    }; /* MagnificPopup core prototype end */

    /**
     * Public static functions
     */
    $.magnificPopup = {
        instance: null,
        proto: MagnificPopup.prototype,
        modules: [],

        open: function open(options, index) {
            _checkInstance();

            if (!options) {
                options = {};
            } else {
                options = $.extend(true, {}, options);
            }

            options.isObj = true;
            options.index = index || 0;
            return this.instance.open(options);
        },

        close: function close() {
            return $.magnificPopup.instance && $.magnificPopup.instance.close();
        },

        registerModule: function registerModule(name, module) {
            if (module.options) {
                $.magnificPopup.defaults[name] = module.options;
            }
            $.extend(this.proto, module.proto);
            this.modules.push(name);
        },

        defaults: {

            // Info about options is in docs:
            // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

            disableOn: 0,

            key: null,

            midClick: false,

            mainClass: '',

            preloader: true,

            focus: '', // CSS selector of input to focus after popup is opened

            closeOnContentClick: false,

            closeOnBgClick: true,

            closeBtnInside: true,

            showCloseBtn: true,

            enableEscapeKey: true,

            modal: false,

            alignTop: false,

            removalDelay: 0,

            prependTo: null,

            fixedContentPos: 'auto',

            fixedBgPos: 'auto',

            overflowY: 'auto',

            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

            tClose: 'Close (Esc)',

            tLoading: 'Loading...',

            autoFocusLast: true

        }
    };

    $.fn.magnificPopup = function (options) {
        _checkInstance();

        var jqEl = $(this);

        // We call some API method of first param is a string
        if (typeof options === "string") {

            if (options === 'open') {
                var items,
                    itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
                    index = parseInt(arguments[1], 10) || 0;

                if (itemOpts.items) {
                    items = itemOpts.items[index];
                } else {
                    items = jqEl;
                    if (itemOpts.delegate) {
                        items = items.find(itemOpts.delegate);
                    }
                    items = items.eq(index);
                }
                mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
            } else {
                if (mfp.isOpen) mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
            }
        } else {
            // clone options obj
            options = $.extend(true, {}, options);

            /*
             * As Zepto doesn't support .data() method for objects
             * and it works only in normal browsers
             * we assign "options" object directly to the DOM element. FTW!
             */
            if (_isJQ) {
                jqEl.data('magnificPopup', options);
            } else {
                jqEl[0].magnificPopup = options;
            }

            mfp.addGroup(jqEl, options);
        }
        return jqEl;
    };

    /*>>core*/

    /*>>inline*/

    var INLINE_NS = 'inline',
        _hiddenClass,
        _inlinePlaceholder,
        _lastInlineElement,
        _putInlineElementsBack = function _putInlineElementsBack() {
        if (_lastInlineElement) {
            _inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach();
            _lastInlineElement = null;
        }
    };

    $.magnificPopup.registerModule(INLINE_NS, {
        options: {
            hiddenClass: 'hide', // will be appended with `mfp-` prefix
            markup: '',
            tNotFound: 'Content not found'
        },
        proto: {

            initInline: function initInline() {
                mfp.types.push(INLINE_NS);

                _mfpOn(CLOSE_EVENT + '.' + INLINE_NS, function () {
                    _putInlineElementsBack();
                });
            },

            getInline: function getInline(item, template) {

                _putInlineElementsBack();

                if (item.src) {
                    var inlineSt = mfp.st.inline,
                        el = $(item.src);

                    if (el.length) {

                        // If target element has parent - we replace it with placeholder and put it back after popup is closed
                        var parent = el[0].parentNode;
                        if (parent && parent.tagName) {
                            if (!_inlinePlaceholder) {
                                _hiddenClass = inlineSt.hiddenClass;
                                _inlinePlaceholder = _getEl(_hiddenClass);
                                _hiddenClass = 'mfp-' + _hiddenClass;
                            }
                            // replace target inline element with placeholder
                            _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                        }

                        mfp.updateStatus('ready');
                    } else {
                        mfp.updateStatus('error', inlineSt.tNotFound);
                        el = $('<div>');
                    }

                    item.inlineElement = el;
                    return el;
                }

                mfp.updateStatus('ready');
                mfp._parseMarkup(template, {}, item);
                return template;
            }
        }
    });

    /*>>inline*/

    /*>>ajax*/
    var AJAX_NS = 'ajax',
        _ajaxCur,
        _removeAjaxCursor = function _removeAjaxCursor() {
        if (_ajaxCur) {
            $(document.body).removeClass(_ajaxCur);
        }
    },
        _destroyAjaxRequest = function _destroyAjaxRequest() {
        _removeAjaxCursor();
        if (mfp.req) {
            mfp.req.abort();
        }
    };

    $.magnificPopup.registerModule(AJAX_NS, {

        options: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },

        proto: {
            initAjax: function initAjax() {
                mfp.types.push(AJAX_NS);
                _ajaxCur = mfp.st.ajax.cursor;

                _mfpOn(CLOSE_EVENT + '.' + AJAX_NS, _destroyAjaxRequest);
                _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
            },
            getAjax: function getAjax(item) {

                if (_ajaxCur) {
                    $(document.body).addClass(_ajaxCur);
                }

                mfp.updateStatus('loading');

                var opts = $.extend({
                    url: item.src,
                    success: function success(data, textStatus, jqXHR) {
                        var temp = {
                            data: data,
                            xhr: jqXHR
                        };

                        _mfpTrigger('ParseAjax', temp);

                        mfp.appendContent($(temp.data), AJAX_NS);

                        item.finished = true;

                        _removeAjaxCursor();

                        mfp._setFocus();

                        setTimeout(function () {
                            mfp.wrap.addClass(READY_CLASS);
                        }, 16);

                        mfp.updateStatus('ready');

                        _mfpTrigger('AjaxContentAdded');
                    },
                    error: function error() {
                        _removeAjaxCursor();
                        item.finished = item.loadError = true;
                        mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
                    }
                }, mfp.st.ajax.settings);

                mfp.req = $.ajax(opts);

                return '';
            }
        }
    });

    /*>>ajax*/

    /*>>image*/
    var _imgInterval,
        _getTitle = function _getTitle(item) {
        if (item.data && item.data.title !== undefined) return item.data.title;

        var src = mfp.st.image.titleSrc;

        if (src) {
            if ($.isFunction(src)) {
                return src.call(mfp, item);
            } else if (item.el) {
                return item.el.attr(src) || '';
            }
        }
        return '';
    };

    $.magnificPopup.registerModule('image', {

        options: {
            markup: '<div class="mfp-figure">' + '<div class="mfp-close"></div>' + '<figure>' + '<div class="mfp-img"></div>' + '<figcaption>' + '<div class="mfp-bottom-bar">' + '<div class="mfp-title"></div>' + '<div class="mfp-counter"></div>' + '</div>' + '</figcaption>' + '</figure>' + '</div>',
            cursor: 'mfp-zoom-out-cur',
            titleSrc: 'title',
            verticalFit: true,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },

        proto: {
            initImage: function initImage() {
                var imgSt = mfp.st.image,
                    ns = '.image';

                mfp.types.push('image');

                _mfpOn(OPEN_EVENT + ns, function () {
                    if (mfp.currItem.type === 'image' && imgSt.cursor) {
                        $(document.body).addClass(imgSt.cursor);
                    }
                });

                _mfpOn(CLOSE_EVENT + ns, function () {
                    if (imgSt.cursor) {
                        $(document.body).removeClass(imgSt.cursor);
                    }
                    _window.off('resize' + EVENT_NS);
                });

                _mfpOn('Resize' + ns, mfp.resizeImage);
                if (mfp.isLowIE) {
                    _mfpOn('AfterChange', mfp.resizeImage);
                }
            },
            resizeImage: function resizeImage() {
                var item = mfp.currItem;
                if (!item || !item.img) return;

                if (mfp.st.image.verticalFit) {
                    var decr = 0;
                    // fix box-sizing in ie7/8
                    if (mfp.isLowIE) {
                        decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'), 10);
                    }
                    item.img.css('max-height', mfp.wH - decr);
                }
            },
            _onImageHasSize: function _onImageHasSize(item) {
                if (item.img) {

                    item.hasSize = true;

                    if (_imgInterval) {
                        clearInterval(_imgInterval);
                    }

                    item.isCheckingImgSize = false;

                    _mfpTrigger('ImageHasSize', item);

                    if (item.imgHidden) {
                        if (mfp.content) mfp.content.removeClass('mfp-loading');

                        item.imgHidden = false;
                    }
                }
            },

            /**
             * Function that loops until the image has size to display elements that rely on it asap
             */
            findImageSize: function findImageSize(item) {

                var counter = 0,
                    img = item.img[0],
                    mfpSetInterval = function mfpSetInterval(delay) {

                    if (_imgInterval) {
                        clearInterval(_imgInterval);
                    }
                    // decelerating interval that checks for size of an image
                    _imgInterval = setInterval(function () {
                        if (img.naturalWidth > 0) {
                            mfp._onImageHasSize(item);
                            return;
                        }

                        if (counter > 200) {
                            clearInterval(_imgInterval);
                        }

                        counter++;
                        if (counter === 3) {
                            mfpSetInterval(10);
                        } else if (counter === 40) {
                            mfpSetInterval(50);
                        } else if (counter === 100) {
                            mfpSetInterval(500);
                        }
                    }, delay);
                };

                mfpSetInterval(1);
            },

            getImage: function getImage(item, template) {

                var guard = 0,


                // image load complete handler
                onLoadComplete = function onLoadComplete() {
                    if (item) {
                        if (item.img[0].complete) {
                            item.img.off('.mfploader');

                            if (item === mfp.currItem) {
                                mfp._onImageHasSize(item);

                                mfp.updateStatus('ready');
                            }

                            item.hasSize = true;
                            item.loaded = true;

                            _mfpTrigger('ImageLoadComplete');
                        } else {
                            // if image complete check fails 200 times (20 sec), we assume that there was an error.
                            guard++;
                            if (guard < 200) {
                                setTimeout(onLoadComplete, 100);
                            } else {
                                onLoadError();
                            }
                        }
                    }
                },


                // image error handler
                onLoadError = function onLoadError() {
                    if (item) {
                        item.img.off('.mfploader');
                        if (item === mfp.currItem) {
                            mfp._onImageHasSize(item);
                            mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                        }

                        item.hasSize = true;
                        item.loaded = true;
                        item.loadError = true;
                    }
                },
                    imgSt = mfp.st.image;

                var el = template.find('.mfp-img');
                if (el.length) {
                    var img = document.createElement('img');
                    img.className = 'mfp-img';
                    if (item.el && item.el.find('img').length) {
                        img.alt = item.el.find('img').attr('alt');
                    }
                    item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
                    img.src = item.src;

                    // without clone() "error" event is not firing when IMG is replaced by new IMG
                    // TODO: find a way to avoid such cloning
                    if (el.is('img')) {
                        item.img = item.img.clone();
                    }

                    img = item.img[0];
                    if (img.naturalWidth > 0) {
                        item.hasSize = true;
                    } else if (!img.width) {
                        item.hasSize = false;
                    }
                }

                mfp._parseMarkup(template, {
                    title: _getTitle(item),
                    img_replaceWith: item.img
                }, item);

                mfp.resizeImage();

                if (item.hasSize) {
                    if (_imgInterval) clearInterval(_imgInterval);

                    if (item.loadError) {
                        template.addClass('mfp-loading');
                        mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                    } else {
                        template.removeClass('mfp-loading');
                        mfp.updateStatus('ready');
                    }
                    return template;
                }

                mfp.updateStatus('loading');
                item.loading = true;

                if (!item.hasSize) {
                    item.imgHidden = true;
                    template.addClass('mfp-loading');
                    mfp.findImageSize(item);
                }

                return template;
            }
        }
    });

    /*>>image*/

    /*>>zoom*/
    var hasMozTransform,
        getHasMozTransform = function getHasMozTransform() {
        if (hasMozTransform === undefined) {
            hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
        }
        return hasMozTransform;
    };

    $.magnificPopup.registerModule('zoom', {

        options: {
            enabled: false,
            easing: 'ease-in-out',
            duration: 300,
            opener: function opener(element) {
                return element.is('img') ? element : element.find('img');
            }
        },

        proto: {

            initZoom: function initZoom() {
                var zoomSt = mfp.st.zoom,
                    ns = '.zoom',
                    image;

                if (!zoomSt.enabled || !mfp.supportsTransition) {
                    return;
                }

                var duration = zoomSt.duration,
                    getElToAnimate = function getElToAnimate(image) {
                    var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                        transition = 'all ' + zoomSt.duration / 1000 + 's ' + zoomSt.easing,
                        cssObj = {
                        position: 'fixed',
                        zIndex: 9999,
                        left: 0,
                        top: 0,
                        '-webkit-backface-visibility': 'hidden'
                    },
                        t = 'transition';

                    cssObj['-webkit-' + t] = cssObj['-moz-' + t] = cssObj['-o-' + t] = cssObj[t] = transition;

                    newImg.css(cssObj);
                    return newImg;
                },
                    showMainContent = function showMainContent() {
                    mfp.content.css('visibility', 'visible');
                },
                    openTimeout,
                    animatedImg;

                _mfpOn('BuildControls' + ns, function () {
                    if (mfp._allowZoom()) {

                        clearTimeout(openTimeout);
                        mfp.content.css('visibility', 'hidden');

                        // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

                        image = mfp._getItemToZoom();

                        if (!image) {
                            showMainContent();
                            return;
                        }

                        animatedImg = getElToAnimate(image);

                        animatedImg.css(mfp._getOffset());

                        mfp.wrap.append(animatedImg);

                        openTimeout = setTimeout(function () {
                            animatedImg.css(mfp._getOffset(true));
                            openTimeout = setTimeout(function () {

                                showMainContent();

                                setTimeout(function () {
                                    animatedImg.remove();
                                    image = animatedImg = null;
                                    _mfpTrigger('ZoomAnimationEnded');
                                }, 16); // avoid blink when switching images
                            }, duration); // this timeout equals animation duration
                        }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


                        // Lots of timeouts...
                    }
                });
                _mfpOn(BEFORE_CLOSE_EVENT + ns, function () {
                    if (mfp._allowZoom()) {

                        clearTimeout(openTimeout);

                        mfp.st.removalDelay = duration;

                        if (!image) {
                            image = mfp._getItemToZoom();
                            if (!image) {
                                return;
                            }
                            animatedImg = getElToAnimate(image);
                        }

                        animatedImg.css(mfp._getOffset(true));
                        mfp.wrap.append(animatedImg);
                        mfp.content.css('visibility', 'hidden');

                        setTimeout(function () {
                            animatedImg.css(mfp._getOffset());
                        }, 16);
                    }
                });

                _mfpOn(CLOSE_EVENT + ns, function () {
                    if (mfp._allowZoom()) {
                        showMainContent();
                        if (animatedImg) {
                            animatedImg.remove();
                        }
                        image = null;
                    }
                });
            },

            _allowZoom: function _allowZoom() {
                return mfp.currItem.type === 'image';
            },

            _getItemToZoom: function _getItemToZoom() {
                if (mfp.currItem.hasSize) {
                    return mfp.currItem.img;
                } else {
                    return false;
                }
            },

            // Get element postion relative to viewport
            _getOffset: function _getOffset(isLarge) {
                var el;
                if (isLarge) {
                    el = mfp.currItem.img;
                } else {
                    el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
                }

                var offset = el.offset();
                var paddingTop = parseInt(el.css('padding-top'), 10);
                var paddingBottom = parseInt(el.css('padding-bottom'), 10);

                offset.top -= $(window).scrollTop() - paddingTop;

                /*
                 Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
                  */
                var obj = {
                    width: el.width(),
                    // fix Zepto height+padding issue
                    height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
                };

                // I hate to do this, but there is no another option
                if (getHasMozTransform()) {
                    obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
                } else {
                    obj.left = offset.left;
                    obj.top = offset.top;
                }
                return obj;
            }

        }
    });

    /*>>zoom*/

    /*>>iframe*/

    var IFRAME_NS = 'iframe',
        _emptyPage = '//about:blank',
        _fixIframeBugs = function _fixIframeBugs(isShowing) {
        if (mfp.currTemplate[IFRAME_NS]) {
            var el = mfp.currTemplate[IFRAME_NS].find('iframe');
            if (el.length) {
                // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
                if (!isShowing) {
                    el[0].src = _emptyPage;
                }

                // IE8 black screen bug fix
                if (mfp.isIE8) {
                    el.css('display', isShowing ? 'block' : 'none');
                }
            }
        }
    };

    $.magnificPopup.registerModule(IFRAME_NS, {

        options: {
            markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' + '</div>',

            srcAction: 'iframe_src',

            // we don't care and support only one default type of URL by default
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        },

        proto: {
            initIframe: function initIframe() {
                mfp.types.push(IFRAME_NS);

                _mfpOn('BeforeChange', function (e, prevType, newType) {
                    if (prevType !== newType) {
                        if (prevType === IFRAME_NS) {
                            _fixIframeBugs(); // iframe if removed
                        } else if (newType === IFRAME_NS) {
                            _fixIframeBugs(true); // iframe is showing
                        }
                    } // else {
                    // iframe source is switched, don't do anything
                    //}
                });

                _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function () {
                    _fixIframeBugs();
                });
            },

            getIframe: function getIframe(item, template) {
                var embedSrc = item.src;
                var iframeSt = mfp.st.iframe;

                $.each(iframeSt.patterns, function () {
                    if (embedSrc.indexOf(this.index) > -1) {
                        if (this.id) {
                            if (typeof this.id === 'string') {
                                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length);
                            } else {
                                embedSrc = this.id.call(this, embedSrc);
                            }
                        }
                        embedSrc = this.src.replace('%id%', embedSrc);
                        return false; // break;
                    }
                });

                var dataObj = {};
                if (iframeSt.srcAction) {
                    dataObj[iframeSt.srcAction] = embedSrc;
                }
                mfp._parseMarkup(template, dataObj, item);

                mfp.updateStatus('ready');

                return template;
            }
        }
    });

    /*>>iframe*/

    /*>>gallery*/
    /**
     * Get looped index depending on number of slides
     */
    var _getLoopedId = function _getLoopedId(index) {
        var numSlides = mfp.items.length;
        if (index > numSlides - 1) {
            return index - numSlides;
        } else if (index < 0) {
            return numSlides + index;
        }
        return index;
    },
        _replaceCurrTotal = function _replaceCurrTotal(text, curr, total) {
        return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
    };

    $.magnificPopup.registerModule('gallery', {

        options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: true,
            arrows: true,

            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },

        proto: {
            initGallery: function initGallery() {

                var gSt = mfp.st.gallery,
                    ns = '.mfp-gallery';

                mfp.direction = true; // true - next, false - prev

                if (!gSt || !gSt.enabled) return false;

                _wrapClasses += ' mfp-gallery';

                _mfpOn(OPEN_EVENT + ns, function () {

                    if (gSt.navigateByImgClick) {
                        mfp.wrap.on('click' + ns, '.mfp-img', function () {
                            if (mfp.items.length > 1) {
                                mfp.next();
                                return false;
                            }
                        });
                    }

                    _document.on('keydown' + ns, function (e) {
                        if (e.keyCode === 37) {
                            mfp.prev();
                        } else if (e.keyCode === 39) {
                            mfp.next();
                        }
                    });
                });

                _mfpOn('UpdateStatus' + ns, function (e, data) {
                    if (data.text) {
                        data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
                    }
                });

                _mfpOn(MARKUP_PARSE_EVENT + ns, function (e, element, values, item) {
                    var l = mfp.items.length;
                    values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
                });

                _mfpOn('BuildControls' + ns, function () {
                    if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                        var markup = gSt.arrowMarkup,
                            arrowLeft = mfp.arrowLeft = $(markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left')).addClass(PREVENT_CLOSE_CLASS),
                            arrowRight = mfp.arrowRight = $(markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right')).addClass(PREVENT_CLOSE_CLASS);

                        arrowLeft.click(function () {
                            mfp.prev();
                        });
                        arrowRight.click(function () {
                            mfp.next();
                        });

                        mfp.container.append(arrowLeft.add(arrowRight));
                    }
                });

                _mfpOn(CHANGE_EVENT + ns, function () {
                    if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

                    mfp._preloadTimeout = setTimeout(function () {
                        mfp.preloadNearbyImages();
                        mfp._preloadTimeout = null;
                    }, 16);
                });

                _mfpOn(CLOSE_EVENT + ns, function () {
                    _document.off(ns);
                    mfp.wrap.off('click' + ns);
                    mfp.arrowRight = mfp.arrowLeft = null;
                });
            },
            next: function next() {
                mfp.direction = true;
                mfp.index = _getLoopedId(mfp.index + 1);
                mfp.updateItemHTML();
            },
            prev: function prev() {
                mfp.direction = false;
                mfp.index = _getLoopedId(mfp.index - 1);
                mfp.updateItemHTML();
            },
            goTo: function goTo(newIndex) {
                mfp.direction = newIndex >= mfp.index;
                mfp.index = newIndex;
                mfp.updateItemHTML();
            },
            preloadNearbyImages: function preloadNearbyImages() {
                var p = mfp.st.gallery.preload,
                    preloadBefore = Math.min(p[0], mfp.items.length),
                    preloadAfter = Math.min(p[1], mfp.items.length),
                    i;

                for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
                    mfp._preloadItem(mfp.index + i);
                }
                for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
                    mfp._preloadItem(mfp.index - i);
                }
            },
            _preloadItem: function _preloadItem(index) {
                index = _getLoopedId(index);

                if (mfp.items[index].preloaded) {
                    return;
                }

                var item = mfp.items[index];
                if (!item.parsed) {
                    item = mfp.parseEl(index);
                }

                _mfpTrigger('LazyLoad', item);

                if (item.type === 'image') {
                    item.img = $('<img class="mfp-img" />').on('load.mfploader', function () {
                        item.hasSize = true;
                    }).on('error.mfploader', function () {
                        item.hasSize = true;
                        item.loadError = true;
                        _mfpTrigger('LazyLoadError', item);
                    }).attr('src', item.src);
                }

                item.preloaded = true;
            }
        }
    });

    /*>>gallery*/

    /*>>retina*/

    var RETINA_NS = 'retina';

    $.magnificPopup.registerModule(RETINA_NS, {
        options: {
            replaceSrc: function replaceSrc(item) {
                return item.src.replace(/\.\w+$/, function (m) {
                    return '@2x' + m;
                });
            },
            ratio: 1 // Function or number.  Set to 1 to disable.
        },
        proto: {
            initRetina: function initRetina() {
                if (window.devicePixelRatio > 1) {

                    var st = mfp.st.retina,
                        ratio = st.ratio;

                    ratio = !isNaN(ratio) ? ratio : ratio();

                    if (ratio > 1) {
                        _mfpOn('ImageHasSize' + '.' + RETINA_NS, function (e, item) {
                            item.img.css({
                                'max-width': item.img[0].naturalWidth / ratio,
                                'width': '100%'
                            });
                        });
                        _mfpOn('ElementParse' + '.' + RETINA_NS, function (e, item) {
                            item.src = st.replaceSrc(item, ratio);
                        });
                    }
                }
            }
        }
    });

    /*>>retina*/
    _checkInstance();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9tYWduaWZpYy1wb3B1cC5taW4uanMiXSwibmFtZXMiOlsiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJyZXF1aXJlIiwid2luZG93IiwialF1ZXJ5IiwiWmVwdG8iLCIkIiwiQ0xPU0VfRVZFTlQiLCJCRUZPUkVfQ0xPU0VfRVZFTlQiLCJBRlRFUl9DTE9TRV9FVkVOVCIsIkJFRk9SRV9BUFBFTkRfRVZFTlQiLCJNQVJLVVBfUEFSU0VfRVZFTlQiLCJPUEVOX0VWRU5UIiwiQ0hBTkdFX0VWRU5UIiwiTlMiLCJFVkVOVF9OUyIsIlJFQURZX0NMQVNTIiwiUkVNT1ZJTkdfQ0xBU1MiLCJQUkVWRU5UX0NMT1NFX0NMQVNTIiwibWZwIiwiTWFnbmlmaWNQb3B1cCIsIl9pc0pRIiwiX3ByZXZTdGF0dXMiLCJfd2luZG93IiwiX2RvY3VtZW50IiwiX3ByZXZDb250ZW50VHlwZSIsIl93cmFwQ2xhc3NlcyIsIl9jdXJyUG9wdXBUeXBlIiwiX21mcE9uIiwibmFtZSIsImYiLCJldiIsIm9uIiwiX2dldEVsIiwiY2xhc3NOYW1lIiwiYXBwZW5kVG8iLCJodG1sIiwicmF3IiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsIl9tZnBUcmlnZ2VyIiwiZSIsImRhdGEiLCJ0cmlnZ2VySGFuZGxlciIsInN0IiwiY2FsbGJhY2tzIiwiY2hhckF0IiwidG9Mb3dlckNhc2UiLCJzbGljZSIsImFwcGx5IiwiaXNBcnJheSIsIl9nZXRDbG9zZUJ0biIsInR5cGUiLCJjdXJyVGVtcGxhdGUiLCJjbG9zZUJ0biIsImNsb3NlTWFya3VwIiwicmVwbGFjZSIsInRDbG9zZSIsIl9jaGVja0luc3RhbmNlIiwibWFnbmlmaWNQb3B1cCIsImluc3RhbmNlIiwiaW5pdCIsInN1cHBvcnRzVHJhbnNpdGlvbnMiLCJzIiwic3R5bGUiLCJ2IiwidW5kZWZpbmVkIiwibGVuZ3RoIiwicG9wIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJhcHBWZXJzaW9uIiwibmF2aWdhdG9yIiwiaXNMb3dJRSIsImlzSUU4IiwiYWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzQW5kcm9pZCIsInRlc3QiLCJpc0lPUyIsInN1cHBvcnRzVHJhbnNpdGlvbiIsInByb2JhYmx5TW9iaWxlIiwidXNlckFnZW50IiwicG9wdXBzQ2FjaGUiLCJvcGVuIiwiaSIsImlzT2JqIiwiaXRlbXMiLCJ0b0FycmF5IiwiaW5kZXgiLCJpdGVtIiwicGFyc2VkIiwiaXNPcGVuIiwidXBkYXRlSXRlbUhUTUwiLCJ0eXBlcyIsIm1haW5FbCIsImVxIiwia2V5IiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJmaXhlZENvbnRlbnRQb3MiLCJtb2RhbCIsImNsb3NlT25Db250ZW50Q2xpY2siLCJjbG9zZU9uQmdDbGljayIsInNob3dDbG9zZUJ0biIsImVuYWJsZUVzY2FwZUtleSIsImJnT3ZlcmxheSIsImNsb3NlIiwid3JhcCIsImF0dHIiLCJfY2hlY2tJZkNsb3NlIiwidGFyZ2V0IiwiY29udGFpbmVyIiwiY29udGVudENvbnRhaW5lciIsInByZWxvYWRlciIsInRMb2FkaW5nIiwibW9kdWxlcyIsIm4iLCJ0b1VwcGVyQ2FzZSIsImNhbGwiLCJjbG9zZUJ0bkluc2lkZSIsImFwcGVuZCIsInRlbXBsYXRlIiwidmFsdWVzIiwiY2xvc2VfcmVwbGFjZVdpdGgiLCJhbGlnblRvcCIsImNzcyIsIm92ZXJmbG93Iiwib3ZlcmZsb3dZIiwib3ZlcmZsb3dYIiwidG9wIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJmaXhlZEJnUG9zIiwiaGVpZ2h0Iiwia2V5Q29kZSIsInVwZGF0ZVNpemUiLCJhZGRDbGFzcyIsIndpbmRvd0hlaWdodCIsIndIIiwid2luZG93U3R5bGVzIiwiX2hhc1Njcm9sbEJhciIsIl9nZXRTY3JvbGxiYXJTaXplIiwibWFyZ2luUmlnaHQiLCJpc0lFNyIsImNsYXNzZXNUb2FkZCIsIm1haW5DbGFzcyIsIl9hZGRDbGFzc1RvTUZQIiwiYWRkIiwicHJlcGVuZFRvIiwiYm9keSIsIl9sYXN0Rm9jdXNlZEVsIiwiYWN0aXZlRWxlbWVudCIsInNldFRpbWVvdXQiLCJjb250ZW50IiwiX3NldEZvY3VzIiwiX29uRm9jdXNJbiIsInJlbW92YWxEZWxheSIsIl9jbG9zZSIsImNsYXNzZXNUb1JlbW92ZSIsImRldGFjaCIsImVtcHR5IiwiX3JlbW92ZUNsYXNzRnJvbU1GUCIsIm9mZiIsInJlbW92ZUF0dHIiLCJjdXJySXRlbSIsImF1dG9Gb2N1c0xhc3QiLCJmb2N1cyIsInByZXZIZWlnaHQiLCJ3aW5IZWlnaHQiLCJ6b29tTGV2ZWwiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInBhcnNlRWwiLCJtYXJrdXAiLCJyZW1vdmVDbGFzcyIsIm5ld0NvbnRlbnQiLCJhcHBlbmRDb250ZW50IiwicHJlbG9hZGVkIiwicHJlcGVuZCIsImZpbmQiLCJ0YWdOYW1lIiwic3JjIiwiaGFzQ2xhc3MiLCJhZGRHcm91cCIsIm9wdGlvbnMiLCJlSGFuZGxlciIsIm1mcEVsIiwiX29wZW5DbGljayIsImVOYW1lIiwiZGVsZWdhdGUiLCJtaWRDbGljayIsIndoaWNoIiwiY3RybEtleSIsIm1ldGFLZXkiLCJhbHRLZXkiLCJzaGlmdEtleSIsImRpc2FibGVPbiIsImlzRnVuY3Rpb24iLCJ3aWR0aCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidXBkYXRlU3RhdHVzIiwic3RhdHVzIiwidGV4dCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImNsb3NlT25Db250ZW50IiwiY2xvc2VPbkJnIiwiY29udGFpbnMiLCJjTmFtZSIsInNjcm9sbEhlaWdodCIsIl9wYXJzZU1hcmt1cCIsImFyciIsImVhY2giLCJ2YWx1ZSIsInNwbGl0IiwicmVwbGFjZVdpdGgiLCJpcyIsInNjcm9sbGJhclNpemUiLCJzY3JvbGxEaXYiLCJjc3NUZXh0Iiwib2Zmc2V0V2lkdGgiLCJyZW1vdmVDaGlsZCIsInByb3RvIiwicmVnaXN0ZXJNb2R1bGUiLCJtb2R1bGUiLCJwdXNoIiwiZm4iLCJqcUVsIiwiaXRlbU9wdHMiLCJwYXJzZUludCIsImFyZ3VtZW50cyIsIkFycmF5IiwiSU5MSU5FX05TIiwiX2hpZGRlbkNsYXNzIiwiX2lubGluZVBsYWNlaG9sZGVyIiwiX2xhc3RJbmxpbmVFbGVtZW50IiwiX3B1dElubGluZUVsZW1lbnRzQmFjayIsImFmdGVyIiwiaGlkZGVuQ2xhc3MiLCJ0Tm90Rm91bmQiLCJpbml0SW5saW5lIiwiZ2V0SW5saW5lIiwiaW5saW5lU3QiLCJpbmxpbmUiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiaW5saW5lRWxlbWVudCIsIkFKQVhfTlMiLCJfYWpheEN1ciIsIl9yZW1vdmVBamF4Q3Vyc29yIiwiX2Rlc3Ryb3lBamF4UmVxdWVzdCIsInJlcSIsImFib3J0Iiwic2V0dGluZ3MiLCJjdXJzb3IiLCJ0RXJyb3IiLCJpbml0QWpheCIsImFqYXgiLCJnZXRBamF4Iiwib3B0cyIsInVybCIsInN1Y2Nlc3MiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJ0ZW1wIiwieGhyIiwiZmluaXNoZWQiLCJlcnJvciIsImxvYWRFcnJvciIsIl9pbWdJbnRlcnZhbCIsIl9nZXRUaXRsZSIsInRpdGxlIiwiaW1hZ2UiLCJ0aXRsZVNyYyIsInZlcnRpY2FsRml0IiwiaW5pdEltYWdlIiwiaW1nU3QiLCJucyIsInJlc2l6ZUltYWdlIiwiaW1nIiwiZGVjciIsIl9vbkltYWdlSGFzU2l6ZSIsImhhc1NpemUiLCJjbGVhckludGVydmFsIiwiaXNDaGVja2luZ0ltZ1NpemUiLCJpbWdIaWRkZW4iLCJmaW5kSW1hZ2VTaXplIiwiY291bnRlciIsIm1mcFNldEludGVydmFsIiwiZGVsYXkiLCJzZXRJbnRlcnZhbCIsIm5hdHVyYWxXaWR0aCIsImdldEltYWdlIiwiZ3VhcmQiLCJvbkxvYWRDb21wbGV0ZSIsImNvbXBsZXRlIiwibG9hZGVkIiwib25Mb2FkRXJyb3IiLCJhbHQiLCJjbG9uZSIsImltZ19yZXBsYWNlV2l0aCIsImxvYWRpbmciLCJoYXNNb3pUcmFuc2Zvcm0iLCJnZXRIYXNNb3pUcmFuc2Zvcm0iLCJNb3pUcmFuc2Zvcm0iLCJlbmFibGVkIiwiZWFzaW5nIiwiZHVyYXRpb24iLCJvcGVuZXIiLCJlbGVtZW50IiwiaW5pdFpvb20iLCJ6b29tU3QiLCJ6b29tIiwiZ2V0RWxUb0FuaW1hdGUiLCJuZXdJbWciLCJ0cmFuc2l0aW9uIiwiY3NzT2JqIiwiekluZGV4IiwibGVmdCIsInQiLCJzaG93TWFpbkNvbnRlbnQiLCJvcGVuVGltZW91dCIsImFuaW1hdGVkSW1nIiwiX2FsbG93Wm9vbSIsImNsZWFyVGltZW91dCIsIl9nZXRJdGVtVG9ab29tIiwiX2dldE9mZnNldCIsInJlbW92ZSIsImlzTGFyZ2UiLCJvZmZzZXQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm9iaiIsIm9mZnNldEhlaWdodCIsIklGUkFNRV9OUyIsIl9lbXB0eVBhZ2UiLCJfZml4SWZyYW1lQnVncyIsImlzU2hvd2luZyIsInNyY0FjdGlvbiIsInBhdHRlcm5zIiwieW91dHViZSIsImlkIiwidmltZW8iLCJnbWFwcyIsImluaXRJZnJhbWUiLCJwcmV2VHlwZSIsIm5ld1R5cGUiLCJnZXRJZnJhbWUiLCJlbWJlZFNyYyIsImlmcmFtZVN0IiwiaWZyYW1lIiwiaW5kZXhPZiIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiZGF0YU9iaiIsIl9nZXRMb29wZWRJZCIsIm51bVNsaWRlcyIsIl9yZXBsYWNlQ3VyclRvdGFsIiwiY3VyciIsInRvdGFsIiwiYXJyb3dNYXJrdXAiLCJwcmVsb2FkIiwibmF2aWdhdGVCeUltZ0NsaWNrIiwiYXJyb3dzIiwidFByZXYiLCJ0TmV4dCIsInRDb3VudGVyIiwiaW5pdEdhbGxlcnkiLCJnU3QiLCJnYWxsZXJ5IiwiZGlyZWN0aW9uIiwibmV4dCIsInByZXYiLCJsIiwiYXJyb3dMZWZ0IiwiYXJyb3dSaWdodCIsImNsaWNrIiwiX3ByZWxvYWRUaW1lb3V0IiwicHJlbG9hZE5lYXJieUltYWdlcyIsImdvVG8iLCJuZXdJbmRleCIsInAiLCJwcmVsb2FkQmVmb3JlIiwiTWF0aCIsIm1pbiIsInByZWxvYWRBZnRlciIsIl9wcmVsb2FkSXRlbSIsIlJFVElOQV9OUyIsInJlcGxhY2VTcmMiLCJtIiwicmF0aW8iLCJpbml0UmV0aW5hIiwiZGV2aWNlUGl4ZWxSYXRpbyIsInJldGluYSIsImlzTmFOIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUdBLENBQUUsV0FBVUEsT0FBVixFQUFtQjtBQUNyQixRQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBQy9DO0FBQ0FELGVBQU8sQ0FBQyxRQUFELENBQVAsRUFBbUJELE9BQW5CO0FBQ0MsS0FIRixNQUdRLElBQUksUUFBT0csT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUF2QixFQUFpQztBQUN4QztBQUNBSCxnQkFBUUksUUFBUSxRQUFSLENBQVI7QUFDQyxLQUhNLE1BR0E7QUFDUDtBQUNBSixnQkFBUUssT0FBT0MsTUFBUCxJQUFpQkQsT0FBT0UsS0FBaEM7QUFDQztBQUNBLENBWEEsRUFXQyxVQUFTQyxDQUFULEVBQVk7O0FBRWY7QUFDQTs7Ozs7O0FBT0E7OztBQUdBLFFBQUlDLGNBQWMsT0FBbEI7QUFBQSxRQUNJQyxxQkFBcUIsYUFEekI7QUFBQSxRQUVJQyxvQkFBb0IsWUFGeEI7QUFBQSxRQUdJQyxzQkFBc0IsY0FIMUI7QUFBQSxRQUlJQyxxQkFBcUIsYUFKekI7QUFBQSxRQUtJQyxhQUFhLE1BTGpCO0FBQUEsUUFNSUMsZUFBZSxRQU5uQjtBQUFBLFFBT0lDLEtBQUssS0FQVDtBQUFBLFFBUUlDLFdBQVcsTUFBTUQsRUFSckI7QUFBQSxRQVNJRSxjQUFjLFdBVGxCO0FBQUEsUUFVSUMsaUJBQWlCLGNBVnJCO0FBQUEsUUFXSUMsc0JBQXNCLG1CQVgxQjs7QUFjQTs7O0FBR0E7QUFDQSxRQUFJQyxHQUFKO0FBQUEsUUFBUztBQUNMQyxvQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQVUsQ0FBRSxDQURoQztBQUFB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VCxFQUFZWSxZQUFaLEdBQTJCbUcsS0FEL0I7QUFFVCx5Q0FBUztBQUZBLDZCQUFiO0FBSUgseUJBTEQ7QUFNQWhYLCtCQUFPLGlCQUFpQixHQUFqQixHQUF1QjZXLFNBQTlCLEVBQXlDLFVBQVM3VixDQUFULEVBQVlpRCxJQUFaLEVBQWtCO0FBQ3ZEQSxpQ0FBSzhGLEdBQUwsR0FBVzVJLEdBQUcyVixVQUFILENBQWM3UyxJQUFkLEVBQW9CK1MsS0FBcEIsQ0FBWDtBQUNILHlCQUZEO0FBR0g7QUFDSjtBQUVKO0FBdEJFO0FBUCtCLEtBQTFDOztBQWlDQTtBQUNDL1U7QUFBbUIsQ0FoMERsQixDQUFEIiwiZmlsZSI6Il9tYWduaWZpYy1wb3B1cC5taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgTWFnbmlmaWMgUG9wdXAgLSB2MS4xLjAgLSAyMDE2LTAyLTIwXG4qIGh0dHA6Ly9kaW1zZW1lbm92LmNvbS9wbHVnaW5zL21hZ25pZmljLXBvcHVwL1xuKiBDb3B5cmlnaHQgKGMpIDIwMTYgRG1pdHJ5IFNlbWVub3Y7ICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7IFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgeyBcbiAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuIFxuIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTsgXG4gfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHsgXG4gLy8gTm9kZS9Db21tb25KUyBcbiBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTsgXG4gfSBlbHNlIHsgXG4gLy8gQnJvd3NlciBnbG9iYWxzIFxuIGZhY3Rvcnkod2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pOyBcbiB9IFxuIH0oZnVuY3Rpb24oJCkgeyBcblxuLyo+PmNvcmUqL1xuLyoqXG4gKiBcbiAqIE1hZ25pZmljIFBvcHVwIENvcmUgSlMgZmlsZVxuICogXG4gKi9cblxuXG4vKipcbiAqIFByaXZhdGUgc3RhdGljIGNvbnN0YW50c1xuICovXG52YXIgQ0xPU0VfRVZFTlQgPSAnQ2xvc2UnLFxuICAgIEJFRk9SRV9DTE9TRV9FVkVOVCA9ICdCZWZvcmVDbG9zZScsXG4gICAgQUZURVJfQ0xPU0VfRVZFTlQgPSAnQWZ0ZXJDbG9zZScsXG4gICAgQkVGT1JFX0FQUEVORF9FVkVOVCA9ICdCZWZvcmVBcHBlbmQnLFxuICAgIE1BUktVUF9QQVJTRV9FVkVOVCA9ICdNYXJrdXBQYXJzZScsXG4gICAgT1BFTl9FVkVOVCA9ICdPcGVuJyxcbiAgICBDSEFOR0VfRVZFTlQgPSAnQ2hhbmdlJyxcbiAgICBOUyA9ICdtZnAnLFxuICAgIEVWRU5UX05TID0gJy4nICsgTlMsXG4gICAgUkVBRFlfQ0xBU1MgPSAnbWZwLXJlYWR5JyxcbiAgICBSRU1PVklOR19DTEFTUyA9ICdtZnAtcmVtb3ZpbmcnLFxuICAgIFBSRVZFTlRfQ0xPU0VfQ0xBU1MgPSAnbWZwLXByZXZlbnQtY2xvc2UnO1xuXG5cbi8qKlxuICogUHJpdmF0ZSB2YXJzIFxuICovXG4vKmpzaGludCAtVzA3OSAqL1xudmFyIG1mcCwgLy8gQXMgd2UgaGF2ZSBvbmx5IG9uZSBpbnN0YW5jZSBvZiBNYWduaWZpY1BvcHVwIG9iamVjdCwgd2UgZGVmaW5lIGl0IGxvY2FsbHkgdG8gbm90IHRvIHVzZSAndGhpcydcbiAgICBNYWduaWZpY1BvcHVwID0gZnVuY3Rpb24oKXt9LFxuICAgIF9pc0pRID0gISEod2luZG93LmpRdWVyeSksXG4gICAgX3ByZXZTdGF0dXMsXG4gICAgX3dpbmRvdyA9ICQod2luZG93KSxcbiAgICBfZG9jdW1lbnQsXG4gICAgX3ByZXZDb250ZW50VHlwZSxcbiAgICBfd3JhcENsYXNzZXMsXG4gICAgX2N1cnJQb3B1cFR5cGU7XG5cblxuLyoqXG4gKiBQcml2YXRlIGZ1bmN0aW9uc1xuICovXG52YXIgX21mcE9uID0gZnVuY3Rpb24obmFtZSwgZikge1xuICAgICAgICBtZnAuZXYub24oTlMgKyBuYW1lICsgRVZFTlRfTlMsIGYpO1xuICAgIH0sXG4gICAgX2dldEVsID0gZnVuY3Rpb24oY2xhc3NOYW1lLCBhcHBlbmRUbywgaHRtbCwgcmF3KSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnbWZwLScrY2xhc3NOYW1lO1xuICAgICAgICBpZihodG1sKSB7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFyYXcpIHtcbiAgICAgICAgICAgIGVsID0gJChlbCk7XG4gICAgICAgICAgICBpZihhcHBlbmRUbykge1xuICAgICAgICAgICAgICAgIGVsLmFwcGVuZFRvKGFwcGVuZFRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGFwcGVuZFRvKSB7XG4gICAgICAgICAgICBhcHBlbmRUby5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH0sXG4gICAgX21mcFRyaWdnZXIgPSBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgIG1mcC5ldi50cmlnZ2VySGFuZGxlcihOUyArIGUsIGRhdGEpO1xuXG4gICAgICAgIGlmKG1mcC5zdC5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIGNvbnZlcnRzIFwibWZwRXZlbnROYW1lXCIgdG8gXCJldmVudE5hbWVcIiBjYWxsYmFjayBhbmQgdHJpZ2dlcnMgaXQgaWYgaXQncyBwcmVzZW50XG4gICAgICAgICAgICBlID0gZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGUuc2xpY2UoMSk7XG4gICAgICAgICAgICBpZihtZnAuc3QuY2FsbGJhY2tzW2VdKSB7XG4gICAgICAgICAgICAgICAgbWZwLnN0LmNhbGxiYWNrc1tlXS5hcHBseShtZnAsICQuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfZ2V0Q2xvc2VCdG4gPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIGlmKHR5cGUgIT09IF9jdXJyUG9wdXBUeXBlIHx8ICFtZnAuY3VyclRlbXBsYXRlLmNsb3NlQnRuKSB7XG4gICAgICAgICAgICBtZnAuY3VyclRlbXBsYXRlLmNsb3NlQnRuID0gJCggbWZwLnN0LmNsb3NlTWFya3VwLnJlcGxhY2UoJyV0aXRsZSUnLCBtZnAuc3QudENsb3NlICkgKTtcbiAgICAgICAgICAgIF9jdXJyUG9wdXBUeXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bjtcbiAgICB9LFxuICAgIC8vIEluaXRpYWxpemUgTWFnbmlmaWMgUG9wdXAgb25seSB3aGVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG4gICAgX2NoZWNrSW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoISQubWFnbmlmaWNQb3B1cC5pbnN0YW5jZSkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMjAgKi9cbiAgICAgICAgICAgIG1mcCA9IG5ldyBNYWduaWZpY1BvcHVwKCk7XG4gICAgICAgICAgICBtZnAuaW5pdCgpO1xuICAgICAgICAgICAgJC5tYWduaWZpY1BvcHVwLmluc3RhbmNlID0gbWZwO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDU1MgdHJhbnNpdGlvbiBkZXRlY3Rpb24sIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzI2NDg5OS9kZXRlY3QtY3NzLXRyYW5zaXRpb25zLXVzaW5nLWphdmFzY3JpcHQtYW5kLXdpdGhvdXQtbW9kZXJuaXpyXG4gICAgc3VwcG9ydHNUcmFuc2l0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKS5zdHlsZSwgLy8gJ3MnIGZvciBzdHlsZS4gYmV0dGVyIHRvIGNyZWF0ZSBhbiBlbGVtZW50IGlmIGJvZHkgeWV0IHRvIGV4aXN0XG4gICAgICAgICAgICB2ID0gWydtcycsJ08nLCdNb3onLCdXZWJraXQnXTsgLy8gJ3YnIGZvciB2ZW5kb3JcblxuICAgICAgICBpZiggc1sndHJhbnNpdGlvbiddICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB3aGlsZSggdi5sZW5ndGggKSB7XG4gICAgICAgICAgICBpZiggdi5wb3AoKSArICdUcmFuc2l0aW9uJyBpbiBzICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG5cblxuLyoqXG4gKiBQdWJsaWMgZnVuY3Rpb25zXG4gKi9cbk1hZ25pZmljUG9wdXAucHJvdG90eXBlID0ge1xuXG4gICAgY29uc3RydWN0b3I6IE1hZ25pZmljUG9wdXAsXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBNYWduaWZpYyBQb3B1cCBwbHVnaW4uIFxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdHJpZ2dlcmVkIG9ubHkgb25jZSB3aGVuICQuZm4ubWFnbmlmaWNQb3B1cCBvciAkLm1hZ25pZmljUG9wdXAgaXMgZXhlY3V0ZWRcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFwcFZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICAgICAgbWZwLmlzTG93SUUgPSBtZnAuaXNJRTggPSBkb2N1bWVudC5hbGwgJiYgIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgICAgIG1mcC5pc0FuZHJvaWQgPSAoL2FuZHJvaWQvZ2kpLnRlc3QoYXBwVmVyc2lvbik7XG4gICAgICAgIG1mcC5pc0lPUyA9ICgvaXBob25lfGlwYWR8aXBvZC9naSkudGVzdChhcHBWZXJzaW9uKTtcbiAgICAgICAgbWZwLnN1cHBvcnRzVHJhbnNpdGlvbiA9IHN1cHBvcnRzVHJhbnNpdGlvbnMoKTtcblxuICAgICAgICAvLyBXZSBkaXNhYmxlIGZpeGVkIHBvc2l0aW9uZWQgbGlnaHRib3ggb24gZGV2aWNlcyB0aGF0IGRvbid0IGhhbmRsZSBpdCBuaWNlbHkuXG4gICAgICAgIC8vIElmIHlvdSBrbm93IGEgYmV0dGVyIHdheSBvZiBkZXRlY3RpbmcgdGhpcyAtIGxldCBtZSBrbm93LlxuICAgICAgICBtZnAucHJvYmFibHlNb2JpbGUgPSAobWZwLmlzQW5kcm9pZCB8fCBtZnAuaXNJT1MgfHwgLyhPcGVyYSBNaW5pKXxLaW5kbGV8d2ViT1N8QmxhY2tCZXJyeXwoT3BlcmEgTW9iaSl8KFdpbmRvd3MgUGhvbmUpfElFTW9iaWxlL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApO1xuICAgICAgICBfZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuICAgICAgICBtZnAucG9wdXBzQ2FjaGUgPSB7fTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgcG9wdXBcbiAgICAgKiBAcGFyYW0gIGRhdGEgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIG9wZW46IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICB2YXIgaTtcblxuICAgICAgICBpZihkYXRhLmlzT2JqID09PSBmYWxzZSkgeyBcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgalF1ZXJ5IGNvbGxlY3Rpb24gdG8gYXJyYXkgdG8gYXZvaWQgY29uZmxpY3RzIGxhdGVyXG4gICAgICAgICAgICBtZnAuaXRlbXMgPSBkYXRhLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgbWZwLmluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IGRhdGEuaXRlbXMsXG4gICAgICAgICAgICAgICAgaXRlbTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0ucGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmVsWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpdGVtID09PSBkYXRhLmVsWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1mcC5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1mcC5pdGVtcyA9ICQuaXNBcnJheShkYXRhLml0ZW1zKSA/IGRhdGEuaXRlbXMgOiBbZGF0YS5pdGVtc107XG4gICAgICAgICAgICBtZnAuaW5kZXggPSBkYXRhLmluZGV4IHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBwb3B1cCBpcyBhbHJlYWR5IG9wZW5lZCAtIHdlIGp1c3QgdXBkYXRlIHRoZSBjb250ZW50XG4gICAgICAgIGlmKG1mcC5pc09wZW4pIHtcbiAgICAgICAgICAgIG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBtZnAudHlwZXMgPSBbXTsgXG4gICAgICAgIF93cmFwQ2xhc3NlcyA9ICcnO1xuICAgICAgICBpZihkYXRhLm1haW5FbCAmJiBkYXRhLm1haW5FbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1mcC5ldiA9IGRhdGEubWFpbkVsLmVxKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWZwLmV2ID0gX2RvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGF0YS5rZXkpIHtcbiAgICAgICAgICAgIGlmKCFtZnAucG9wdXBzQ2FjaGVbZGF0YS5rZXldKSB7XG4gICAgICAgICAgICAgICAgbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWZwLmN1cnJUZW1wbGF0ZSA9IG1mcC5wb3B1cHNDYWNoZVtkYXRhLmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZnAuY3VyclRlbXBsYXRlID0ge307XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgbWZwLnN0ID0gJC5leHRlbmQodHJ1ZSwge30sICQubWFnbmlmaWNQb3B1cC5kZWZhdWx0cywgZGF0YSApOyBcbiAgICAgICAgbWZwLmZpeGVkQ29udGVudFBvcyA9IG1mcC5zdC5maXhlZENvbnRlbnRQb3MgPT09ICdhdXRvJyA/ICFtZnAucHJvYmFibHlNb2JpbGUgOiBtZnAuc3QuZml4ZWRDb250ZW50UG9zO1xuXG4gICAgICAgIGlmKG1mcC5zdC5tb2RhbCkge1xuICAgICAgICAgICAgbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIG1mcC5zdC5jbG9zZU9uQmdDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgbWZwLnN0LnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuICAgICAgICAgICAgbWZwLnN0LmVuYWJsZUVzY2FwZUtleSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vIEJ1aWxkaW5nIG1hcmt1cFxuICAgICAgICAvLyBtYWluIGNvbnRhaW5lcnMgYXJlIGNyZWF0ZWQgb25seSBvbmNlXG4gICAgICAgIGlmKCFtZnAuYmdPdmVybGF5KSB7XG5cbiAgICAgICAgICAgIC8vIERhcmsgb3ZlcmxheVxuICAgICAgICAgICAgbWZwLmJnT3ZlcmxheSA9IF9nZXRFbCgnYmcnKS5vbignY2xpY2snK0VWRU5UX05TLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtZnAuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZnAud3JhcCA9IF9nZXRFbCgnd3JhcCcpLmF0dHIoJ3RhYmluZGV4JywgLTEpLm9uKCdjbGljaycrRVZFTlRfTlMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZihtZnAuX2NoZWNrSWZDbG9zZShlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWZwLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1mcC5jb250YWluZXIgPSBfZ2V0RWwoJ2NvbnRhaW5lcicsIG1mcC53cmFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1mcC5jb250ZW50Q29udGFpbmVyID0gX2dldEVsKCdjb250ZW50Jyk7XG4gICAgICAgIGlmKG1mcC5zdC5wcmVsb2FkZXIpIHtcbiAgICAgICAgICAgIG1mcC5wcmVsb2FkZXIgPSBfZ2V0RWwoJ3ByZWxvYWRlcicsIG1mcC5jb250YWluZXIsIG1mcC5zdC50TG9hZGluZyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEluaXRpYWxpemluZyBtb2R1bGVzXG4gICAgICAgIHZhciBtb2R1bGVzID0gJC5tYWduaWZpY1BvcHVwLm1vZHVsZXM7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuID0gbW9kdWxlc1tpXTtcbiAgICAgICAgICAgIG4gPSBuLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbi5zbGljZSgxKTtcbiAgICAgICAgICAgIG1mcFsnaW5pdCcrbl0uY2FsbChtZnApO1xuICAgICAgICB9XG4gICAgICAgIF9tZnBUcmlnZ2VyKCdCZWZvcmVPcGVuJyk7XG5cblxuICAgICAgICBpZihtZnAuc3Quc2hvd0Nsb3NlQnRuKSB7XG4gICAgICAgICAgICAvLyBDbG9zZSBidXR0b25cbiAgICAgICAgICAgIGlmKCFtZnAuc3QuY2xvc2VCdG5JbnNpZGUpIHtcbiAgICAgICAgICAgICAgICBtZnAud3JhcC5hcHBlbmQoIF9nZXRDbG9zZUJ0bigpICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9tZnBPbihNQVJLVVBfUEFSU0VfRVZFTlQsIGZ1bmN0aW9uKGUsIHRlbXBsYXRlLCB2YWx1ZXMsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLmNsb3NlX3JlcGxhY2VXaXRoID0gX2dldENsb3NlQnRuKGl0ZW0udHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3dyYXBDbGFzc2VzICs9ICcgbWZwLWNsb3NlLWJ0bi1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZnAuc3QuYWxpZ25Ub3ApIHtcbiAgICAgICAgICAgIF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hbGlnbi10b3AnO1xuICAgICAgICB9XG5cbiAgICBcblxuICAgICAgICBpZihtZnAuZml4ZWRDb250ZW50UG9zKSB7XG4gICAgICAgICAgICBtZnAud3JhcC5jc3Moe1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBtZnAuc3Qub3ZlcmZsb3dZLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dZOiBtZnAuc3Qub3ZlcmZsb3dZXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1mcC53cmFwLmNzcyh7IFxuICAgICAgICAgICAgICAgIHRvcDogX3dpbmRvdy5zY3JvbGxUb3AoKSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG1mcC5zdC5maXhlZEJnUG9zID09PSBmYWxzZSB8fCAobWZwLnN0LmZpeGVkQmdQb3MgPT09ICdhdXRvJyAmJiAhbWZwLmZpeGVkQ29udGVudFBvcykgKSB7XG4gICAgICAgICAgICBtZnAuYmdPdmVybGF5LmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBfZG9jdW1lbnQuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgXG5cbiAgICAgICAgaWYobWZwLnN0LmVuYWJsZUVzY2FwZUtleSkge1xuICAgICAgICAgICAgLy8gQ2xvc2Ugb24gRVNDIGtleVxuICAgICAgICAgICAgX2RvY3VtZW50Lm9uKCdrZXl1cCcgKyBFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgbWZwLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfd2luZG93Lm9uKCdyZXNpemUnICsgRVZFTlRfTlMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWZwLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpZighbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2spIHtcbiAgICAgICAgICAgIF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hdXRvLWN1cnNvcic7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKF93cmFwQ2xhc3NlcylcbiAgICAgICAgICAgIG1mcC53cmFwLmFkZENsYXNzKF93cmFwQ2xhc3Nlcyk7XG5cblxuICAgICAgICAvLyB0aGlzIHRyaWdnZXJzIHJlY2FsY3VsYXRpb24gb2YgbGF5b3V0LCBzbyB3ZSBnZXQgaXQgb25jZSB0byBub3QgdG8gdHJpZ2dlciB0d2ljZVxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gbWZwLndIID0gX3dpbmRvdy5oZWlnaHQoKTtcblxuICAgICAgICBcbiAgICAgICAgdmFyIHdpbmRvd1N0eWxlcyA9IHt9O1xuXG4gICAgICAgIGlmKCBtZnAuZml4ZWRDb250ZW50UG9zICkge1xuICAgICAgICAgICAgaWYobWZwLl9oYXNTY3JvbGxCYXIod2luZG93SGVpZ2h0KSl7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBtZnAuX2dldFNjcm9sbGJhclNpemUoKTtcbiAgICAgICAgICAgICAgICBpZihzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1N0eWxlcy5tYXJnaW5SaWdodCA9IHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYobWZwLmZpeGVkQ29udGVudFBvcykge1xuICAgICAgICAgICAgaWYoIW1mcC5pc0lFNykge1xuICAgICAgICAgICAgICAgIHdpbmRvd1N0eWxlcy5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZTcgZG91YmxlLXNjcm9sbCBidWdcbiAgICAgICAgICAgICAgICAkKCdib2R5LCBodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGNsYXNzZXNUb2FkZCA9IG1mcC5zdC5tYWluQ2xhc3M7XG4gICAgICAgIGlmKG1mcC5pc0lFNykge1xuICAgICAgICAgICAgY2xhc3Nlc1RvYWRkICs9ICcgbWZwLWllNyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2xhc3Nlc1RvYWRkKSB7XG4gICAgICAgICAgICBtZnAuX2FkZENsYXNzVG9NRlAoIGNsYXNzZXNUb2FkZCApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvbnRlbnRcbiAgICAgICAgbWZwLnVwZGF0ZUl0ZW1IVE1MKCk7XG5cbiAgICAgICAgX21mcFRyaWdnZXIoJ0J1aWxkQ29udHJvbHMnKTtcblxuICAgICAgICAvLyByZW1vdmUgc2Nyb2xsYmFyLCBhZGQgbWFyZ2luIGUudC5jXG4gICAgICAgICQoJ2h0bWwnKS5jc3Mod2luZG93U3R5bGVzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGFkZCBldmVyeXRoaW5nIHRvIERPTVxuICAgICAgICBtZnAuYmdPdmVybGF5LmFkZChtZnAud3JhcCkucHJlcGVuZFRvKCBtZnAuc3QucHJlcGVuZFRvIHx8ICQoZG9jdW1lbnQuYm9keSkgKTtcblxuICAgICAgICAvLyBTYXZlIGxhc3QgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIG1mcC5fbGFzdEZvY3VzZWRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIFxuICAgICAgICAvLyBXYWl0IGZvciBuZXh0IGN5Y2xlIHRvIGFsbG93IENTUyB0cmFuc2l0aW9uXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG1mcC5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgbWZwLl9hZGRDbGFzc1RvTUZQKFJFQURZX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBtZnAuX3NldEZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnRlbnQgaXMgbm90IGRlZmluZWQgKG5vdCBsb2FkZWQgZS50LmMpIHdlIGFkZCBjbGFzcyBvbmx5IGZvciBCR1xuICAgICAgICAgICAgICAgIG1mcC5iZ092ZXJsYXkuYWRkQ2xhc3MoUkVBRFlfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUcmFwIHRoZSBmb2N1cyBpbiBwb3B1cFxuICAgICAgICAgICAgX2RvY3VtZW50Lm9uKCdmb2N1c2luJyArIEVWRU5UX05TLCBtZnAuX29uRm9jdXNJbik7XG5cbiAgICAgICAgfSwgMTYpO1xuXG4gICAgICAgIG1mcC5pc09wZW4gPSB0cnVlO1xuICAgICAgICBtZnAudXBkYXRlU2l6ZSh3aW5kb3dIZWlnaHQpO1xuICAgICAgICBfbWZwVHJpZ2dlcihPUEVOX0VWRU5UKTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBwb3B1cFxuICAgICAqL1xuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIW1mcC5pc09wZW4pIHJldHVybjtcbiAgICAgICAgX21mcFRyaWdnZXIoQkVGT1JFX0NMT1NFX0VWRU5UKTtcblxuICAgICAgICBtZnAuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIC8vIGZvciBDU1MzIGFuaW1hdGlvblxuICAgICAgICBpZihtZnAuc3QucmVtb3ZhbERlbGF5ICYmICFtZnAuaXNMb3dJRSAmJiBtZnAuc3VwcG9ydHNUcmFuc2l0aW9uICkgIHtcbiAgICAgICAgICAgIG1mcC5fYWRkQ2xhc3NUb01GUChSRU1PVklOR19DTEFTUyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1mcC5fY2xvc2UoKTtcbiAgICAgICAgICAgIH0sIG1mcC5zdC5yZW1vdmFsRGVsYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWZwLl9jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmb3IgY2xvc2UoKSBmdW5jdGlvblxuICAgICAqL1xuICAgIF9jbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIF9tZnBUcmlnZ2VyKENMT1NFX0VWRU5UKTtcblxuICAgICAgICB2YXIgY2xhc3Nlc1RvUmVtb3ZlID0gUkVNT1ZJTkdfQ0xBU1MgKyAnICcgKyBSRUFEWV9DTEFTUyArICcgJztcblxuICAgICAgICBtZnAuYmdPdmVybGF5LmRldGFjaCgpO1xuICAgICAgICBtZnAud3JhcC5kZXRhY2goKTtcbiAgICAgICAgbWZwLmNvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgICAgIGlmKG1mcC5zdC5tYWluQ2xhc3MpIHtcbiAgICAgICAgICAgIGNsYXNzZXNUb1JlbW92ZSArPSBtZnAuc3QubWFpbkNsYXNzICsgJyAnO1xuICAgICAgICB9XG5cbiAgICAgICAgbWZwLl9yZW1vdmVDbGFzc0Zyb21NRlAoY2xhc3Nlc1RvUmVtb3ZlKTtcblxuICAgICAgICBpZihtZnAuZml4ZWRDb250ZW50UG9zKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93U3R5bGVzID0ge21hcmdpblJpZ2h0OiAnJ307XG4gICAgICAgICAgICBpZihtZnAuaXNJRTcpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5LCBodG1sJykuY3NzKCdvdmVyZmxvdycsICcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93U3R5bGVzLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCdodG1sJykuY3NzKHdpbmRvd1N0eWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIF9kb2N1bWVudC5vZmYoJ2tleXVwJyArIEVWRU5UX05TICsgJyBmb2N1c2luJyArIEVWRU5UX05TKTtcbiAgICAgICAgbWZwLmV2Lm9mZihFVkVOVF9OUyk7XG5cbiAgICAgICAgLy8gY2xlYW4gdXAgRE9NIGVsZW1lbnRzIHRoYXQgYXJlbid0IHJlbW92ZWRcbiAgICAgICAgbWZwLndyYXAuYXR0cignY2xhc3MnLCAnbWZwLXdyYXAnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICBtZnAuYmdPdmVybGF5LmF0dHIoJ2NsYXNzJywgJ21mcC1iZycpO1xuICAgICAgICBtZnAuY29udGFpbmVyLmF0dHIoJ2NsYXNzJywgJ21mcC1jb250YWluZXInKTtcblxuICAgICAgICAvLyByZW1vdmUgY2xvc2UgYnV0dG9uIGZyb20gdGFyZ2V0IGVsZW1lbnRcbiAgICAgICAgaWYobWZwLnN0LnNob3dDbG9zZUJ0biAmJlxuICAgICAgICAoIW1mcC5zdC5jbG9zZUJ0bkluc2lkZSB8fCBtZnAuY3VyclRlbXBsYXRlW21mcC5jdXJySXRlbS50eXBlXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIGlmKG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4pXG4gICAgICAgICAgICAgICAgbWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYobWZwLnN0LmF1dG9Gb2N1c0xhc3QgJiYgbWZwLl9sYXN0Rm9jdXNlZEVsKSB7XG4gICAgICAgICAgICAkKG1mcC5fbGFzdEZvY3VzZWRFbCkuZm9jdXMoKTsgLy8gcHV0IHRhYiBmb2N1cyBiYWNrXG4gICAgICAgIH1cbiAgICAgICAgbWZwLmN1cnJJdGVtID0gbnVsbDsgICAgXG4gICAgICAgIG1mcC5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgbWZwLmN1cnJUZW1wbGF0ZSA9IG51bGw7XG4gICAgICAgIG1mcC5wcmV2SGVpZ2h0ID0gMDtcblxuICAgICAgICBfbWZwVHJpZ2dlcihBRlRFUl9DTE9TRV9FVkVOVCk7XG4gICAgfSxcbiAgICBcbiAgICB1cGRhdGVTaXplOiBmdW5jdGlvbih3aW5IZWlnaHQpIHtcblxuICAgICAgICBpZihtZnAuaXNJT1MpIHtcbiAgICAgICAgICAgIC8vIGZpeGVzIGlPUyBuYXYgYmFycyBodHRwczovL2dpdGh1Yi5jb20vZGltc2VtZW5vdi9NYWduaWZpYy1Qb3B1cC9pc3N1ZXMvMlxuICAgICAgICAgICAgdmFyIHpvb21MZXZlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIHpvb21MZXZlbDtcbiAgICAgICAgICAgIG1mcC53cmFwLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgIG1mcC53SCA9IGhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1mcC53SCA9IHdpbkhlaWdodCB8fCBfd2luZG93LmhlaWdodCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpeGVzICM4NDogcG9wdXAgaW5jb3JyZWN0bHkgcG9zaXRpb25lZCB3aXRoIHBvc2l0aW9uOnJlbGF0aXZlIG9uIGJvZHlcbiAgICAgICAgaWYoIW1mcC5maXhlZENvbnRlbnRQb3MpIHtcbiAgICAgICAgICAgIG1mcC53cmFwLmNzcygnaGVpZ2h0JywgbWZwLndIKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9tZnBUcmlnZ2VyKCdSZXNpemUnKTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgY29udGVudCBvZiBwb3B1cCBiYXNlZCBvbiBjdXJyZW50IGluZGV4XG4gICAgICovXG4gICAgdXBkYXRlSXRlbUhUTUw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaXRlbSA9IG1mcC5pdGVtc1ttZnAuaW5kZXhdO1xuXG4gICAgICAgIC8vIERldGFjaCBhbmQgcGVyZm9ybSBtb2RpZmljYXRpb25zXG4gICAgICAgIG1mcC5jb250ZW50Q29udGFpbmVyLmRldGFjaCgpO1xuXG4gICAgICAgIGlmKG1mcC5jb250ZW50KVxuICAgICAgICAgICAgbWZwLmNvbnRlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYoIWl0ZW0ucGFyc2VkKSB7XG4gICAgICAgICAgICBpdGVtID0gbWZwLnBhcnNlRWwoIG1mcC5pbmRleCApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHR5cGUgPSBpdGVtLnR5cGU7XG5cbiAgICAgICAgX21mcFRyaWdnZXIoJ0JlZm9yZUNoYW5nZScsIFttZnAuY3Vyckl0ZW0gPyBtZnAuY3Vyckl0ZW0udHlwZSA6ICcnLCB0eXBlXSk7XG4gICAgICAgIC8vIEJlZm9yZUNoYW5nZSBldmVudCB3b3JrcyBsaWtlIHNvOlxuICAgICAgICAvLyBfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7IH0pO1xuXG4gICAgICAgIG1mcC5jdXJySXRlbSA9IGl0ZW07XG5cbiAgICAgICAgaWYoIW1mcC5jdXJyVGVtcGxhdGVbdHlwZV0pIHtcbiAgICAgICAgICAgIHZhciBtYXJrdXAgPSBtZnAuc3RbdHlwZV0gPyBtZnAuc3RbdHlwZV0ubWFya3VwIDogZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGFsbG93cyB0byBtb2RpZnkgbWFya3VwXG4gICAgICAgICAgICBfbWZwVHJpZ2dlcignRmlyc3RNYXJrdXBQYXJzZScsIG1hcmt1cCk7XG5cbiAgICAgICAgICAgIGlmKG1hcmt1cCkge1xuICAgICAgICAgICAgICAgIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPSAkKG1hcmt1cCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIG1hcmt1cCBmb3VuZCB3ZSBqdXN0IGRlZmluZSB0aGF0IHRlbXBsYXRlIGlzIHBhcnNlZFxuICAgICAgICAgICAgICAgIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoX3ByZXZDb250ZW50VHlwZSAmJiBfcHJldkNvbnRlbnRUeXBlICE9PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIG1mcC5jb250YWluZXIucmVtb3ZlQ2xhc3MoJ21mcC0nK19wcmV2Q29udGVudFR5cGUrJy1ob2xkZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdDb250ZW50ID0gbWZwWydnZXQnICsgdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSldKGl0ZW0sIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0pO1xuICAgICAgICBtZnAuYXBwZW5kQ29udGVudChuZXdDb250ZW50LCB0eXBlKTtcblxuICAgICAgICBpdGVtLnByZWxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgX21mcFRyaWdnZXIoQ0hBTkdFX0VWRU5ULCBpdGVtKTtcbiAgICAgICAgX3ByZXZDb250ZW50VHlwZSA9IGl0ZW0udHlwZTtcblxuICAgICAgICAvLyBBcHBlbmQgY29udGFpbmVyIGJhY2sgYWZ0ZXIgaXRzIGNvbnRlbnQgY2hhbmdlZFxuICAgICAgICBtZnAuY29udGFpbmVyLnByZXBlbmQobWZwLmNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgICAgIF9tZnBUcmlnZ2VyKCdBZnRlckNoYW5nZScpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldCBIVE1MIGNvbnRlbnQgb2YgcG9wdXBcbiAgICAgKi9cbiAgICBhcHBlbmRDb250ZW50OiBmdW5jdGlvbihuZXdDb250ZW50LCB0eXBlKSB7XG4gICAgICAgIG1mcC5jb250ZW50ID0gbmV3Q29udGVudDtcblxuICAgICAgICBpZihuZXdDb250ZW50KSB7XG4gICAgICAgICAgICBpZihtZnAuc3Quc2hvd0Nsb3NlQnRuICYmIG1mcC5zdC5jbG9zZUJ0bkluc2lkZSAmJlxuICAgICAgICAgICAgICAgIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBtYXJrdXAsIHdlIGp1c3QgYXBwZW5kIGNsb3NlIGJ1dHRvbiBlbGVtZW50IGluc2lkZVxuICAgICAgICAgICAgICAgIGlmKCFtZnAuY29udGVudC5maW5kKCcubWZwLWNsb3NlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1mcC5jb250ZW50LmFwcGVuZChfZ2V0Q2xvc2VCdG4oKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZnAuY29udGVudCA9IG5ld0NvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZnAuY29udGVudCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgX21mcFRyaWdnZXIoQkVGT1JFX0FQUEVORF9FVkVOVCk7XG4gICAgICAgIG1mcC5jb250YWluZXIuYWRkQ2xhc3MoJ21mcC0nK3R5cGUrJy1ob2xkZXInKTtcblxuICAgICAgICBtZnAuY29udGVudENvbnRhaW5lci5hcHBlbmQobWZwLmNvbnRlbnQpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgTWFnbmlmaWMgUG9wdXAgZGF0YSBvYmplY3QgYmFzZWQgb24gZ2l2ZW4gZGF0YVxuICAgICAqIEBwYXJhbSAge2ludH0gaW5kZXggSW5kZXggb2YgaXRlbSB0byBwYXJzZVxuICAgICAqL1xuICAgIHBhcnNlRWw6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHZhciBpdGVtID0gbWZwLml0ZW1zW2luZGV4XSxcbiAgICAgICAgICAgIHR5cGU7XG5cbiAgICAgICAgaWYoaXRlbS50YWdOYW1lKSB7XG4gICAgICAgICAgICBpdGVtID0geyBlbDogJChpdGVtKSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgICAgICAgIGl0ZW0gPSB7IGRhdGE6IGl0ZW0sIHNyYzogaXRlbS5zcmMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGl0ZW0uZWwpIHtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IG1mcC50eXBlcztcblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yICdtZnAtVFlQRScgY2xhc3NcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKCBpdGVtLmVsLmhhc0NsYXNzKCdtZnAtJyt0eXBlc1tpXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignZGF0YS1tZnAtc3JjJyk7XG4gICAgICAgICAgICBpZighaXRlbS5zcmMpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS50eXBlID0gdHlwZSB8fCBtZnAuc3QudHlwZSB8fCAnaW5saW5lJztcbiAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4O1xuICAgICAgICBpdGVtLnBhcnNlZCA9IHRydWU7XG4gICAgICAgIG1mcC5pdGVtc1tpbmRleF0gPSBpdGVtO1xuICAgICAgICBfbWZwVHJpZ2dlcignRWxlbWVudFBhcnNlJywgaXRlbSk7XG5cbiAgICAgICAgcmV0dXJuIG1mcC5pdGVtc1tpbmRleF07XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgc2luZ2xlIHBvcHVwIG9yIGEgZ3JvdXAgb2YgcG9wdXBzXG4gICAgICovXG4gICAgYWRkR3JvdXA6IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBlSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUubWZwRWwgPSB0aGlzO1xuICAgICAgICAgICAgbWZwLl9vcGVuQ2xpY2soZSwgZWwsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZU5hbWUgPSAnY2xpY2subWFnbmlmaWNQb3B1cCc7XG4gICAgICAgIG9wdGlvbnMubWFpbkVsID0gZWw7XG5cbiAgICAgICAgaWYob3B0aW9ucy5pdGVtcykge1xuICAgICAgICAgICAgb3B0aW9ucy5pc09iaiA9IHRydWU7XG4gICAgICAgICAgICBlbC5vZmYoZU5hbWUpLm9uKGVOYW1lLCBlSGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLmlzT2JqID0gZmFsc2U7XG4gICAgICAgICAgICBpZihvcHRpb25zLmRlbGVnYXRlKSB7XG4gICAgICAgICAgICAgICAgZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgb3B0aW9ucy5kZWxlZ2F0ZSAsIGVIYW5kbGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pdGVtcyA9IGVsO1xuICAgICAgICAgICAgICAgIGVsLm9mZihlTmFtZSkub24oZU5hbWUsIGVIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX29wZW5DbGljazogZnVuY3Rpb24oZSwgZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1pZENsaWNrID0gb3B0aW9ucy5taWRDbGljayAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5taWRDbGljayA6ICQubWFnbmlmaWNQb3B1cC5kZWZhdWx0cy5taWRDbGljaztcblxuXG4gICAgICAgIGlmKCFtaWRDbGljayAmJiAoIGUud2hpY2ggPT09IDIgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLnNoaWZ0S2V5ICkgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGlzYWJsZU9uID0gb3B0aW9ucy5kaXNhYmxlT24gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZGlzYWJsZU9uIDogJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLmRpc2FibGVPbjtcblxuICAgICAgICBpZihkaXNhYmxlT24pIHtcbiAgICAgICAgICAgIGlmKCQuaXNGdW5jdGlvbihkaXNhYmxlT24pKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkaXNhYmxlT24uY2FsbChtZnApICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBlbHNlIGl0J3MgbnVtYmVyXG4gICAgICAgICAgICAgICAgaWYoIF93aW5kb3cud2lkdGgoKSA8IGRpc2FibGVPbiApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZS50eXBlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBwcmV2ZW50IHBvcHVwIGZyb20gY2xvc2luZyBpZiBlbGVtZW50IGlzIGluc2lkZSBhbmQgcG9wdXAgaXMgYWxyZWFkeSBvcGVuZWRcbiAgICAgICAgICAgIGlmKG1mcC5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5lbCA9ICQoZS5tZnBFbCk7XG4gICAgICAgIGlmKG9wdGlvbnMuZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaXRlbXMgPSBlbC5maW5kKG9wdGlvbnMuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIG1mcC5vcGVuKG9wdGlvbnMpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGV4dCBvbiBwcmVsb2FkZXJcbiAgICAgKi9cbiAgICB1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKHN0YXR1cywgdGV4dCkge1xuXG4gICAgICAgIGlmKG1mcC5wcmVsb2FkZXIpIHtcbiAgICAgICAgICAgIGlmKF9wcmV2U3RhdHVzICE9PSBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBtZnAuY29udGFpbmVyLnJlbW92ZUNsYXNzKCdtZnAtcy0nK19wcmV2U3RhdHVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIXRleHQgJiYgc3RhdHVzID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gbWZwLnN0LnRMb2FkaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gYWxsb3dzIHRvIG1vZGlmeSBzdGF0dXNcbiAgICAgICAgICAgIF9tZnBUcmlnZ2VyKCdVcGRhdGVTdGF0dXMnLCBkYXRhKTtcblxuICAgICAgICAgICAgc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgICAgICB0ZXh0ID0gZGF0YS50ZXh0O1xuXG4gICAgICAgICAgICBtZnAucHJlbG9hZGVyLmh0bWwodGV4dCk7XG5cbiAgICAgICAgICAgIG1mcC5wcmVsb2FkZXIuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1mcC5jb250YWluZXIuYWRkQ2xhc3MoJ21mcC1zLScrc3RhdHVzKTtcbiAgICAgICAgICAgIF9wcmV2U3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgLypcbiAgICAgICAgXCJQcml2YXRlXCIgaGVscGVycyB0aGF0IGFyZW4ndCBwcml2YXRlIGF0IGFsbFxuICAgICAqL1xuICAgIC8vIENoZWNrIHRvIGNsb3NlIHBvcHVwIG9yIG5vdFxuICAgIC8vIFwidGFyZ2V0XCIgaXMgYW4gZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkXG4gICAgX2NoZWNrSWZDbG9zZTogZnVuY3Rpb24odGFyZ2V0KSB7XG5cbiAgICAgICAgaWYoJCh0YXJnZXQpLmhhc0NsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2xvc2VPbkNvbnRlbnQgPSBtZnAuc3QuY2xvc2VPbkNvbnRlbnRDbGljaztcbiAgICAgICAgdmFyIGNsb3NlT25CZyA9IG1mcC5zdC5jbG9zZU9uQmdDbGljaztcblxuICAgICAgICBpZihjbG9zZU9uQ29udGVudCAmJiBjbG9zZU9uQmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBXZSBjbG9zZSB0aGUgcG9wdXAgaWYgY2xpY2sgaXMgb24gY2xvc2UgYnV0dG9uIG9yIG9uIHByZWxvYWRlci4gT3IgaWYgdGhlcmUgaXMgbm8gY29udGVudC5cbiAgICAgICAgICAgIGlmKCFtZnAuY29udGVudCB8fCAkKHRhcmdldCkuaGFzQ2xhc3MoJ21mcC1jbG9zZScpIHx8IChtZnAucHJlbG9hZGVyICYmIHRhcmdldCA9PT0gbWZwLnByZWxvYWRlclswXSkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGNsaWNrIGlzIG91dHNpZGUgdGhlIGNvbnRlbnRcbiAgICAgICAgICAgIGlmKCAgKHRhcmdldCAhPT0gbWZwLmNvbnRlbnRbMF0gJiYgISQuY29udGFpbnMobWZwLmNvbnRlbnRbMF0sIHRhcmdldCkpICApIHtcbiAgICAgICAgICAgICAgICBpZihjbG9zZU9uQmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGFzdCBjaGVjaywgaWYgdGhlIGNsaWNrZWQgZWxlbWVudCBpcyBpbiBET00sIChpbiBjYXNlIGl0J3MgcmVtb3ZlZCBvbmNsaWNrKVxuICAgICAgICAgICAgICAgICAgICBpZiggJC5jb250YWlucyhkb2N1bWVudCwgdGFyZ2V0KSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKGNsb3NlT25Db250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBfYWRkQ2xhc3NUb01GUDogZnVuY3Rpb24oY05hbWUpIHtcbiAgICAgICAgbWZwLmJnT3ZlcmxheS5hZGRDbGFzcyhjTmFtZSk7XG4gICAgICAgIG1mcC53cmFwLmFkZENsYXNzKGNOYW1lKTtcbiAgICB9LFxuICAgIF9yZW1vdmVDbGFzc0Zyb21NRlA6IGZ1bmN0aW9uKGNOYW1lKSB7XG4gICAgICAgIHRoaXMuYmdPdmVybGF5LnJlbW92ZUNsYXNzKGNOYW1lKTtcbiAgICAgICAgbWZwLndyYXAucmVtb3ZlQ2xhc3MoY05hbWUpO1xuICAgIH0sXG4gICAgX2hhc1Njcm9sbEJhcjogZnVuY3Rpb24od2luSGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiAoICAobWZwLmlzSUU3ID8gX2RvY3VtZW50LmhlaWdodCgpIDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpID4gKHdpbkhlaWdodCB8fCBfd2luZG93LmhlaWdodCgpKSApO1xuICAgIH0sXG4gICAgX3NldEZvY3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgKG1mcC5zdC5mb2N1cyA/IG1mcC5jb250ZW50LmZpbmQobWZwLnN0LmZvY3VzKS5lcSgwKSA6IG1mcC53cmFwKS5mb2N1cygpO1xuICAgIH0sXG4gICAgX29uRm9jdXNJbjogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggZS50YXJnZXQgIT09IG1mcC53cmFwWzBdICYmICEkLmNvbnRhaW5zKG1mcC53cmFwWzBdLCBlLnRhcmdldCkgKSB7XG4gICAgICAgICAgICBtZnAuX3NldEZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9wYXJzZU1hcmt1cDogZnVuY3Rpb24odGVtcGxhdGUsIHZhbHVlcywgaXRlbSkge1xuICAgICAgICB2YXIgYXJyO1xuICAgICAgICBpZihpdGVtLmRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9ICQuZXh0ZW5kKGl0ZW0uZGF0YSwgdmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICBfbWZwVHJpZ2dlcihNQVJLVVBfUEFSU0VfRVZFTlQsIFt0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtXSApO1xuXG4gICAgICAgICQuZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnIgPSBrZXkuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIGlmKGFyci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gdGVtcGxhdGUuZmluZChFVkVOVF9OUyArICctJythcnJbMF0pO1xuXG4gICAgICAgICAgICAgICAgaWYoZWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IGFyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYXR0ciA9PT0gJ3JlcGxhY2VXaXRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxbMF0gIT09IHZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwucmVwbGFjZVdpdGgodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYXR0ciA9PT0gJ2ltZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsLmlzKCdpbWcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoJ3NyYycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwucmVwbGFjZVdpdGgoICQoJzxpbWc+JykuYXR0cignc3JjJywgdmFsdWUpLmF0dHIoJ2NsYXNzJywgZWwuYXR0cignY2xhc3MnKSkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoYXJyWzFdLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuZmluZChFVkVOVF9OUyArICctJytrZXkpLmh0bWwodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2dldFNjcm9sbGJhclNpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyB0aHggRGF2aWRcbiAgICAgICAgaWYobWZwLnNjcm9sbGJhclNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzY3JvbGxEaXYuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogOTlweDsgaGVpZ2h0OiA5OXB4OyBvdmVyZmxvdzogc2Nyb2xsOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogLTk5OTlweDsnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgICAgICAgbWZwLnNjcm9sbGJhclNpemUgPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1mcC5zY3JvbGxiYXJTaXplO1xuICAgIH1cblxufTsgLyogTWFnbmlmaWNQb3B1cCBjb3JlIHByb3RvdHlwZSBlbmQgKi9cblxuXG5cblxuLyoqXG4gKiBQdWJsaWMgc3RhdGljIGZ1bmN0aW9uc1xuICovXG4kLm1hZ25pZmljUG9wdXAgPSB7XG4gICAgaW5zdGFuY2U6IG51bGwsXG4gICAgcHJvdG86IE1hZ25pZmljUG9wdXAucHJvdG90eXBlLFxuICAgIG1vZHVsZXM6IFtdLFxuXG4gICAgb3BlbjogZnVuY3Rpb24ob3B0aW9ucywgaW5kZXgpIHtcbiAgICAgICAgX2NoZWNrSW5zdGFuY2UoKTtcblxuICAgICAgICBpZighb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuaXNPYmogPSB0cnVlO1xuICAgICAgICBvcHRpb25zLmluZGV4ID0gaW5kZXggfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2Uub3BlbihvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJC5tYWduaWZpY1BvcHVwLmluc3RhbmNlICYmICQubWFnbmlmaWNQb3B1cC5pbnN0YW5jZS5jbG9zZSgpO1xuICAgIH0sXG5cbiAgICByZWdpc3Rlck1vZHVsZTogZnVuY3Rpb24obmFtZSwgbW9kdWxlKSB7XG4gICAgICAgIGlmKG1vZHVsZS5vcHRpb25zKSB7XG4gICAgICAgICAgICAkLm1hZ25pZmljUG9wdXAuZGVmYXVsdHNbbmFtZV0gPSBtb2R1bGUub3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICAkLmV4dGVuZCh0aGlzLnByb3RvLCBtb2R1bGUucHJvdG8pO1xuICAgICAgICB0aGlzLm1vZHVsZXMucHVzaChuYW1lKTtcbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcblxuICAgICAgICAvLyBJbmZvIGFib3V0IG9wdGlvbnMgaXMgaW4gZG9jczpcbiAgICAgICAgLy8gaHR0cDovL2RpbXNlbWVub3YuY29tL3BsdWdpbnMvbWFnbmlmaWMtcG9wdXAvZG9jdW1lbnRhdGlvbi5odG1sI29wdGlvbnNcblxuICAgICAgICBkaXNhYmxlT246IDAsXG5cbiAgICAgICAga2V5OiBudWxsLFxuXG4gICAgICAgIG1pZENsaWNrOiBmYWxzZSxcblxuICAgICAgICBtYWluQ2xhc3M6ICcnLFxuXG4gICAgICAgIHByZWxvYWRlcjogdHJ1ZSxcblxuICAgICAgICBmb2N1czogJycsIC8vIENTUyBzZWxlY3RvciBvZiBpbnB1dCB0byBmb2N1cyBhZnRlciBwb3B1cCBpcyBvcGVuZWRcblxuICAgICAgICBjbG9zZU9uQ29udGVudENsaWNrOiBmYWxzZSxcblxuICAgICAgICBjbG9zZU9uQmdDbGljazogdHJ1ZSxcblxuICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcblxuICAgICAgICBzaG93Q2xvc2VCdG46IHRydWUsXG5cbiAgICAgICAgZW5hYmxlRXNjYXBlS2V5OiB0cnVlLFxuXG4gICAgICAgIG1vZGFsOiBmYWxzZSxcblxuICAgICAgICBhbGlnblRvcDogZmFsc2UsXG5cbiAgICAgICAgcmVtb3ZhbERlbGF5OiAwLFxuXG4gICAgICAgIHByZXBlbmRUbzogbnVsbCxcblxuICAgICAgICBmaXhlZENvbnRlbnRQb3M6ICdhdXRvJyxcblxuICAgICAgICBmaXhlZEJnUG9zOiAnYXV0bycsXG5cbiAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG5cbiAgICAgICAgY2xvc2VNYXJrdXA6ICc8YnV0dG9uIHRpdGxlPVwiJXRpdGxlJVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1mcC1jbG9zZVwiPiYjMjE1OzwvYnV0dG9uPicsXG5cbiAgICAgICAgdENsb3NlOiAnQ2xvc2UgKEVzYyknLFxuXG4gICAgICAgIHRMb2FkaW5nOiAnTG9hZGluZy4uLicsXG5cbiAgICAgICAgYXV0b0ZvY3VzTGFzdDogdHJ1ZVxuXG4gICAgfVxufTtcblxuXG5cbiQuZm4ubWFnbmlmaWNQb3B1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBfY2hlY2tJbnN0YW5jZSgpO1xuXG4gICAgdmFyIGpxRWwgPSAkKHRoaXMpO1xuXG4gICAgLy8gV2UgY2FsbCBzb21lIEFQSSBtZXRob2Qgb2YgZmlyc3QgcGFyYW0gaXMgYSBzdHJpbmdcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgKSB7XG5cbiAgICAgICAgaWYob3B0aW9ucyA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB2YXIgaXRlbXMsXG4gICAgICAgICAgICAgICAgaXRlbU9wdHMgPSBfaXNKUSA/IGpxRWwuZGF0YSgnbWFnbmlmaWNQb3B1cCcpIDoganFFbFswXS5tYWduaWZpY1BvcHVwLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gcGFyc2VJbnQoYXJndW1lbnRzWzFdLCAxMCkgfHwgMDtcblxuICAgICAgICAgICAgaWYoaXRlbU9wdHMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcyA9IGl0ZW1PcHRzLml0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBqcUVsO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW1PcHRzLmRlbGVnYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zID0gaXRlbXMuZmluZChpdGVtT3B0cy5kZWxlZ2F0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW1zID0gaXRlbXMuZXEoIGluZGV4ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZnAuX29wZW5DbGljayh7bWZwRWw6aXRlbXN9LCBqcUVsLCBpdGVtT3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihtZnAuaXNPcGVuKVxuICAgICAgICAgICAgICAgIG1mcFtvcHRpb25zXS5hcHBseShtZnAsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjbG9uZSBvcHRpb25zIG9ialxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIEFzIFplcHRvIGRvZXNuJ3Qgc3VwcG9ydCAuZGF0YSgpIG1ldGhvZCBmb3Igb2JqZWN0c1xuICAgICAgICAgKiBhbmQgaXQgd29ya3Mgb25seSBpbiBub3JtYWwgYnJvd3NlcnNcbiAgICAgICAgICogd2UgYXNzaWduIFwib3B0aW9uc1wiIG9iamVjdCBkaXJlY3RseSB0byB0aGUgRE9NIGVsZW1lbnQuIEZUVyFcbiAgICAgICAgICovXG4gICAgICAgIGlmKF9pc0pRKSB7XG4gICAgICAgICAgICBqcUVsLmRhdGEoJ21hZ25pZmljUG9wdXAnLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGpxRWxbMF0ubWFnbmlmaWNQb3B1cCA9IG9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBtZnAuYWRkR3JvdXAoanFFbCwgb3B0aW9ucyk7XG5cbiAgICB9XG4gICAgcmV0dXJuIGpxRWw7XG59O1xuXG4vKj4+Y29yZSovXG5cbi8qPj5pbmxpbmUqL1xuXG52YXIgSU5MSU5FX05TID0gJ2lubGluZScsXG4gICAgX2hpZGRlbkNsYXNzLFxuICAgIF9pbmxpbmVQbGFjZWhvbGRlcixcbiAgICBfbGFzdElubGluZUVsZW1lbnQsXG4gICAgX3B1dElubGluZUVsZW1lbnRzQmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihfbGFzdElubGluZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIF9pbmxpbmVQbGFjZWhvbGRlci5hZnRlciggX2xhc3RJbmxpbmVFbGVtZW50LmFkZENsYXNzKF9oaWRkZW5DbGFzcykgKS5kZXRhY2goKTtcbiAgICAgICAgICAgIF9sYXN0SW5saW5lRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoSU5MSU5FX05TLCB7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBoaWRkZW5DbGFzczogJ2hpZGUnLCAvLyB3aWxsIGJlIGFwcGVuZGVkIHdpdGggYG1mcC1gIHByZWZpeFxuICAgICAgICBtYXJrdXA6ICcnLFxuICAgICAgICB0Tm90Rm91bmQ6ICdDb250ZW50IG5vdCBmb3VuZCdcbiAgICB9LFxuICAgIHByb3RvOiB7XG5cbiAgICAgICAgaW5pdElubGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZnAudHlwZXMucHVzaChJTkxJTkVfTlMpO1xuXG4gICAgICAgICAgICBfbWZwT24oQ0xPU0VfRVZFTlQrJy4nK0lOTElORV9OUywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgX3B1dElubGluZUVsZW1lbnRzQmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SW5saW5lOiBmdW5jdGlvbihpdGVtLCB0ZW1wbGF0ZSkge1xuXG4gICAgICAgICAgICBfcHV0SW5saW5lRWxlbWVudHNCYWNrKCk7XG5cbiAgICAgICAgICAgIGlmKGl0ZW0uc3JjKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlubGluZVN0ID0gbWZwLnN0LmlubGluZSxcbiAgICAgICAgICAgICAgICAgICAgZWwgPSAkKGl0ZW0uc3JjKTtcblxuICAgICAgICAgICAgICAgIGlmKGVsLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRhcmdldCBlbGVtZW50IGhhcyBwYXJlbnQgLSB3ZSByZXBsYWNlIGl0IHdpdGggcGxhY2Vob2xkZXIgYW5kIHB1dCBpdCBiYWNrIGFmdGVyIHBvcHVwIGlzIGNsb3NlZFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxbMF0ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyZW50ICYmIHBhcmVudC50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighX2lubGluZVBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2hpZGRlbkNsYXNzID0gaW5saW5lU3QuaGlkZGVuQ2xhc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lubGluZVBsYWNlaG9sZGVyID0gX2dldEVsKF9oaWRkZW5DbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2hpZGRlbkNsYXNzID0gJ21mcC0nK19oaWRkZW5DbGFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgdGFyZ2V0IGlubGluZSBlbGVtZW50IHdpdGggcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sYXN0SW5saW5lRWxlbWVudCA9IGVsLmFmdGVyKF9pbmxpbmVQbGFjZWhvbGRlcikuZGV0YWNoKCkucmVtb3ZlQ2xhc3MoX2hpZGRlbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1mcC51cGRhdGVTdGF0dXMoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWZwLnVwZGF0ZVN0YXR1cygnZXJyb3InLCBpbmxpbmVTdC50Tm90Rm91bmQpO1xuICAgICAgICAgICAgICAgICAgICBlbCA9ICQoJzxkaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5pbmxpbmVFbGVtZW50ID0gZWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuICAgICAgICAgICAgbWZwLl9wYXJzZU1hcmt1cCh0ZW1wbGF0ZSwge30sIGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qPj5pbmxpbmUqL1xuXG4vKj4+YWpheCovXG52YXIgQUpBWF9OUyA9ICdhamF4JyxcbiAgICBfYWpheEN1cixcbiAgICBfcmVtb3ZlQWpheEN1cnNvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihfYWpheEN1cikge1xuICAgICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhfYWpheEN1cik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9kZXN0cm95QWpheFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgX3JlbW92ZUFqYXhDdXJzb3IoKTtcbiAgICAgICAgaWYobWZwLnJlcSkge1xuICAgICAgICAgICAgbWZwLnJlcS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuJC5tYWduaWZpY1BvcHVwLnJlZ2lzdGVyTW9kdWxlKEFKQVhfTlMsIHtcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgc2V0dGluZ3M6IG51bGwsXG4gICAgICAgIGN1cnNvcjogJ21mcC1hamF4LWN1cicsXG4gICAgICAgIHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPlRoZSBjb250ZW50PC9hPiBjb3VsZCBub3QgYmUgbG9hZGVkLidcbiAgICB9LFxuXG4gICAgcHJvdG86IHtcbiAgICAgICAgaW5pdEFqYXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWZwLnR5cGVzLnB1c2goQUpBWF9OUyk7XG4gICAgICAgICAgICBfYWpheEN1ciA9IG1mcC5zdC5hamF4LmN1cnNvcjtcblxuICAgICAgICAgICAgX21mcE9uKENMT1NFX0VWRU5UKycuJytBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcbiAgICAgICAgICAgIF9tZnBPbignQmVmb3JlQ2hhbmdlLicgKyBBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QWpheDogZnVuY3Rpb24oaXRlbSkge1xuXG4gICAgICAgICAgICBpZihfYWpheEN1cikge1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoX2FqYXhDdXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZnAudXBkYXRlU3RhdHVzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgICAgIHVybDogaXRlbS5zcmMsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSwgdGV4dFN0YXR1cywganFYSFIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHI6anFYSFJcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBfbWZwVHJpZ2dlcignUGFyc2VBamF4JywgdGVtcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWZwLmFwcGVuZENvbnRlbnQoICQodGVtcC5kYXRhKSwgQUpBWF9OUyApO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBamF4Q3Vyc29yKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWZwLl9zZXRGb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZnAud3JhcC5hZGRDbGFzcyhSRUFEWV9DTEFTUyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDE2KTtcblxuICAgICAgICAgICAgICAgICAgICBtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG4gICAgICAgICAgICAgICAgICAgIF9tZnBUcmlnZ2VyKCdBamF4Q29udGVudEFkZGVkJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBamF4Q3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZmluaXNoZWQgPSBpdGVtLmxvYWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIG1mcC51cGRhdGVTdGF0dXMoJ2Vycm9yJywgbWZwLnN0LmFqYXgudEVycm9yLnJlcGxhY2UoJyV1cmwlJywgaXRlbS5zcmMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBtZnAuc3QuYWpheC5zZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIG1mcC5yZXEgPSAkLmFqYXgob3B0cyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKj4+YWpheCovXG5cbi8qPj5pbWFnZSovXG52YXIgX2ltZ0ludGVydmFsLFxuICAgIF9nZXRUaXRsZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoaXRlbS5kYXRhICYmIGl0ZW0uZGF0YS50aXRsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YS50aXRsZTtcblxuICAgICAgICB2YXIgc3JjID0gbWZwLnN0LmltYWdlLnRpdGxlU3JjO1xuXG4gICAgICAgIGlmKHNyYykge1xuICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKHNyYykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLmNhbGwobWZwLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZWwuYXR0cihzcmMpIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoJ2ltYWdlJywge1xuXG4gICAgb3B0aW9uczoge1xuICAgICAgICBtYXJrdXA6ICc8ZGl2IGNsYXNzPVwibWZwLWZpZ3VyZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWZwLWNsb3NlXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxmaWd1cmU+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWZwLWltZ1wiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZpZ2NhcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1mcC1ib3R0b20tYmFyXCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtZnAtdGl0bGVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1mcC1jb3VudGVyXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2ZpZ2NhcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZmlndXJlPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIGN1cnNvcjogJ21mcC16b29tLW91dC1jdXInLFxuICAgICAgICB0aXRsZVNyYzogJ3RpdGxlJyxcbiAgICAgICAgdmVydGljYWxGaXQ6IHRydWUsXG4gICAgICAgIHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPlRoZSBpbWFnZTwvYT4gY291bGQgbm90IGJlIGxvYWRlZC4nXG4gICAgfSxcblxuICAgIHByb3RvOiB7XG4gICAgICAgIGluaXRJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW1nU3QgPSBtZnAuc3QuaW1hZ2UsXG4gICAgICAgICAgICAgICAgbnMgPSAnLmltYWdlJztcblxuICAgICAgICAgICAgbWZwLnR5cGVzLnB1c2goJ2ltYWdlJyk7XG5cbiAgICAgICAgICAgIF9tZnBPbihPUEVOX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihtZnAuY3Vyckl0ZW0udHlwZSA9PT0gJ2ltYWdlJyAmJiBpbWdTdC5jdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhpbWdTdC5jdXJzb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfbWZwT24oQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKGltZ1N0LmN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKGltZ1N0LmN1cnNvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF93aW5kb3cub2ZmKCdyZXNpemUnICsgRVZFTlRfTlMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9tZnBPbignUmVzaXplJytucywgbWZwLnJlc2l6ZUltYWdlKTtcbiAgICAgICAgICAgIGlmKG1mcC5pc0xvd0lFKSB7XG4gICAgICAgICAgICAgICAgX21mcE9uKCdBZnRlckNoYW5nZScsIG1mcC5yZXNpemVJbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2l6ZUltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gbWZwLmN1cnJJdGVtO1xuICAgICAgICAgICAgaWYoIWl0ZW0gfHwgIWl0ZW0uaW1nKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmKG1mcC5zdC5pbWFnZS52ZXJ0aWNhbEZpdCkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNyID0gMDtcbiAgICAgICAgICAgICAgICAvLyBmaXggYm94LXNpemluZyBpbiBpZTcvOFxuICAgICAgICAgICAgICAgIGlmKG1mcC5pc0xvd0lFKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY3IgPSBwYXJzZUludChpdGVtLmltZy5jc3MoJ3BhZGRpbmctdG9wJyksIDEwKSArIHBhcnNlSW50KGl0ZW0uaW1nLmNzcygncGFkZGluZy1ib3R0b20nKSwxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uaW1nLmNzcygnbWF4LWhlaWdodCcsIG1mcC53SC1kZWNyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX29uSW1hZ2VIYXNTaXplOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpZihpdGVtLmltZykge1xuXG4gICAgICAgICAgICAgICAgaXRlbS5oYXNTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmKF9pbWdJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF9pbWdJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbS5pc0NoZWNraW5nSW1nU2l6ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgX21mcFRyaWdnZXIoJ0ltYWdlSGFzU2l6ZScsIGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5pbWdIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobWZwLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZnAuY29udGVudC5yZW1vdmVDbGFzcygnbWZwLWxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmltZ0hpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbiB0aGF0IGxvb3BzIHVudGlsIHRoZSBpbWFnZSBoYXMgc2l6ZSB0byBkaXNwbGF5IGVsZW1lbnRzIHRoYXQgcmVseSBvbiBpdCBhc2FwXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kSW1hZ2VTaXplOiBmdW5jdGlvbihpdGVtKSB7XG5cbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gMCxcbiAgICAgICAgICAgICAgICBpbWcgPSBpdGVtLmltZ1swXSxcbiAgICAgICAgICAgICAgICBtZnBTZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGRlbGF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoX2ltZ0ludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF9pbWdJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVjZWxlcmF0aW5nIGludGVydmFsIHRoYXQgY2hlY2tzIGZvciBzaXplIG9mIGFuIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIF9pbWdJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW1nLm5hdHVyYWxXaWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZnAuX29uSW1hZ2VIYXNTaXplKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY291bnRlciA+IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2ltZ0ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY291bnRlciA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1mcFNldEludGVydmFsKDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudGVyID09PSA0MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1mcFNldEludGVydmFsKDUwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudGVyID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZnBTZXRJbnRlcnZhbCg1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWZwU2V0SW50ZXJ2YWwoMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SW1hZ2U6IGZ1bmN0aW9uKGl0ZW0sIHRlbXBsYXRlKSB7XG5cbiAgICAgICAgICAgIHZhciBndWFyZCA9IDAsXG5cbiAgICAgICAgICAgICAgICAvLyBpbWFnZSBsb2FkIGNvbXBsZXRlIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBvbkxvYWRDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWdbMF0uY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmltZy5vZmYoJy5tZnBsb2FkZXInKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0gPT09IG1mcC5jdXJySXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tZnBUcmlnZ2VyKCdJbWFnZUxvYWRDb21wbGV0ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpbWFnZSBjb21wbGV0ZSBjaGVjayBmYWlscyAyMDAgdGltZXMgKDIwIHNlYyksIHdlIGFzc3VtZSB0aGF0IHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWFyZCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGd1YXJkIDwgMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQob25Mb2FkQ29tcGxldGUsMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxvYWRFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvLyBpbWFnZSBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICAgICAgb25Mb2FkRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pbWcub2ZmKCcubWZwbG9hZGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtID09PSBtZnAuY3Vyckl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWZwLnVwZGF0ZVN0YXR1cygnZXJyb3InLCBpbWdTdC50RXJyb3IucmVwbGFjZSgnJXVybCUnLCBpdGVtLnNyYykgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oYXNTaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW1nU3QgPSBtZnAuc3QuaW1hZ2U7XG5cblxuICAgICAgICAgICAgdmFyIGVsID0gdGVtcGxhdGUuZmluZCgnLm1mcC1pbWcnKTtcbiAgICAgICAgICAgIGlmKGVsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gJ21mcC1pbWcnO1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uZWwgJiYgaXRlbS5lbC5maW5kKCdpbWcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmFsdCA9IGl0ZW0uZWwuZmluZCgnaW1nJykuYXR0cignYWx0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uaW1nID0gJChpbWcpLm9uKCdsb2FkLm1mcGxvYWRlcicsIG9uTG9hZENvbXBsZXRlKS5vbignZXJyb3IubWZwbG9hZGVyJywgb25Mb2FkRXJyb3IpO1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpdGVtLnNyYztcblxuICAgICAgICAgICAgICAgIC8vIHdpdGhvdXQgY2xvbmUoKSBcImVycm9yXCIgZXZlbnQgaXMgbm90IGZpcmluZyB3aGVuIElNRyBpcyByZXBsYWNlZCBieSBuZXcgSU1HXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZmluZCBhIHdheSB0byBhdm9pZCBzdWNoIGNsb25pbmdcbiAgICAgICAgICAgICAgICBpZihlbC5pcygnaW1nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbWcgPSBpdGVtLmltZy5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZyA9IGl0ZW0uaW1nWzBdO1xuICAgICAgICAgICAgICAgIGlmKGltZy5uYXR1cmFsV2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCFpbWcud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oYXNTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZnAuX3BhcnNlTWFya3VwKHRlbXBsYXRlLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF9nZXRUaXRsZShpdGVtKSxcbiAgICAgICAgICAgICAgICBpbWdfcmVwbGFjZVdpdGg6IGl0ZW0uaW1nXG4gICAgICAgICAgICB9LCBpdGVtKTtcblxuICAgICAgICAgICAgbWZwLnJlc2l6ZUltYWdlKCk7XG5cbiAgICAgICAgICAgIGlmKGl0ZW0uaGFzU2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmKF9pbWdJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChfaW1nSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5sb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuYWRkQ2xhc3MoJ21mcC1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIG1mcC51cGRhdGVTdGF0dXMoJ2Vycm9yJywgaW1nU3QudEVycm9yLnJlcGxhY2UoJyV1cmwlJywgaXRlbS5zcmMpICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUucmVtb3ZlQ2xhc3MoJ21mcC1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIG1mcC51cGRhdGVTdGF0dXMoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWZwLnVwZGF0ZVN0YXR1cygnbG9hZGluZycpO1xuICAgICAgICAgICAgaXRlbS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYoIWl0ZW0uaGFzU2l6ZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uaW1nSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5hZGRDbGFzcygnbWZwLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBtZnAuZmluZEltYWdlU2l6ZShpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qPj5pbWFnZSovXG5cbi8qPj56b29tKi9cbnZhciBoYXNNb3pUcmFuc2Zvcm0sXG4gICAgZ2V0SGFzTW96VHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGhhc01velRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoYXNNb3pUcmFuc2Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc01velRyYW5zZm9ybTtcbiAgICB9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoJ3pvb20nLCB7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBlYXNpbmc6ICdlYXNlLWluLW91dCcsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIG9wZW5lcjogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaXMoJ2ltZycpID8gZWxlbWVudCA6IGVsZW1lbnQuZmluZCgnaW1nJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvdG86IHtcblxuICAgICAgICBpbml0Wm9vbTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgem9vbVN0ID0gbWZwLnN0Lnpvb20sXG4gICAgICAgICAgICAgICAgbnMgPSAnLnpvb20nLFxuICAgICAgICAgICAgICAgIGltYWdlO1xuXG4gICAgICAgICAgICBpZighem9vbVN0LmVuYWJsZWQgfHwgIW1mcC5zdXBwb3J0c1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHpvb21TdC5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICBnZXRFbFRvQW5pbWF0ZSA9IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBpbWFnZS5jbG9uZSgpLnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQXR0cignY2xhc3MnKS5hZGRDbGFzcygnbWZwLWFuaW1hdGVkLWltYWdlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uID0gJ2FsbCAnKyh6b29tU3QuZHVyYXRpb24vMTAwMCkrJ3MgJyArIHpvb21TdC5lYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NPYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHknOiAnaGlkZGVuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAndHJhbnNpdGlvbic7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzT2JqWyctd2Via2l0LScrdF0gPSBjc3NPYmpbJy1tb3otJyt0XSA9IGNzc09ialsnLW8tJyt0XSA9IGNzc09ialt0XSA9IHRyYW5zaXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLmNzcyhjc3NPYmopO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW1nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvd01haW5Db250ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG1mcC5jb250ZW50LmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcGVuVGltZW91dCxcbiAgICAgICAgICAgICAgICBhbmltYXRlZEltZztcblxuICAgICAgICAgICAgX21mcE9uKCdCdWlsZENvbnRyb2xzJytucywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChvcGVuVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIG1mcC5jb250ZW50LmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBCYXNpY2FsbHksIGFsbCBjb2RlIGJlbG93IGRvZXMgaXMgY2xvbmVzIGV4aXN0aW5nIGltYWdlLCBwdXRzIGluIG9uIHRvcCBvZiB0aGUgY3VycmVudCBvbmUgYW5kIGFuaW1hdGVkIGl0XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UgPSBtZnAuX2dldEl0ZW1Ub1pvb20oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZighaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNYWluQ29udGVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWRJbWcgPSBnZXRFbFRvQW5pbWF0ZShpbWFnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWRJbWcuY3NzKCBtZnAuX2dldE9mZnNldCgpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblxuICAgICAgICAgICAgICAgICAgICBvcGVuVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZEltZy5jc3MoIG1mcC5fZ2V0T2Zmc2V0KCB0cnVlICkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNYWluQ29udGVudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWRJbWcucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gYW5pbWF0ZWRJbWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWZwVHJpZ2dlcignWm9vbUFuaW1hdGlvbkVuZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTYpOyAvLyBhdm9pZCBibGluayB3aGVuIHN3aXRjaGluZyBpbWFnZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZHVyYXRpb24pOyAvLyB0aGlzIHRpbWVvdXQgZXF1YWxzIGFuaW1hdGlvbiBkdXJhdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIH0sIDE2KTsgLy8gYnkgYWRkaW5nIHRoaXMgdGltZW91dCB3ZSBhdm9pZCBzaG9ydCBnbGl0Y2ggYXQgdGhlIGJlZ2lubmluZyBvZiBhbmltYXRpb25cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIExvdHMgb2YgdGltZW91dHMuLi5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF9tZnBPbihCRUZPUkVfQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG1mcC5fYWxsb3dab29tKCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQob3BlblRpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1mcC5zdC5yZW1vdmFsRGVsYXkgPSBkdXJhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZighaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gbWZwLl9nZXRJdGVtVG9ab29tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQodHJ1ZSkgKTtcbiAgICAgICAgICAgICAgICAgICAgbWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcbiAgICAgICAgICAgICAgICAgICAgbWZwLmNvbnRlbnQuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlZEltZy5jc3MoIG1mcC5fZ2V0T2Zmc2V0KCkgKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTYpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9tZnBPbihDTE9TRV9FVkVOVCtucywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobWZwLl9hbGxvd1pvb20oKSkge1xuICAgICAgICAgICAgICAgICAgICBzaG93TWFpbkNvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYW5pbWF0ZWRJbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkSW1nLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYWxsb3dab29tOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtZnAuY3Vyckl0ZW0udHlwZSA9PT0gJ2ltYWdlJztcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0SXRlbVRvWm9vbTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihtZnAuY3Vyckl0ZW0uaGFzU2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZnAuY3Vyckl0ZW0uaW1nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gR2V0IGVsZW1lbnQgcG9zdGlvbiByZWxhdGl2ZSB0byB2aWV3cG9ydFxuICAgICAgICBfZ2V0T2Zmc2V0OiBmdW5jdGlvbihpc0xhcmdlKSB7XG4gICAgICAgICAgICB2YXIgZWw7XG4gICAgICAgICAgICBpZihpc0xhcmdlKSB7XG4gICAgICAgICAgICAgICAgZWwgPSBtZnAuY3Vyckl0ZW0uaW1nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbCA9IG1mcC5zdC56b29tLm9wZW5lcihtZnAuY3Vyckl0ZW0uZWwgfHwgbWZwLmN1cnJJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGVsLm9mZnNldCgpO1xuICAgICAgICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUludChlbC5jc3MoJ3BhZGRpbmctdG9wJyksMTApO1xuICAgICAgICAgICAgdmFyIHBhZGRpbmdCb3R0b20gPSBwYXJzZUludChlbC5jc3MoJ3BhZGRpbmctYm90dG9tJyksMTApO1xuICAgIFxuICAgICAgICAgICAgb2Zmc2V0LnRvcCAtPSAoICQod2luZG93KS5zY3JvbGxUb3AoKSAtIHBhZGRpbmdUb3AgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLypcblxuICAgICAgICAgICAgQW5pbWF0aW5nIGxlZnQgKyB0b3AgKyB3aWR0aC9oZWlnaHQgbG9va3MgZ2xpdGNoeSBpbiBGaXJlZm94LCBidXQgcGVyZmVjdCBpbiBDaHJvbWUuIEFuZCB2aWNlLXZlcnNhLlxuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGVsLndpZHRoKCksXG4gICAgICAgICAgICAgICAgLy8gZml4IFplcHRvIGhlaWdodCtwYWRkaW5nIGlzc3VlXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAoX2lzSlEgPyBlbC5pbm5lckhlaWdodCgpIDogZWxbMF0ub2Zmc2V0SGVpZ2h0KSAtIHBhZGRpbmdCb3R0b20gLSBwYWRkaW5nVG9wXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBJIGhhdGUgdG8gZG8gdGhpcywgYnV0IHRoZXJlIGlzIG5vIGFub3RoZXIgb3B0aW9uXG4gICAgICAgICAgICBpZiggZ2V0SGFzTW96VHJhbnNmb3JtKCkgKSB7XG4gICAgICAgICAgICAgICAgb2JqWyctbW96LXRyYW5zZm9ybSddID0gb2JqWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUoJyArIG9mZnNldC5sZWZ0ICsgJ3B4LCcgKyBvZmZzZXQudG9wICsgJ3B4KSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iai5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICAgICAgb2JqLnRvcCA9IG9mZnNldC50b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICB9XG59KTtcblxuXG5cbi8qPj56b29tKi9cblxuLyo+PmlmcmFtZSovXG5cbnZhciBJRlJBTUVfTlMgPSAnaWZyYW1lJyxcbiAgICBfZW1wdHlQYWdlID0gJy8vYWJvdXQ6YmxhbmsnLFxuXG4gICAgX2ZpeElmcmFtZUJ1Z3MgPSBmdW5jdGlvbihpc1Nob3dpbmcpIHtcbiAgICAgICAgaWYobWZwLmN1cnJUZW1wbGF0ZVtJRlJBTUVfTlNdKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBtZnAuY3VyclRlbXBsYXRlW0lGUkFNRV9OU10uZmluZCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZihlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyByZXNldCBzcmMgYWZ0ZXIgdGhlIHBvcHVwIGlzIGNsb3NlZCB0byBhdm9pZCBcInZpZGVvIGtlZXBzIHBsYXlpbmcgYWZ0ZXIgcG9wdXAgaXMgY2xvc2VkXCIgYnVnXG4gICAgICAgICAgICAgICAgaWYoIWlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBlbFswXS5zcmMgPSBfZW1wdHlQYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElFOCBibGFjayBzY3JlZW4gYnVnIGZpeFxuICAgICAgICAgICAgICAgIGlmKG1mcC5pc0lFOCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jc3MoJ2Rpc3BsYXknLCBpc1Nob3dpbmcgPyAnYmxvY2snIDogJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoSUZSQU1FX05TLCB7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIG1hcmt1cDogJzxkaXYgY2xhc3M9XCJtZnAtaWZyYW1lLXNjYWxlclwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWZwLWNsb3NlXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpZnJhbWUgY2xhc3M9XCJtZnAtaWZyYW1lXCIgc3JjPVwiLy9hYm91dDpibGFua1wiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuXG4gICAgICAgIHNyY0FjdGlvbjogJ2lmcmFtZV9zcmMnLFxuXG4gICAgICAgIC8vIHdlIGRvbid0IGNhcmUgYW5kIHN1cHBvcnQgb25seSBvbmUgZGVmYXVsdCB0eXBlIG9mIFVSTCBieSBkZWZhdWx0XG4gICAgICAgIHBhdHRlcm5zOiB7XG4gICAgICAgICAgICB5b3V0dWJlOiB7XG4gICAgICAgICAgICAgICAgaW5kZXg6ICd5b3V0dWJlLmNvbScsXG4gICAgICAgICAgICAgICAgaWQ6ICd2PScsXG4gICAgICAgICAgICAgICAgc3JjOiAnLy93d3cueW91dHViZS5jb20vZW1iZWQvJWlkJT9hdXRvcGxheT0xJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpbWVvOiB7XG4gICAgICAgICAgICAgICAgaW5kZXg6ICd2aW1lby5jb20vJyxcbiAgICAgICAgICAgICAgICBpZDogJy8nLFxuICAgICAgICAgICAgICAgIHNyYzogJy8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8laWQlP2F1dG9wbGF5PTEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ21hcHM6IHtcbiAgICAgICAgICAgICAgICBpbmRleDogJy8vbWFwcy5nb29nbGUuJyxcbiAgICAgICAgICAgICAgICBzcmM6ICclaWQlJm91dHB1dD1lbWJlZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwcm90bzoge1xuICAgICAgICBpbml0SWZyYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1mcC50eXBlcy5wdXNoKElGUkFNRV9OUyk7XG5cbiAgICAgICAgICAgIF9tZnBPbignQmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oZSwgcHJldlR5cGUsIG5ld1R5cGUpIHtcbiAgICAgICAgICAgICAgICBpZihwcmV2VHlwZSAhPT0gbmV3VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihwcmV2VHlwZSA9PT0gSUZSQU1FX05TKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZml4SWZyYW1lQnVncygpOyAvLyBpZnJhbWUgaWYgcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobmV3VHlwZSA9PT0gSUZSQU1FX05TKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZml4SWZyYW1lQnVncyh0cnVlKTsgLy8gaWZyYW1lIGlzIHNob3dpbmdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0vLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWZyYW1lIHNvdXJjZSBpcyBzd2l0Y2hlZCwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfbWZwT24oQ0xPU0VfRVZFTlQgKyAnLicgKyBJRlJBTUVfTlMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF9maXhJZnJhbWVCdWdzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRJZnJhbWU6IGZ1bmN0aW9uKGl0ZW0sIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgZW1iZWRTcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICAgIHZhciBpZnJhbWVTdCA9IG1mcC5zdC5pZnJhbWU7XG5cbiAgICAgICAgICAgICQuZWFjaChpZnJhbWVTdC5wYXR0ZXJucywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoZW1iZWRTcmMuaW5kZXhPZiggdGhpcy5pbmRleCApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMuaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWRTcmMgPSBlbWJlZFNyYy5zdWJzdHIoZW1iZWRTcmMubGFzdEluZGV4T2YodGhpcy5pZCkrdGhpcy5pZC5sZW5ndGgsIGVtYmVkU3JjLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkU3JjID0gdGhpcy5pZC5jYWxsKCB0aGlzLCBlbWJlZFNyYyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVtYmVkU3JjID0gdGhpcy5zcmMucmVwbGFjZSgnJWlkJScsIGVtYmVkU3JjICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBkYXRhT2JqID0ge307XG4gICAgICAgICAgICBpZihpZnJhbWVTdC5zcmNBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBkYXRhT2JqW2lmcmFtZVN0LnNyY0FjdGlvbl0gPSBlbWJlZFNyYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIGRhdGFPYmosIGl0ZW0pO1xuXG4gICAgICAgICAgICBtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5cbi8qPj5pZnJhbWUqL1xuXG4vKj4+Z2FsbGVyeSovXG4vKipcbiAqIEdldCBsb29wZWQgaW5kZXggZGVwZW5kaW5nIG9uIG51bWJlciBvZiBzbGlkZXNcbiAqL1xudmFyIF9nZXRMb29wZWRJZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHZhciBudW1TbGlkZXMgPSBtZnAuaXRlbXMubGVuZ3RoO1xuICAgICAgICBpZihpbmRleCA+IG51bVNsaWRlcyAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAtIG51bVNsaWRlcztcbiAgICAgICAgfSBlbHNlICBpZihpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudW1TbGlkZXMgKyBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSxcbiAgICBfcmVwbGFjZUN1cnJUb3RhbCA9IGZ1bmN0aW9uKHRleHQsIGN1cnIsIHRvdGFsKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyVjdXJyJS9naSwgY3VyciArIDEpLnJlcGxhY2UoLyV0b3RhbCUvZ2ksIHRvdGFsKTtcbiAgICB9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoJ2dhbGxlcnknLCB7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBhcnJvd01hcmt1cDogJzxidXR0b24gdGl0bGU9XCIldGl0bGUlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWZwLWFycm93IG1mcC1hcnJvdy0lZGlyJVwiPjwvYnV0dG9uPicsXG4gICAgICAgIHByZWxvYWQ6IFswLDJdLFxuICAgICAgICBuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG4gICAgICAgIGFycm93czogdHJ1ZSxcblxuICAgICAgICB0UHJldjogJ1ByZXZpb3VzIChMZWZ0IGFycm93IGtleSknLFxuICAgICAgICB0TmV4dDogJ05leHQgKFJpZ2h0IGFycm93IGtleSknLFxuICAgICAgICB0Q291bnRlcjogJyVjdXJyJSBvZiAldG90YWwlJ1xuICAgIH0sXG5cbiAgICBwcm90bzoge1xuICAgICAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBnU3QgPSBtZnAuc3QuZ2FsbGVyeSxcbiAgICAgICAgICAgICAgICBucyA9ICcubWZwLWdhbGxlcnknO1xuXG4gICAgICAgICAgICBtZnAuZGlyZWN0aW9uID0gdHJ1ZTsgLy8gdHJ1ZSAtIG5leHQsIGZhbHNlIC0gcHJldlxuXG4gICAgICAgICAgICBpZighZ1N0IHx8ICFnU3QuZW5hYmxlZCApIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgX3dyYXBDbGFzc2VzICs9ICcgbWZwLWdhbGxlcnknO1xuXG4gICAgICAgICAgICBfbWZwT24oT1BFTl9FVkVOVCtucywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZihnU3QubmF2aWdhdGVCeUltZ0NsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1mcC53cmFwLm9uKCdjbGljaycrbnMsICcubWZwLWltZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWZwLml0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZnAubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX2RvY3VtZW50Lm9uKCdrZXlkb3duJytucywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWZwLnByZXYoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZnAubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX21mcE9uKCdVcGRhdGVTdGF0dXMnK25zLCBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dCA9IF9yZXBsYWNlQ3VyclRvdGFsKGRhdGEudGV4dCwgbWZwLmN1cnJJdGVtLmluZGV4LCBtZnAuaXRlbXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX21mcE9uKE1BUktVUF9QQVJTRV9FVkVOVCtucywgZnVuY3Rpb24oZSwgZWxlbWVudCwgdmFsdWVzLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBtZnAuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5jb3VudGVyID0gbCA+IDEgPyBfcmVwbGFjZUN1cnJUb3RhbChnU3QudENvdW50ZXIsIGl0ZW0uaW5kZXgsIGwpIDogJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX21mcE9uKCdCdWlsZENvbnRyb2xzJyArIG5zLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihtZnAuaXRlbXMubGVuZ3RoID4gMSAmJiBnU3QuYXJyb3dzICYmICFtZnAuYXJyb3dMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrdXAgPSBnU3QuYXJyb3dNYXJrdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd0xlZnQgPSBtZnAuYXJyb3dMZWZ0ID0gJCggbWFya3VwLnJlcGxhY2UoLyV0aXRsZSUvZ2ksIGdTdC50UHJldikucmVwbGFjZSgvJWRpciUvZ2ksICdsZWZ0JykgKS5hZGRDbGFzcyhQUkVWRU5UX0NMT1NFX0NMQVNTKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93UmlnaHQgPSBtZnAuYXJyb3dSaWdodCA9ICQoIG1hcmt1cC5yZXBsYWNlKC8ldGl0bGUlL2dpLCBnU3QudE5leHQpLnJlcGxhY2UoLyVkaXIlL2dpLCAncmlnaHQnKSApLmFkZENsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFycm93TGVmdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1mcC5wcmV2KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhcnJvd1JpZ2h0LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWZwLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWZwLmNvbnRhaW5lci5hcHBlbmQoYXJyb3dMZWZ0LmFkZChhcnJvd1JpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9tZnBPbihDSEFOR0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG1mcC5fcHJlbG9hZFRpbWVvdXQpIGNsZWFyVGltZW91dChtZnAuX3ByZWxvYWRUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgIG1mcC5fcHJlbG9hZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBtZnAucHJlbG9hZE5lYXJieUltYWdlcygpO1xuICAgICAgICAgICAgICAgICAgICBtZnAuX3ByZWxvYWRUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9LCAxNik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBfbWZwT24oQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF9kb2N1bWVudC5vZmYobnMpO1xuICAgICAgICAgICAgICAgIG1mcC53cmFwLm9mZignY2xpY2snK25zKTtcbiAgICAgICAgICAgICAgICBtZnAuYXJyb3dSaWdodCA9IG1mcC5hcnJvd0xlZnQgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZnAuZGlyZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIG1mcC5pbmRleCA9IF9nZXRMb29wZWRJZChtZnAuaW5kZXggKyAxKTtcbiAgICAgICAgICAgIG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuICAgICAgICB9LFxuICAgICAgICBwcmV2OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1mcC5kaXJlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIG1mcC5pbmRleCA9IF9nZXRMb29wZWRJZChtZnAuaW5kZXggLSAxKTtcbiAgICAgICAgICAgIG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuICAgICAgICB9LFxuICAgICAgICBnb1RvOiBmdW5jdGlvbihuZXdJbmRleCkge1xuICAgICAgICAgICAgbWZwLmRpcmVjdGlvbiA9IChuZXdJbmRleCA+PSBtZnAuaW5kZXgpO1xuICAgICAgICAgICAgbWZwLmluZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgICBtZnAudXBkYXRlSXRlbUhUTUwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJlbG9hZE5lYXJieUltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcCA9IG1mcC5zdC5nYWxsZXJ5LnByZWxvYWQsXG4gICAgICAgICAgICAgICAgcHJlbG9hZEJlZm9yZSA9IE1hdGgubWluKHBbMF0sIG1mcC5pdGVtcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgIHByZWxvYWRBZnRlciA9IE1hdGgubWluKHBbMV0sIG1mcC5pdGVtcy5sZW5ndGgpLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSAobWZwLmRpcmVjdGlvbiA/IHByZWxvYWRBZnRlciA6IHByZWxvYWRCZWZvcmUpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtZnAuX3ByZWxvYWRJdGVtKG1mcC5pbmRleCtpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSAobWZwLmRpcmVjdGlvbiA/IHByZWxvYWRCZWZvcmUgOiBwcmVsb2FkQWZ0ZXIpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtZnAuX3ByZWxvYWRJdGVtKG1mcC5pbmRleC1pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX3ByZWxvYWRJdGVtOiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgaW5kZXggPSBfZ2V0TG9vcGVkSWQoaW5kZXgpO1xuXG4gICAgICAgICAgICBpZihtZnAuaXRlbXNbaW5kZXhdLnByZWxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBtZnAuaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgaWYoIWl0ZW0ucGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IG1mcC5wYXJzZUVsKCBpbmRleCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfbWZwVHJpZ2dlcignTGF6eUxvYWQnLCBpdGVtKTtcblxuICAgICAgICAgICAgaWYoaXRlbS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5pbWcgPSAkKCc8aW1nIGNsYXNzPVwibWZwLWltZ1wiIC8+Jykub24oJ2xvYWQubWZwbG9hZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSkub24oJ2Vycm9yLm1mcGxvYWRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9tZnBUcmlnZ2VyKCdMYXp5TG9hZEVycm9yJywgaXRlbSk7XG4gICAgICAgICAgICAgICAgfSkuYXR0cignc3JjJywgaXRlbS5zcmMpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGl0ZW0ucHJlbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKj4+Z2FsbGVyeSovXG5cbi8qPj5yZXRpbmEqL1xuXG52YXIgUkVUSU5BX05TID0gJ3JldGluYSc7XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZShSRVRJTkFfTlMsIHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlcGxhY2VTcmM6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnNyYy5yZXBsYWNlKC9cXC5cXHcrJC8sIGZ1bmN0aW9uKG0pIHsgcmV0dXJuICdAMngnICsgbTsgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJhdGlvOiAxIC8vIEZ1bmN0aW9uIG9yIG51bWJlci4gIFNldCB0byAxIHRvIGRpc2FibGUuXG4gICAgfSxcbiAgICBwcm90bzoge1xuICAgICAgICBpbml0UmV0aW5hOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ID0gbWZwLnN0LnJldGluYSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW8gPSBzdC5yYXRpbztcblxuICAgICAgICAgICAgICAgIHJhdGlvID0gIWlzTmFOKHJhdGlvKSA/IHJhdGlvIDogcmF0aW8oKTtcblxuICAgICAgICAgICAgICAgIGlmKHJhdGlvID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBfbWZwT24oJ0ltYWdlSGFzU2l6ZScgKyAnLicgKyBSRVRJTkFfTlMsIGZ1bmN0aW9uKGUsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaW1nLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21heC13aWR0aCc6IGl0ZW0uaW1nWzBdLm5hdHVyYWxXaWR0aCAvIHJhdGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcxMDAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfbWZwT24oJ0VsZW1lbnRQYXJzZScgKyAnLicgKyBSRVRJTkFfTlMsIGZ1bmN0aW9uKGUsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3JjID0gc3QucmVwbGFjZVNyYyhpdGVtLCByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qPj5yZXRpbmEqL1xuIF9jaGVja0luc3RhbmNlKCk7IH0pKTsiXX0=

"use strict";

/**
 * SVG Fixer
 *
 * Fixes references to inline SVG elements when the <base> tag is in use.
 * Firefox won't display SVG icons referenced with
 * `<svg><use xlink:href="#id-of-icon-def"></use></svg>` when the <base> tag is on the page.
 *
 * More info:
 * - http://stackoverflow.com/a/18265336/796152
 * - http://www.w3.org/TR/SVG/linking.html
 *
 * One would think that setting the `xml:base` attribute fixes things,
 * but that is being removed from the platform: https://code.google.com/p/chromium/issues/detail?id=341854
 */

(function (document, window) {
    "use strict";

    /**
    * Initialize the SVG Fixer after the DOM is ready
    */

    document.addEventListener("DOMContentLoaded", function () {

        /**
         * Current URL, without the hash
         */
        var baseUrl = window.location.href.replace(window.location.hash, "");

        /**
        *  Find all `use` elements with a namespaced `href` attribute, e.g.
        *  <use xlink:href="#some-id"></use>
        *
        *  See: http://stackoverflow.com/a/23047888/796152
        */
        [].slice.call(document.querySelectorAll("use[*|href]"))

        /**
        * Filter out all elements whose namespaced `href` attribute doesn't
        * start with `#` (i.e. all non-relative IRI's)
        *
        * Note: we're assuming the `xlink` prefix for the XLink namespace!
        */
        .filter(function (element) {
            return element.getAttribute("xlink:href").indexOf("#") === 0;
        })

        /**
        * Prepend `window.location` to the namespaced `href` attribute value,
        * in order to make it an absolute IRI
        *
        * Note: we're assuming the `xlink` prefix for the XLink namespace!
        */
        .forEach(function (element) {
            element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
        });
    }, false);
})(document, window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9zdmdmaXhlci5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiYXNlVXJsIiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsImhhc2giLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmlsdGVyIiwiZWxlbWVudCIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQyxXQUFTQSxRQUFULEVBQW1CQyxNQUFuQixFQUEyQjtBQUN4Qjs7QUFFQTs7OztBQUdBRCxhQUFTRSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVzs7QUFFckQ7OztBQUdBLFlBQUlDLFVBQVVGLE9BQU9HLFFBQVAsQ0FBZ0JDLElBQWhCLENBQ1RDLE9BRFMsQ0FDREwsT0FBT0csUUFBUCxDQUFnQkcsSUFEZixFQUNxQixFQURyQixDQUFkOztBQUdBOzs7Ozs7QUFNQSxXQUFHQyxLQUFILENBQVNDLElBQVQsQ0FBY1QsU0FBU1UsZ0JBQVQsQ0FBMEIsYUFBMUIsQ0FBZDs7QUFFSTs7Ozs7O0FBRkosU0FRS0MsTUFSTCxDQVFZLFVBQVNDLE9BQVQsRUFBa0I7QUFDdEIsbUJBQVFBLFFBQVFDLFlBQVIsQ0FBcUIsWUFBckIsRUFBbUNDLE9BQW5DLENBQTJDLEdBQTNDLE1BQW9ELENBQTVEO0FBQ0gsU0FWTDs7QUFZSTs7Ozs7O0FBWkosU0FrQktDLE9BbEJMLENBa0JhLFVBQVNILE9BQVQsRUFBa0I7QUFDdkJBLG9CQUFRSSxZQUFSLENBQXFCLFlBQXJCLEVBQW1DYixVQUFVUyxRQUFRQyxZQUFSLENBQXFCLFlBQXJCLENBQTdDO0FBQ0gsU0FwQkw7QUFzQkgsS0FwQ0QsRUFvQ0csS0FwQ0g7QUFzQ0gsQ0E1Q0EsRUE0Q0NiLFFBNUNELEVBNENXQyxNQTVDWCxDQUFEIiwiZmlsZSI6Il9zdmdmaXhlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU1ZHIEZpeGVyXG4gKlxuICogRml4ZXMgcmVmZXJlbmNlcyB0byBpbmxpbmUgU1ZHIGVsZW1lbnRzIHdoZW4gdGhlIDxiYXNlPiB0YWcgaXMgaW4gdXNlLlxuICogRmlyZWZveCB3b24ndCBkaXNwbGF5IFNWRyBpY29ucyByZWZlcmVuY2VkIHdpdGhcbiAqIGA8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNpZC1vZi1pY29uLWRlZlwiPjwvdXNlPjwvc3ZnPmAgd2hlbiB0aGUgPGJhc2U+IHRhZyBpcyBvbiB0aGUgcGFnZS5cbiAqXG4gKiBNb3JlIGluZm86XG4gKiAtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4MjY1MzM2Lzc5NjE1MlxuICogLSBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvbGlua2luZy5odG1sXG4gKlxuICogT25lIHdvdWxkIHRoaW5rIHRoYXQgc2V0dGluZyB0aGUgYHhtbDpiYXNlYCBhdHRyaWJ1dGUgZml4ZXMgdGhpbmdzLFxuICogYnV0IHRoYXQgaXMgYmVpbmcgcmVtb3ZlZCBmcm9tIHRoZSBwbGF0Zm9ybTogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM0MTg1NFxuICovXG5cbihmdW5jdGlvbihkb2N1bWVudCwgd2luZG93KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAqIEluaXRpYWxpemUgdGhlIFNWRyBGaXhlciBhZnRlciB0aGUgRE9NIGlzIHJlYWR5XG4gICAgKi9cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3VycmVudCBVUkwsIHdpdGhvdXQgdGhlIGhhc2hcbiAgICAgICAgICovXG4gICAgICAgIHZhciBiYXNlVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBcIlwiKTtcblxuICAgICAgICAvKipcbiAgICAgICAgKiAgRmluZCBhbGwgYHVzZWAgZWxlbWVudHMgd2l0aCBhIG5hbWVzcGFjZWQgYGhyZWZgIGF0dHJpYnV0ZSwgZS5nLlxuICAgICAgICAqICA8dXNlIHhsaW5rOmhyZWY9XCIjc29tZS1pZFwiPjwvdXNlPlxuICAgICAgICAqXG4gICAgICAgICogIFNlZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjMwNDc4ODgvNzk2MTUyXG4gICAgICAgICovXG4gICAgICAgIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInVzZVsqfGhyZWZdXCIpKVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogRmlsdGVyIG91dCBhbGwgZWxlbWVudHMgd2hvc2UgbmFtZXNwYWNlZCBgaHJlZmAgYXR0cmlidXRlIGRvZXNuJ3RcbiAgICAgICAgICAgICogc3RhcnQgd2l0aCBgI2AgKGkuZS4gYWxsIG5vbi1yZWxhdGl2ZSBJUkkncylcbiAgICAgICAgICAgICpcbiAgICAgICAgICAgICogTm90ZTogd2UncmUgYXNzdW1pbmcgdGhlIGB4bGlua2AgcHJlZml4IGZvciB0aGUgWExpbmsgbmFtZXNwYWNlIVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpLmluZGV4T2YoXCIjXCIpID09PSAwKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBQcmVwZW5kIGB3aW5kb3cubG9jYXRpb25gIHRvIHRoZSBuYW1lc3BhY2VkIGBocmVmYCBhdHRyaWJ1dGUgdmFsdWUsXG4gICAgICAgICAgICAqIGluIG9yZGVyIHRvIG1ha2UgaXQgYW4gYWJzb2x1dGUgSVJJXG4gICAgICAgICAgICAqXG4gICAgICAgICAgICAqIE5vdGU6IHdlJ3JlIGFzc3VtaW5nIHRoZSBgeGxpbmtgIHByZWZpeCBmb3IgdGhlIFhMaW5rIG5hbWVzcGFjZSFcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIsIGJhc2VVcmwgKyBlbGVtZW50LmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9LCBmYWxzZSk7XG5cbn0oZG9jdW1lbnQsIHdpbmRvdykpO1xuIl19

'use strict';

;(function (d) {
    function template(id, data) {
        if (d.getElementById(id) !== null) {
            return Template7.compile(d.getElementById(id).innerHTML)(data || {});
        }
        return '';
    }
    window.template = template;
})(document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJkIiwidGVtcGxhdGUiLCJpZCIsImRhdGEiLCJnZXRFbGVtZW50QnlJZCIsIlRlbXBsYXRlNyIsImNvbXBpbGUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQ1QsYUFBU0MsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLElBQXRCLEVBQTRCO0FBQ3hCLFlBQUlILEVBQUVJLGNBQUYsQ0FBaUJGLEVBQWpCLE1BQXlCLElBQTdCLEVBQW1DO0FBQy9CLG1CQUFPRyxVQUFVQyxPQUFWLENBQWtCTixFQUFFSSxjQUFGLENBQWlCRixFQUFqQixFQUFxQkssU0FBdkMsRUFBa0RKLFFBQVEsRUFBMUQsQ0FBUDtBQUNIO0FBQ0QsZUFBTyxFQUFQO0FBQ0g7QUFDREssV0FBT1AsUUFBUCxHQUFrQkEsUUFBbEI7QUFDSCxDQVJBLEVBUUVRLFFBUkYiLCJmaWxlIjoiX3RlbXBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbihkKXtcbiAgICBmdW5jdGlvbiB0ZW1wbGF0ZShpZCwgZGF0YSkge1xuICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBUZW1wbGF0ZTcuY29tcGlsZShkLmdldEVsZW1lbnRCeUlkKGlkKS5pbm5lckhUTUwpKGRhdGEgfHwge30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgd2luZG93LnRlbXBsYXRlID0gdGVtcGxhdGU7XG59KShkb2N1bWVudCk7Il19

"use strict";

(function () {
    var support = "content" in document.createElement("template");

    // Set the content property if missing
    if (!support) {
        var
        /**
         * Prefer an array to a NodeList
         * Otherwise, updating the content property of a node
         * will update the NodeList and we'll loose the nested <template>
         */
        templates = Array.prototype.slice.call(document.getElementsByTagName("template")),
            template,
            content,
            fragment,
            node,
            i = 0,
            j;

        // For each <template> element get its content and wrap it in a document fragment
        while (template = templates[i++]) {
            content = template.children;
            fragment = document.createDocumentFragment();

            for (j = 0; node = content[j]; j++) {
                fragment.appendChild(node);
            }

            template.content = fragment;
        }
    }

    // Prepare a clone function to allow nested <template> elements
    function clone() {
        var templates = this.querySelectorAll("template"),
            fragments = [],
            template,
            i = 0;

        // If the support is OK simply clone and return
        if (support) {
            template = this.cloneNode(true);
            templates = template.content.querySelectorAll("template");

            // Set the clone method for each nested <template> element
            for (; templates[i]; i++) {
                templates[i].clone = clone;
            }

            return template;
        }

        // Loop through nested <template> to retrieve the content property
        for (; templates[i]; i++) {
            fragments.push(templates[i].content);
        }

        // Now, clone the document fragment
        template = this.cloneNode(true);

        // Makes sure the clone have a "content" and "clone" properties
        template.content = this.content;
        template.clone = clone;

        /**
         * Retrieve the nested <template> once again
         * Since we just cloned the document fragment,
         * the content's property of the nested <template> might be undefined
         * We have to re-set it using the fragment array we previously got
         */
        templates = template.querySelectorAll("template");

        // Loop to set the content property of each nested template
        for (i = 0; templates[i]; i++) {
            templates[i].content = fragments[i];
            templates[i].clone = clone; // Makes sure to set the clone method as well
        }

        return template;
    }

    var templates = document.querySelectorAll("template"),
        template,
        i = 0;

    // Pollute the DOM with a "clone" method on each <template> element
    while (template = templates[i++]) {
        template.clone = clone;
    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90ZW1wbGF0ZS5wb2x5ZmlsbC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGVtcGxhdGVzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInRlbXBsYXRlIiwiY29udGVudCIsImZyYWdtZW50Iiwibm9kZSIsImkiLCJqIiwiY2hpbGRyZW4iLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYXBwZW5kQ2hpbGQiLCJjbG9uZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmcmFnbWVudHMiLCJjbG9uZU5vZGUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOztBQUFDLGFBQVc7QUFDUixRQUFJQSxVQUFXLGFBQWFDLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBNUI7O0FBRUE7QUFDQSxRQUFJLENBQUNGLE9BQUwsRUFBYztBQUNWO0FBQ0k7Ozs7O0FBS0FHLG9CQUFZQyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJOLFNBQVNPLG9CQUFULENBQThCLFVBQTlCLENBQTNCLENBTmhCO0FBQUEsWUFPSUMsUUFQSjtBQUFBLFlBT2NDLE9BUGQ7QUFBQSxZQU91QkMsUUFQdkI7QUFBQSxZQU9pQ0MsSUFQakM7QUFBQSxZQU91Q0MsSUFBSSxDQVAzQztBQUFBLFlBTzhDQyxDQVA5Qzs7QUFTQTtBQUNBLGVBQVFMLFdBQVdOLFVBQVVVLEdBQVYsQ0FBbkIsRUFBb0M7QUFDaENILHNCQUFXRCxTQUFTTSxRQUFwQjtBQUNBSix1QkFBV1YsU0FBU2Usc0JBQVQsRUFBWDs7QUFFQSxpQkFBS0YsSUFBSSxDQUFULEVBQVlGLE9BQU9GLFFBQVFJLENBQVIsQ0FBbkIsRUFBK0JBLEdBQS9CLEVBQW9DO0FBQ2hDSCx5QkFBU00sV0FBVCxDQUFxQkwsSUFBckI7QUFDSDs7QUFFREgscUJBQVNDLE9BQVQsR0FBbUJDLFFBQW5CO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLGFBQVNPLEtBQVQsR0FBaUI7QUFDYixZQUNJZixZQUFZLEtBQUtnQixnQkFBTCxDQUFzQixVQUF0QixDQURoQjtBQUFBLFlBRUlDLFlBQVksRUFGaEI7QUFBQSxZQUdJWCxRQUhKO0FBQUEsWUFJSUksSUFBSSxDQUpSOztBQU1BO0FBQ0EsWUFBSWIsT0FBSixFQUFhO0FBQ1RTLHVCQUFZLEtBQUtZLFNBQUwsQ0FBZSxJQUFmLENBQVo7QUFDQWxCLHdCQUFZTSxTQUFTQyxPQUFULENBQWlCUyxnQkFBakIsQ0FBa0MsVUFBbEMsQ0FBWjs7QUFFQTtBQUNBLG1CQUFPaEIsVUFBVVUsQ0FBVixDQUFQLEVBQXFCQSxHQUFyQixFQUEwQjtBQUN0QlYsMEJBQVVVLENBQVYsRUFBYUssS0FBYixHQUFxQkEsS0FBckI7QUFDSDs7QUFFRCxtQkFBT1QsUUFBUDtBQUNIOztBQUVEO0FBQ0EsZUFBT04sVUFBVVUsQ0FBVixDQUFQLEVBQXFCQSxHQUFyQixFQUEwQjtBQUN0Qk8sc0JBQVVFLElBQVYsQ0FBZW5CLFVBQVVVLENBQVYsRUFBYUgsT0FBNUI7QUFDSDs7QUFFRDtBQUNBRCxtQkFBVyxLQUFLWSxTQUFMLENBQWUsSUFBZixDQUFYOztBQUVBO0FBQ0FaLGlCQUFTQyxPQUFULEdBQW1CLEtBQUtBLE9BQXhCO0FBQ0FELGlCQUFTUyxLQUFULEdBQW1CQSxLQUFuQjs7QUFFQTs7Ozs7O0FBTUFmLG9CQUFZTSxTQUFTVSxnQkFBVCxDQUEwQixVQUExQixDQUFaOztBQUVBO0FBQ0EsYUFBS04sSUFBSSxDQUFULEVBQVlWLFVBQVVVLENBQVYsQ0FBWixFQUEwQkEsR0FBMUIsRUFBK0I7QUFDM0JWLHNCQUFVVSxDQUFWLEVBQWFILE9BQWIsR0FBdUJVLFVBQVVQLENBQVYsQ0FBdkI7QUFDQVYsc0JBQVVVLENBQVYsRUFBYUssS0FBYixHQUF1QkEsS0FBdkIsQ0FGMkIsQ0FFRztBQUNqQzs7QUFFRCxlQUFPVCxRQUFQO0FBQ0g7O0FBRUQsUUFDSU4sWUFBWUYsU0FBU2tCLGdCQUFULENBQTBCLFVBQTFCLENBRGhCO0FBQUEsUUFFSVYsUUFGSjtBQUFBLFFBRWNJLElBQUksQ0FGbEI7O0FBSUE7QUFDQSxXQUFRSixXQUFXTixVQUFVVSxHQUFWLENBQW5CLEVBQW9DO0FBQ2hDSixpQkFBU1MsS0FBVCxHQUFpQkEsS0FBakI7QUFDSDtBQUNKLENBckZBLEdBQUQiLCJmaWxlIjoiX3RlbXBsYXRlLnBvbHlmaWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdXBwb3J0ID0gKFwiY29udGVudFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKSk7XG5cbiAgICAvLyBTZXQgdGhlIGNvbnRlbnQgcHJvcGVydHkgaWYgbWlzc2luZ1xuICAgIGlmICghc3VwcG9ydCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJlZmVyIGFuIGFycmF5IHRvIGEgTm9kZUxpc3RcbiAgICAgICAgICAgICAqIE90aGVyd2lzZSwgdXBkYXRpbmcgdGhlIGNvbnRlbnQgcHJvcGVydHkgb2YgYSBub2RlXG4gICAgICAgICAgICAgKiB3aWxsIHVwZGF0ZSB0aGUgTm9kZUxpc3QgYW5kIHdlJ2xsIGxvb3NlIHRoZSBuZXN0ZWQgPHRlbXBsYXRlPlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0ZW1wbGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRlbXBsYXRlXCIpKSxcbiAgICAgICAgICAgIHRlbXBsYXRlLCBjb250ZW50LCBmcmFnbWVudCwgbm9kZSwgaSA9IDAsIGo7XG5cbiAgICAgICAgLy8gRm9yIGVhY2ggPHRlbXBsYXRlPiBlbGVtZW50IGdldCBpdHMgY29udGVudCBhbmQgd3JhcCBpdCBpbiBhIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgIHdoaWxlICgodGVtcGxhdGUgPSB0ZW1wbGF0ZXNbaSsrXSkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgID0gdGVtcGxhdGUuY2hpbGRyZW47XG4gICAgICAgICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgICAgICAgZm9yIChqID0gMDsgbm9kZSA9IGNvbnRlbnRbal07IGorKykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wbGF0ZS5jb250ZW50ID0gZnJhZ21lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIGEgY2xvbmUgZnVuY3Rpb24gdG8gYWxsb3cgbmVzdGVkIDx0ZW1wbGF0ZT4gZWxlbWVudHNcbiAgICBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICB0ZW1wbGF0ZXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZW1wbGF0ZVwiKSxcbiAgICAgICAgICAgIGZyYWdtZW50cyA9IFtdLFxuICAgICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAvLyBJZiB0aGUgc3VwcG9ydCBpcyBPSyBzaW1wbHkgY2xvbmUgYW5kIHJldHVyblxuICAgICAgICBpZiAoc3VwcG9ydCkge1xuICAgICAgICAgICAgdGVtcGxhdGUgID0gdGhpcy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICB0ZW1wbGF0ZXMgPSB0ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZW1wbGF0ZVwiKTtcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBjbG9uZSBtZXRob2QgZm9yIGVhY2ggbmVzdGVkIDx0ZW1wbGF0ZT4gZWxlbWVudFxuICAgICAgICAgICAgZm9yICg7IHRlbXBsYXRlc1tpXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVzW2ldLmNsb25lID0gY2xvbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBuZXN0ZWQgPHRlbXBsYXRlPiB0byByZXRyaWV2ZSB0aGUgY29udGVudCBwcm9wZXJ0eVxuICAgICAgICBmb3IgKDsgdGVtcGxhdGVzW2ldOyBpKyspIHtcbiAgICAgICAgICAgIGZyYWdtZW50cy5wdXNoKHRlbXBsYXRlc1tpXS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdywgY2xvbmUgdGhlIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgIHRlbXBsYXRlID0gdGhpcy5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgLy8gTWFrZXMgc3VyZSB0aGUgY2xvbmUgaGF2ZSBhIFwiY29udGVudFwiIGFuZCBcImNsb25lXCIgcHJvcGVydGllc1xuICAgICAgICB0ZW1wbGF0ZS5jb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICB0ZW1wbGF0ZS5jbG9uZSAgID0gY2xvbmU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlIHRoZSBuZXN0ZWQgPHRlbXBsYXRlPiBvbmNlIGFnYWluXG4gICAgICAgICAqIFNpbmNlIHdlIGp1c3QgY2xvbmVkIHRoZSBkb2N1bWVudCBmcmFnbWVudCxcbiAgICAgICAgICogdGhlIGNvbnRlbnQncyBwcm9wZXJ0eSBvZiB0aGUgbmVzdGVkIDx0ZW1wbGF0ZT4gbWlnaHQgYmUgdW5kZWZpbmVkXG4gICAgICAgICAqIFdlIGhhdmUgdG8gcmUtc2V0IGl0IHVzaW5nIHRoZSBmcmFnbWVudCBhcnJheSB3ZSBwcmV2aW91c2x5IGdvdFxuICAgICAgICAgKi9cbiAgICAgICAgdGVtcGxhdGVzID0gdGVtcGxhdGUucXVlcnlTZWxlY3RvckFsbChcInRlbXBsYXRlXCIpO1xuXG4gICAgICAgIC8vIExvb3AgdG8gc2V0IHRoZSBjb250ZW50IHByb3BlcnR5IG9mIGVhY2ggbmVzdGVkIHRlbXBsYXRlXG4gICAgICAgIGZvciAoaSA9IDA7IHRlbXBsYXRlc1tpXTsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZXNbaV0uY29udGVudCA9IGZyYWdtZW50c1tpXTtcbiAgICAgICAgICAgIHRlbXBsYXRlc1tpXS5jbG9uZSAgID0gY2xvbmU7IC8vIE1ha2VzIHN1cmUgdG8gc2V0IHRoZSBjbG9uZSBtZXRob2QgYXMgd2VsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIHZhclxuICAgICAgICB0ZW1wbGF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGVtcGxhdGVcIiksXG4gICAgICAgIHRlbXBsYXRlLCBpID0gMDtcblxuICAgIC8vIFBvbGx1dGUgdGhlIERPTSB3aXRoIGEgXCJjbG9uZVwiIG1ldGhvZCBvbiBlYWNoIDx0ZW1wbGF0ZT4gZWxlbWVudFxuICAgIHdoaWxlICgodGVtcGxhdGUgPSB0ZW1wbGF0ZXNbaSsrXSkpIHtcbiAgICAgICAgdGVtcGxhdGUuY2xvbmUgPSBjbG9uZTtcbiAgICB9XG59KCkpOyJdfQ==

"use strict";

/**
 * Template7 1.1.4
 * Mobile-first JavaScript template engine
 * 
 * http://www.idangero.us/template7/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 17, 2016
 */
window.Template7 = function () {
  "use strict";
  function e(e) {
    return "[object Array]" === Object.prototype.toString.apply(e);
  }function t(e) {
    return "function" == typeof e;
  }function r(e) {
    return "undefined" != typeof window && window.escape ? window.escape(e) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }function n(e) {
    var t,
        r,
        n,
        i = e.replace(/[{}#}]/g, "").split(" "),
        o = [];for (r = 0; r < i.length; r++) {
      var p,
          s,
          f = i[r];if (0 === r) o.push(f);else if (0 === f.indexOf('"') || 0 === f.indexOf("'")) {
        if (p = 0 === f.indexOf('"') ? l : a, s = 0 === f.indexOf('"') ? '"' : "'", 2 === f.match(p).length) o.push(f);else {
          for (t = 0, n = r + 1; n < i.length; n++) {
            if (f += " " + i[n], i[n].indexOf(s) >= 0) {
              t = n, o.push(f);break;
            }
          }t && (r = t);
        }
      } else if (f.indexOf("=") > 0) {
        var c = f.split("="),
            u = c[0],
            h = c[1];if (p || (p = 0 === h.indexOf('"') ? l : a, s = 0 === h.indexOf('"') ? '"' : "'"), 2 !== h.match(p).length) {
          for (t = 0, n = r + 1; n < i.length; n++) {
            if (h += " " + i[n], i[n].indexOf(s) >= 0) {
              t = n;break;
            }
          }t && (r = t);
        }var d = [u, h.replace(p, "")];o.push(d);
      } else o.push(f);
    }return o;
  }function i(t) {
    var r,
        i,
        a = [];if (!t) return [];var l = t.split(/({{[^{^}]*}})/);for (r = 0; r < l.length; r++) {
      var o = l[r];if ("" !== o) if (o.indexOf("{{") < 0) a.push({ type: "plain", content: o });else {
        if (o.indexOf("{/") >= 0) continue;if (o.indexOf("{#") < 0 && o.indexOf(" ") < 0 && o.indexOf("else") < 0) {
          a.push({ type: "variable", contextName: o.replace(/[{}]/g, "") });continue;
        }var p = n(o),
            s = p[0],
            f = ">" === s,
            c = [],
            u = {};for (i = 1; i < p.length; i++) {
          var h = p[i];e(h) ? u[h[0]] = "false" !== h[1] && h[1] : c.push(h);
        }if (o.indexOf("{#") >= 0) {
          var d,
              v = "",
              g = "",
              x = 0,
              m = !1,
              y = !1,
              O = 0;for (i = r + 1; i < l.length; i++) {
            if (l[i].indexOf("{{#") >= 0 && O++, l[i].indexOf("{{/") >= 0 && O--, l[i].indexOf("{{#" + s) >= 0) v += l[i], y && (g += l[i]), x++;else if (l[i].indexOf("{{/" + s) >= 0) {
              if (!(x > 0)) {
                d = i, m = !0;break;
              }x--, v += l[i], y && (g += l[i]);
            } else l[i].indexOf("else") >= 0 && 0 === O ? y = !0 : (y || (v += l[i]), y && (g += l[i]));
          }m && (d && (r = d), a.push({ type: "helper", helperName: s, contextName: c, content: v, inverseContent: g, hash: u }));
        } else o.indexOf(" ") > 0 && (f && (s = "_partial", c[0] && (c[0] = '"' + c[0].replace(/"|'/g, "") + '"')), a.push({ type: "helper", helperName: s, contextName: c, hash: u }));
      }
    }return a;
  }var a = new RegExp("'", "g"),
      l = new RegExp('"', "g"),
      o = function o(e, t) {
    function r(e, t) {
      return e.content ? o(e.content, t) : function () {
        return "";
      };
    }function n(e, t) {
      return e.inverseContent ? o(e.inverseContent, t) : function () {
        return "";
      };
    }function a(e, t) {
      var r,
          n,
          i = 0;if (0 === e.indexOf("../")) {
        i = e.split("../").length - 1;var a = t.split("_")[1] - i;t = "ctx_" + (a >= 1 ? a : 1), n = e.split("../")[i].split(".");
      } else 0 === e.indexOf("@global") ? (t = "Template7.global", n = e.split("@global.")[1].split(".")) : 0 === e.indexOf("@root") ? (t = "root", n = e.split("@root.")[1].split(".")) : n = e.split(".");r = t;for (var l = 0; l < n.length; l++) {
        var o = n[l];0 === o.indexOf("@") ? l > 0 ? r += "[(data && data." + o.replace("@", "") + ")]" : r = "(data && data." + e.replace("@", "") + ")" : isFinite(o) ? r += "[" + o + "]" : "this" === o || o.indexOf("this.") >= 0 || o.indexOf("this[") >= 0 || o.indexOf("this(") >= 0 ? r = o.replace("this", t) : r += "." + o;
      }return r;
    }function l(e, t) {
      for (var r = [], n = 0; n < e.length; n++) {
        /^['"]/.test(e[n]) ? r.push(e[n]) : /^(true|false|\d+)$/.test(e[n]) ? r.push(e[n]) : r.push(a(e[n], t));
      }return r.join(", ");
    }function o(e, t) {
      if (t = t || 1, e = e || p.template, "string" != typeof e) throw new Error("Template7: Template must be a string");var o = i(e);if (0 === o.length) return function () {
        return "";
      };var s = "ctx_" + t,
          f = "";f += 1 === t ? "(function (" + s + ", data, root) {\n" : "(function (" + s + ", data) {\n", 1 === t && (f += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", f += "function isFunction(func){return (typeof func === 'function');}\n", f += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n', f += "root = root || ctx_1 || {};\n"), f += "var r = '';\n";var c;for (c = 0; c < o.length; c++) {
        var u = o[c];if ("plain" !== u.type) {
          var h, d;if ("variable" === u.type && (h = a(u.contextName, s), f += "r += c(" + h + ", " + s + ");"), "helper" === u.type) if (u.helperName in p.helpers) d = l(u.contextName, s), f += "r += (Template7.helpers." + u.helperName + ").call(" + s + ", " + (d && d + ", ") + "{hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + r(u, t + 1) + ", inverse: " + n(u, t + 1) + ", root: root});";else {
            if (u.contextName.length > 0) throw new Error('Template7: Missing helper: "' + u.helperName + '"');h = a(u.helperName, s), f += "if (" + h + ") {", f += "if (isArray(" + h + ")) {", f += "r += (Template7.helpers.each).call(" + s + ", " + h + ", {hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + r(u, t + 1) + ", inverse: " + n(u, t + 1) + ", root: root});", f += "}else {", f += "r += (Template7.helpers.with).call(" + s + ", " + h + ", {hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + r(u, t + 1) + ", inverse: " + n(u, t + 1) + ", root: root});", f += "}}";
          }
        } else f += "r +='" + u.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';";
      }return f += "\nreturn r;})", eval.call(window, f);
    }var p = this;p.template = e, p.compile = function (e) {
      return p.compiled || (p.compiled = o(e)), p.compiled;
    };
  };o.prototype = { options: {}, partials: {}, helpers: { _partial: function _partial(e, t) {
        var r = o.prototype.partials[e];if (!r || r && !r.template) return "";r.compiled || (r.compiled = new o(r.template).compile());var n = this;for (var i in t.hash) {
          n[i] = t.hash[i];
        }return r.compiled(n, t.data, t.root);
      }, escape: function escape(e, t) {
        if ("string" != typeof e) throw new Error('Template7: Passed context to "escape" helper should be a string');return r(e);
      }, if: function _if(e, r) {
        return t(e) && (e = e.call(this)), e ? r.fn(this, r.data) : r.inverse(this, r.data);
      }, unless: function unless(e, r) {
        return t(e) && (e = e.call(this)), e ? r.inverse(this, r.data) : r.fn(this, r.data);
      }, each: function each(r, n) {
        var i = "",
            a = 0;if (t(r) && (r = r.call(this)), e(r)) {
          for (n.hash.reverse && (r = r.reverse()), a = 0; a < r.length; a++) {
            i += n.fn(r[a], { first: 0 === a, last: a === r.length - 1, index: a });
          }n.hash.reverse && (r = r.reverse());
        } else for (var l in r) {
          a++, i += n.fn(r[l], { key: l });
        }return a > 0 ? i : n.inverse(this);
      }, with: function _with(e, r) {
        return t(e) && (e = e.call(this)), r.fn(e);
      }, join: function join(e, r) {
        return t(e) && (e = e.call(this)), e.join(r.hash.delimiter || r.hash.delimeter);
      }, js: function js(e, t) {
        var r;return r = e.indexOf("return") >= 0 ? "(function(){" + e + "})" : "(function(){return (" + e + ")})", eval.call(this, r).call(this);
      }, js_compare: function js_compare(e, t) {
        var r;r = e.indexOf("return") >= 0 ? "(function(){" + e + "})" : "(function(){return (" + e + ")})";var n = eval.call(this, r).call(this);return n ? t.fn(this, t.data) : t.inverse(this, t.data);
      } } };var p = function p(e, t) {
    if (2 === arguments.length) {
      var r = new o(e),
          n = r.compile()(t);return r = null, n;
    }return new o(e);
  };return p.registerHelper = function (e, t) {
    o.prototype.helpers[e] = t;
  }, p.unregisterHelper = function (e) {
    o.prototype.helpers[e] = void 0, delete o.prototype.helpers[e];
  }, p.registerPartial = function (e, t) {
    o.prototype.partials[e] = { template: t };
  }, p.unregisterPartial = function (e, t) {
    o.prototype.partials[e] && (o.prototype.partials[e] = void 0, delete o.prototype.partials[e]);
  }, p.compile = function (e, t) {
    var r = new o(e, t);return r.compile();
  }, p.options = o.prototype.options, p.helpers = o.prototype.helpers, p.partials = o.prototype.partials, p;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90ZW1wbGF0ZTcubWluLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIlRlbXBsYXRlNyIsImUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImFwcGx5IiwidCIsInIiLCJlc2NhcGUiLCJyZXBsYWNlIiwibiIsImkiLCJzcGxpdCIsIm8iLCJsZW5ndGgiLCJwIiwicyIsImYiLCJwdXNoIiwiaW5kZXhPZiIsImwiLCJhIiwibWF0Y2giLCJjIiwidSIsImgiLCJkIiwidHlwZSIsImNvbnRlbnQiLCJjb250ZXh0TmFtZSIsInYiLCJnIiwieCIsIm0iLCJ5IiwiTyIsImhlbHBlck5hbWUiLCJpbnZlcnNlQ29udGVudCIsImhhc2giLCJSZWdFeHAiLCJpc0Zpbml0ZSIsInRlc3QiLCJqb2luIiwidGVtcGxhdGUiLCJFcnJvciIsImhlbHBlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiZXZhbCIsImNhbGwiLCJjb21waWxlIiwiY29tcGlsZWQiLCJvcHRpb25zIiwicGFydGlhbHMiLCJfcGFydGlhbCIsImRhdGEiLCJyb290IiwiaWYiLCJmbiIsImludmVyc2UiLCJ1bmxlc3MiLCJlYWNoIiwicmV2ZXJzZSIsImZpcnN0IiwibGFzdCIsImluZGV4Iiwia2V5Iiwid2l0aCIsImRlbGltaXRlciIsImRlbGltZXRlciIsImpzIiwianNfY29tcGFyZSIsImFyZ3VtZW50cyIsInJlZ2lzdGVySGVscGVyIiwidW5yZWdpc3RlckhlbHBlciIsInJlZ2lzdGVyUGFydGlhbCIsInVucmVnaXN0ZXJQYXJ0aWFsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBQSxPQUFPQyxTQUFQLEdBQWlCLFlBQVU7QUFBQztBQUFhLFdBQVNDLENBQVQsQ0FBV0EsQ0FBWCxFQUFhO0FBQUMsV0FBTSxxQkFBbUJDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxLQUExQixDQUFnQ0osQ0FBaEMsQ0FBekI7QUFBNEQsWUFBU0ssQ0FBVCxDQUFXTCxDQUFY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QVdLLENBQVgsRUFBYTtBQUFDTyxNQUFFVixTQUFGLENBQVlrRCxRQUFaLENBQXFCcEQsQ0FBckIsSUFBd0IsRUFBQzBDLFVBQVNyQyxDQUFWLEVBQXhCO0FBQXFDLEdBQTFOLEVBQTJOUyxFQUFFNkQsaUJBQUYsR0FBb0IsVUFBUzNFLENBQVQsRUFBV0ssQ0FBWCxFQUFhO0FBQUNPLE1BQUVWLFNBQUYsQ0FBWWtELFFBQVosQ0FBcUJwRCxDQUFyQixNQUEwQlksRUFBRVYsU0FBRixDQUFZa0QsUUFBWixDQUFxQnBELENBQXJCLElBQXdCLEtBQUssQ0FBN0IsRUFBK0IsT0FBT1ksRUFBRVYsU0FBRixDQUFZa0QsUUFBWixDQUFxQnBELENBQXJCLENBQWhFO0FBQXlGLEdBQXRWLEVBQXVWYyxFQUFFbUMsT0FBRixHQUFVLFVBQVNqRCxDQUFULEVBQVdLLENBQVgsRUFBYTtBQUFDLFFBQUlDLElBQUUsSUFBSU0sQ0FBSixDQUFNWixDQUFOLEVBQVFLLENBQVIsQ0FBTixDQUFpQixPQUFPQyxFQUFFMkMsT0FBRixFQUFQO0FBQW1CLEdBQW5aLEVBQW9abkMsRUFBRXFDLE9BQUYsR0FBVXZDLEVBQUVWLFNBQUYsQ0FBWWlELE9BQTFhLEVBQWtickMsRUFBRThCLE9BQUYsR0FBVWhDLEVBQUVWLFNBQUYsQ0FBWTBDLE9BQXhjLEVBQWdkOUIsRUFBRXNDLFFBQUYsR0FBV3hDLEVBQUVWLFNBQUYsQ0FBWWtELFFBQXZlLEVBQWdmdEMsQ0FBdmY7QUFBeWYsQ0FBam5OLEVBQWpCIiwiZmlsZSI6Il90ZW1wbGF0ZTcubWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZW1wbGF0ZTcgMS4xLjRcbiAqIE1vYmlsZS1maXJzdCBKYXZhU2NyaXB0IHRlbXBsYXRlIGVuZ2luZVxuICogXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL3RlbXBsYXRlNy9cbiAqIFxuICogQ29weXJpZ2h0IDIwMTYsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKiBUaGUgaURhbmdlcm8udXNcbiAqIGh0dHA6Ly93d3cuaWRhbmdlcm8udXMvXG4gKiBcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICogXG4gKiBSZWxlYXNlZCBvbjogRGVjZW1iZXIgMTcsIDIwMTZcbiAqL1xud2luZG93LlRlbXBsYXRlNz1mdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShlKX1mdW5jdGlvbiB0KGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9ZnVuY3Rpb24gcihlKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuZXNjYXBlP3dpbmRvdy5lc2NhcGUoZSk6ZS5yZXBsYWNlKC8mL2csXCImYW1wO1wiKS5yZXBsYWNlKC88L2csXCImbHQ7XCIpLnJlcGxhY2UoLz4vZyxcIiZndDtcIikucmVwbGFjZSgvXCIvZyxcIiZxdW90O1wiKX1mdW5jdGlvbiBuKGUpe3ZhciB0LHIsbixpPWUucmVwbGFjZSgvW3t9I31dL2csXCJcIikuc3BsaXQoXCIgXCIpLG89W107Zm9yKHI9MDtyPGkubGVuZ3RoO3IrKyl7dmFyIHAscyxmPWlbcl07aWYoMD09PXIpby5wdXNoKGYpO2Vsc2UgaWYoMD09PWYuaW5kZXhPZignXCInKXx8MD09PWYuaW5kZXhPZihcIidcIikpaWYocD0wPT09Zi5pbmRleE9mKCdcIicpP2w6YSxzPTA9PT1mLmluZGV4T2YoJ1wiJyk/J1wiJzpcIidcIiwyPT09Zi5tYXRjaChwKS5sZW5ndGgpby5wdXNoKGYpO2Vsc2V7Zm9yKHQ9MCxuPXIrMTtuPGkubGVuZ3RoO24rKylpZihmKz1cIiBcIitpW25dLGlbbl0uaW5kZXhPZihzKT49MCl7dD1uLG8ucHVzaChmKTticmVha310JiYocj10KX1lbHNlIGlmKGYuaW5kZXhPZihcIj1cIik+MCl7dmFyIGM9Zi5zcGxpdChcIj1cIiksdT1jWzBdLGg9Y1sxXTtpZihwfHwocD0wPT09aC5pbmRleE9mKCdcIicpP2w6YSxzPTA9PT1oLmluZGV4T2YoJ1wiJyk/J1wiJzpcIidcIiksMiE9PWgubWF0Y2gocCkubGVuZ3RoKXtmb3IodD0wLG49cisxO248aS5sZW5ndGg7bisrKWlmKGgrPVwiIFwiK2lbbl0saVtuXS5pbmRleE9mKHMpPj0wKXt0PW47YnJlYWt9dCYmKHI9dCl9dmFyIGQ9W3UsaC5yZXBsYWNlKHAsXCJcIildO28ucHVzaChkKX1lbHNlIG8ucHVzaChmKX1yZXR1cm4gb31mdW5jdGlvbiBpKHQpe3ZhciByLGksYT1bXTtpZighdClyZXR1cm5bXTt2YXIgbD10LnNwbGl0KC8oe3tbXntefV0qfX0pLyk7Zm9yKHI9MDtyPGwubGVuZ3RoO3IrKyl7dmFyIG89bFtyXTtpZihcIlwiIT09bylpZihvLmluZGV4T2YoXCJ7e1wiKTwwKWEucHVzaCh7dHlwZTpcInBsYWluXCIsY29udGVudDpvfSk7ZWxzZXtpZihvLmluZGV4T2YoXCJ7L1wiKT49MCljb250aW51ZTtpZihvLmluZGV4T2YoXCJ7I1wiKTwwJiZvLmluZGV4T2YoXCIgXCIpPDAmJm8uaW5kZXhPZihcImVsc2VcIik8MCl7YS5wdXNoKHt0eXBlOlwidmFyaWFibGVcIixjb250ZXh0TmFtZTpvLnJlcGxhY2UoL1t7fV0vZyxcIlwiKX0pO2NvbnRpbnVlfXZhciBwPW4obykscz1wWzBdLGY9XCI+XCI9PT1zLGM9W10sdT17fTtmb3IoaT0xO2k8cC5sZW5ndGg7aSsrKXt2YXIgaD1wW2ldO2UoaCk/dVtoWzBdXT1cImZhbHNlXCIhPT1oWzFdJiZoWzFdOmMucHVzaChoKX1pZihvLmluZGV4T2YoXCJ7I1wiKT49MCl7dmFyIGQsdj1cIlwiLGc9XCJcIix4PTAsbT0hMSx5PSExLE89MDtmb3IoaT1yKzE7aTxsLmxlbmd0aDtpKyspaWYobFtpXS5pbmRleE9mKFwie3sjXCIpPj0wJiZPKyssbFtpXS5pbmRleE9mKFwie3svXCIpPj0wJiZPLS0sbFtpXS5pbmRleE9mKFwie3sjXCIrcyk+PTApdis9bFtpXSx5JiYoZys9bFtpXSkseCsrO2Vsc2UgaWYobFtpXS5pbmRleE9mKFwie3svXCIrcyk+PTApe2lmKCEoeD4wKSl7ZD1pLG09ITA7YnJlYWt9eC0tLHYrPWxbaV0seSYmKGcrPWxbaV0pfWVsc2UgbFtpXS5pbmRleE9mKFwiZWxzZVwiKT49MCYmMD09PU8/eT0hMDooeXx8KHYrPWxbaV0pLHkmJihnKz1sW2ldKSk7bSYmKGQmJihyPWQpLGEucHVzaCh7dHlwZTpcImhlbHBlclwiLGhlbHBlck5hbWU6cyxjb250ZXh0TmFtZTpjLGNvbnRlbnQ6dixpbnZlcnNlQ29udGVudDpnLGhhc2g6dX0pKX1lbHNlIG8uaW5kZXhPZihcIiBcIik+MCYmKGYmJihzPVwiX3BhcnRpYWxcIixjWzBdJiYoY1swXT0nXCInK2NbMF0ucmVwbGFjZSgvXCJ8Jy9nLFwiXCIpKydcIicpKSxhLnB1c2goe3R5cGU6XCJoZWxwZXJcIixoZWxwZXJOYW1lOnMsY29udGV4dE5hbWU6YyxoYXNoOnV9KSl9fXJldHVybiBhfXZhciBhPW5ldyBSZWdFeHAoXCInXCIsXCJnXCIpLGw9bmV3IFJlZ0V4cCgnXCInLFwiZ1wiKSxvPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gcihlLHQpe3JldHVybiBlLmNvbnRlbnQ/byhlLmNvbnRlbnQsdCk6ZnVuY3Rpb24oKXtyZXR1cm5cIlwifX1mdW5jdGlvbiBuKGUsdCl7cmV0dXJuIGUuaW52ZXJzZUNvbnRlbnQ/byhlLmludmVyc2VDb250ZW50LHQpOmZ1bmN0aW9uKCl7cmV0dXJuXCJcIn19ZnVuY3Rpb24gYShlLHQpe3ZhciByLG4saT0wO2lmKDA9PT1lLmluZGV4T2YoXCIuLi9cIikpe2k9ZS5zcGxpdChcIi4uL1wiKS5sZW5ndGgtMTt2YXIgYT10LnNwbGl0KFwiX1wiKVsxXS1pO3Q9XCJjdHhfXCIrKGE+PTE/YToxKSxuPWUuc3BsaXQoXCIuLi9cIilbaV0uc3BsaXQoXCIuXCIpfWVsc2UgMD09PWUuaW5kZXhPZihcIkBnbG9iYWxcIik/KHQ9XCJUZW1wbGF0ZTcuZ2xvYmFsXCIsbj1lLnNwbGl0KFwiQGdsb2JhbC5cIilbMV0uc3BsaXQoXCIuXCIpKTowPT09ZS5pbmRleE9mKFwiQHJvb3RcIik/KHQ9XCJyb290XCIsbj1lLnNwbGl0KFwiQHJvb3QuXCIpWzFdLnNwbGl0KFwiLlwiKSk6bj1lLnNwbGl0KFwiLlwiKTtyPXQ7Zm9yKHZhciBsPTA7bDxuLmxlbmd0aDtsKyspe3ZhciBvPW5bbF07MD09PW8uaW5kZXhPZihcIkBcIik/bD4wP3IrPVwiWyhkYXRhICYmIGRhdGEuXCIrby5yZXBsYWNlKFwiQFwiLFwiXCIpK1wiKV1cIjpyPVwiKGRhdGEgJiYgZGF0YS5cIitlLnJlcGxhY2UoXCJAXCIsXCJcIikrXCIpXCI6aXNGaW5pdGUobyk/cis9XCJbXCIrbytcIl1cIjpcInRoaXNcIj09PW98fG8uaW5kZXhPZihcInRoaXMuXCIpPj0wfHxvLmluZGV4T2YoXCJ0aGlzW1wiKT49MHx8by5pbmRleE9mKFwidGhpcyhcIik+PTA/cj1vLnJlcGxhY2UoXCJ0aGlzXCIsdCk6cis9XCIuXCIrb31yZXR1cm4gcn1mdW5jdGlvbiBsKGUsdCl7Zm9yKHZhciByPVtdLG49MDtuPGUubGVuZ3RoO24rKykvXlsnXCJdLy50ZXN0KGVbbl0pP3IucHVzaChlW25dKTovXih0cnVlfGZhbHNlfFxcZCspJC8udGVzdChlW25dKT9yLnB1c2goZVtuXSk6ci5wdXNoKGEoZVtuXSx0KSk7cmV0dXJuIHIuam9pbihcIiwgXCIpfWZ1bmN0aW9uIG8oZSx0KXtpZih0PXR8fDEsZT1lfHxwLnRlbXBsYXRlLFwic3RyaW5nXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIlRlbXBsYXRlNzogVGVtcGxhdGUgbXVzdCBiZSBhIHN0cmluZ1wiKTt2YXIgbz1pKGUpO2lmKDA9PT1vLmxlbmd0aClyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm5cIlwifTt2YXIgcz1cImN0eF9cIit0LGY9XCJcIjtmKz0xPT09dD9cIihmdW5jdGlvbiAoXCIrcytcIiwgZGF0YSwgcm9vdCkge1xcblwiOlwiKGZ1bmN0aW9uIChcIitzK1wiLCBkYXRhKSB7XFxuXCIsMT09PXQmJihmKz1cImZ1bmN0aW9uIGlzQXJyYXkoYXJyKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShhcnIpID09PSAnW29iamVjdCBBcnJheV0nO31cXG5cIixmKz1cImZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYyl7cmV0dXJuICh0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyk7fVxcblwiLGYrPSdmdW5jdGlvbiBjKHZhbCwgY3R4KSB7aWYgKHR5cGVvZiB2YWwgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsICE9PSBudWxsKSB7aWYgKGlzRnVuY3Rpb24odmFsKSkge3JldHVybiB2YWwuY2FsbChjdHgpO30gZWxzZSByZXR1cm4gdmFsO30gZWxzZSByZXR1cm4gXCJcIjt9XFxuJyxmKz1cInJvb3QgPSByb290IHx8IGN0eF8xIHx8IHt9O1xcblwiKSxmKz1cInZhciByID0gJyc7XFxuXCI7dmFyIGM7Zm9yKGM9MDtjPG8ubGVuZ3RoO2MrKyl7dmFyIHU9b1tjXTtpZihcInBsYWluXCIhPT11LnR5cGUpe3ZhciBoLGQ7aWYoXCJ2YXJpYWJsZVwiPT09dS50eXBlJiYoaD1hKHUuY29udGV4dE5hbWUscyksZis9XCJyICs9IGMoXCIraCtcIiwgXCIrcytcIik7XCIpLFwiaGVscGVyXCI9PT11LnR5cGUpaWYodS5oZWxwZXJOYW1lIGluIHAuaGVscGVycylkPWwodS5jb250ZXh0TmFtZSxzKSxmKz1cInIgKz0gKFRlbXBsYXRlNy5oZWxwZXJzLlwiK3UuaGVscGVyTmFtZStcIikuY2FsbChcIitzK1wiLCBcIisoZCYmZCtcIiwgXCIpK1wie2hhc2g6XCIrSlNPTi5zdHJpbmdpZnkodS5oYXNoKStcIiwgZGF0YTogZGF0YSB8fCB7fSwgZm46IFwiK3IodSx0KzEpK1wiLCBpbnZlcnNlOiBcIituKHUsdCsxKStcIiwgcm9vdDogcm9vdH0pO1wiO2Vsc2V7aWYodS5jb250ZXh0TmFtZS5sZW5ndGg+MCl0aHJvdyBuZXcgRXJyb3IoJ1RlbXBsYXRlNzogTWlzc2luZyBoZWxwZXI6IFwiJyt1LmhlbHBlck5hbWUrJ1wiJyk7aD1hKHUuaGVscGVyTmFtZSxzKSxmKz1cImlmIChcIitoK1wiKSB7XCIsZis9XCJpZiAoaXNBcnJheShcIitoK1wiKSkge1wiLGYrPVwiciArPSAoVGVtcGxhdGU3LmhlbHBlcnMuZWFjaCkuY2FsbChcIitzK1wiLCBcIitoK1wiLCB7aGFzaDpcIitKU09OLnN0cmluZ2lmeSh1Lmhhc2gpK1wiLCBkYXRhOiBkYXRhIHx8IHt9LCBmbjogXCIrcih1LHQrMSkrXCIsIGludmVyc2U6IFwiK24odSx0KzEpK1wiLCByb290OiByb290fSk7XCIsZis9XCJ9ZWxzZSB7XCIsZis9XCJyICs9IChUZW1wbGF0ZTcuaGVscGVycy53aXRoKS5jYWxsKFwiK3MrXCIsIFwiK2grXCIsIHtoYXNoOlwiK0pTT04uc3RyaW5naWZ5KHUuaGFzaCkrXCIsIGRhdGE6IGRhdGEgfHwge30sIGZuOiBcIityKHUsdCsxKStcIiwgaW52ZXJzZTogXCIrbih1LHQrMSkrXCIsIHJvb3Q6IHJvb3R9KTtcIixmKz1cIn19XCJ9fWVsc2UgZis9XCJyICs9J1wiK3UuY29udGVudC5yZXBsYWNlKC9cXHIvZyxcIlxcXFxyXCIpLnJlcGxhY2UoL1xcbi9nLFwiXFxcXG5cIikucmVwbGFjZSgvJy9nLFwiXFxcXCdcIikrXCInO1wifXJldHVybiBmKz1cIlxcbnJldHVybiByO30pXCIsZXZhbC5jYWxsKHdpbmRvdyxmKX12YXIgcD10aGlzO3AudGVtcGxhdGU9ZSxwLmNvbXBpbGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHAuY29tcGlsZWR8fChwLmNvbXBpbGVkPW8oZSkpLHAuY29tcGlsZWR9fTtvLnByb3RvdHlwZT17b3B0aW9uczp7fSxwYXJ0aWFsczp7fSxoZWxwZXJzOntfcGFydGlhbDpmdW5jdGlvbihlLHQpe3ZhciByPW8ucHJvdG90eXBlLnBhcnRpYWxzW2VdO2lmKCFyfHxyJiYhci50ZW1wbGF0ZSlyZXR1cm5cIlwiO3IuY29tcGlsZWR8fChyLmNvbXBpbGVkPW5ldyBvKHIudGVtcGxhdGUpLmNvbXBpbGUoKSk7dmFyIG49dGhpcztmb3IodmFyIGkgaW4gdC5oYXNoKW5baV09dC5oYXNoW2ldO3JldHVybiByLmNvbXBpbGVkKG4sdC5kYXRhLHQucm9vdCl9LGVzY2FwZTpmdW5jdGlvbihlLHQpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcignVGVtcGxhdGU3OiBQYXNzZWQgY29udGV4dCB0byBcImVzY2FwZVwiIGhlbHBlciBzaG91bGQgYmUgYSBzdHJpbmcnKTtyZXR1cm4gcihlKX0saWY6ZnVuY3Rpb24oZSxyKXtyZXR1cm4gdChlKSYmKGU9ZS5jYWxsKHRoaXMpKSxlP3IuZm4odGhpcyxyLmRhdGEpOnIuaW52ZXJzZSh0aGlzLHIuZGF0YSl9LHVubGVzczpmdW5jdGlvbihlLHIpe3JldHVybiB0KGUpJiYoZT1lLmNhbGwodGhpcykpLGU/ci5pbnZlcnNlKHRoaXMsci5kYXRhKTpyLmZuKHRoaXMsci5kYXRhKX0sZWFjaDpmdW5jdGlvbihyLG4pe3ZhciBpPVwiXCIsYT0wO2lmKHQocikmJihyPXIuY2FsbCh0aGlzKSksZShyKSl7Zm9yKG4uaGFzaC5yZXZlcnNlJiYocj1yLnJldmVyc2UoKSksYT0wO2E8ci5sZW5ndGg7YSsrKWkrPW4uZm4oclthXSx7Zmlyc3Q6MD09PWEsbGFzdDphPT09ci5sZW5ndGgtMSxpbmRleDphfSk7bi5oYXNoLnJldmVyc2UmJihyPXIucmV2ZXJzZSgpKX1lbHNlIGZvcih2YXIgbCBpbiByKWErKyxpKz1uLmZuKHJbbF0se2tleTpsfSk7cmV0dXJuIGE+MD9pOm4uaW52ZXJzZSh0aGlzKX0sd2l0aDpmdW5jdGlvbihlLHIpe3JldHVybiB0KGUpJiYoZT1lLmNhbGwodGhpcykpLHIuZm4oZSl9LGpvaW46ZnVuY3Rpb24oZSxyKXtyZXR1cm4gdChlKSYmKGU9ZS5jYWxsKHRoaXMpKSxlLmpvaW4oci5oYXNoLmRlbGltaXRlcnx8ci5oYXNoLmRlbGltZXRlcil9LGpzOmZ1bmN0aW9uKGUsdCl7dmFyIHI7cmV0dXJuIHI9ZS5pbmRleE9mKFwicmV0dXJuXCIpPj0wP1wiKGZ1bmN0aW9uKCl7XCIrZStcIn0pXCI6XCIoZnVuY3Rpb24oKXtyZXR1cm4gKFwiK2UrXCIpfSlcIixldmFsLmNhbGwodGhpcyxyKS5jYWxsKHRoaXMpfSxqc19jb21wYXJlOmZ1bmN0aW9uKGUsdCl7dmFyIHI7cj1lLmluZGV4T2YoXCJyZXR1cm5cIik+PTA/XCIoZnVuY3Rpb24oKXtcIitlK1wifSlcIjpcIihmdW5jdGlvbigpe3JldHVybiAoXCIrZStcIil9KVwiO3ZhciBuPWV2YWwuY2FsbCh0aGlzLHIpLmNhbGwodGhpcyk7cmV0dXJuIG4/dC5mbih0aGlzLHQuZGF0YSk6dC5pbnZlcnNlKHRoaXMsdC5kYXRhKX19fTt2YXIgcD1mdW5jdGlvbihlLHQpe2lmKDI9PT1hcmd1bWVudHMubGVuZ3RoKXt2YXIgcj1uZXcgbyhlKSxuPXIuY29tcGlsZSgpKHQpO3JldHVybiByPW51bGwsbn1yZXR1cm4gbmV3IG8oZSl9O3JldHVybiBwLnJlZ2lzdGVySGVscGVyPWZ1bmN0aW9uKGUsdCl7by5wcm90b3R5cGUuaGVscGVyc1tlXT10fSxwLnVucmVnaXN0ZXJIZWxwZXI9ZnVuY3Rpb24oZSl7by5wcm90b3R5cGUuaGVscGVyc1tlXT12b2lkIDAsZGVsZXRlIG8ucHJvdG90eXBlLmhlbHBlcnNbZV19LHAucmVnaXN0ZXJQYXJ0aWFsPWZ1bmN0aW9uKGUsdCl7by5wcm90b3R5cGUucGFydGlhbHNbZV09e3RlbXBsYXRlOnR9fSxwLnVucmVnaXN0ZXJQYXJ0aWFsPWZ1bmN0aW9uKGUsdCl7by5wcm90b3R5cGUucGFydGlhbHNbZV0mJihvLnByb3RvdHlwZS5wYXJ0aWFsc1tlXT12b2lkIDAsZGVsZXRlIG8ucHJvdG90eXBlLnBhcnRpYWxzW2VdKX0scC5jb21waWxlPWZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IG8oZSx0KTtyZXR1cm4gci5jb21waWxlKCl9LHAub3B0aW9ucz1vLnByb3RvdHlwZS5vcHRpb25zLHAuaGVscGVycz1vLnByb3RvdHlwZS5oZWxwZXJzLHAucGFydGlhbHM9by5wcm90b3R5cGUucGFydGlhbHMscH0oKTtcbiJdfQ==
