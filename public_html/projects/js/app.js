'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var app = app || {};

(function (body) {
    "use strict";

    app = {

        _extend: function _extend(source, config) {
            if (typeof config !== 'undefined') {
                for (var x in config) {
                    source[x] = config[x];
                }
            }

            return source;
        },

        bind: function bind() {
            for (var _ in this) {
                if (_typeof(this[_]) == 'object' && typeof this[_].init !== 'undefined') {
                    if (typeof this[_].init == 'function') {
                        this[_].init();
                    }
                }
            }
        },

        init: function init() {
            this.bind();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fYXBwLmluaXQuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl9leHRlbmQiLCJzb3VyY2UiLCJjb25maWciLCJ4IiwiYmluZCIsIl8iLCJpbml0IiwiZG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxNQUFNQSxPQUFPLEVBQWpCOztBQUVBLENBQUMsVUFBU0MsSUFBVCxFQUFjO0FBQ1g7O0FBRUFELFVBQU07O0FBRUZFLGlCQUFTLGlCQUFTQyxNQUFULEVBQWlCQyxNQUFqQixFQUNUO0FBQ0ksZ0JBQUksT0FBT0EsTUFBUCxLQUFrQixXQUF0QixFQUNBO0FBQ0kscUJBQUssSUFBSUMsQ0FBVCxJQUFjRCxNQUFkLEVBQ0E7QUFDSUQsMkJBQU9FLENBQVAsSUFBWUQsT0FBT0MsQ0FBUCxDQUFaO0FBQ0g7QUFDSjs7QUFFRCxtQkFBT0YsTUFBUDtBQUNILFNBYkM7O0FBZUZHLGNBQU0sZ0JBQ047QUFDSSxpQkFBSSxJQUFJQyxDQUFSLElBQWEsSUFBYixFQUNBO0FBQ0ksb0JBQUksUUFBTyxLQUFLQSxDQUFMLENBQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBTyxLQUFLQSxDQUFMLEVBQVFDLElBQWYsS0FBeUIsV0FBNUQsRUFDQTtBQUNJLHdCQUFJLE9BQU8sS0FBS0QsQ0FBTCxFQUFRQyxJQUFmLElBQXdCLFVBQTVCLEVBQ0E7QUFDSSw2QkFBS0QsQ0FBTCxFQUFRQyxJQUFSO0FBQ0g7QUFDSjtBQUNKO0FBQ0osU0EzQkM7O0FBNkJGQSxjQUFNLGdCQUNOO0FBQ0ksaUJBQUtGLElBQUw7QUFDSDs7QUFoQ0MsS0FBTjtBQW9DSCxDQXZDRCxFQXVDR0csU0FBU1IsSUF2Q1oiLCJmaWxlIjoiX19hcHAuaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbihib2R5KXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFwcCA9IHtcblxuICAgICAgICBfZXh0ZW5kOiBmdW5jdGlvbihzb3VyY2UsIGNvbmZpZylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4gY29uZmlnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3hdID0gY29uZmlnW3hdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcih2YXIgXyBpbiB0aGlzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodGhpc1tfXSkgPT0gJ29iamVjdCcgJiYgdHlwZW9mKHRoaXNbX10uaW5pdCkgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzW19dLmluaXQpID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbX10uaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

'use strict';

var app = app || {};

(function (body) {
    "use strict";

    var _this_;

    app.filter = {

        bind: function bind() {
            var $grid = $('#projects-list');
            var $categories = $('#categories');

            $('body').on('click', '.j-filter', function (e) {
                e.preventDefault();

                if (!$(this).hasClass('is-current')) {
                    var href = $(this).attr('href');
                    var filter = href.replace('#group-', '');

                    $categories.find('.j-filter.is-current').removeClass('is-current');

                    $grid.find('.project-item').each(function () {
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

        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAuZmlsdGVyLmpzIl0sIm5hbWVzIjpbImFwcCIsImJvZHkiLCJfdGhpc18iLCJmaWx0ZXIiLCJiaW5kIiwiJGdyaWQiLCIkIiwiJGNhdGVnb3JpZXMiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhhc0NsYXNzIiwiaHJlZiIsImF0dHIiLCJyZXBsYWNlIiwiZmluZCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImNhdGVnb3JpZXMiLCJkYXRhIiwic3BsaXQiLCJpbmRleE9mIiwiYWRkQ2xhc3MiLCJpbml0IiwiY29uZmlnIiwiX2V4dGVuZCIsImRvY3VtZW50Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1BLE9BQU8sRUFBakI7O0FBRUEsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWDs7QUFFQSxRQUFJQyxNQUFKOztBQUVBRixRQUFJRyxNQUFKLEdBQWE7O0FBRVRDLGNBQU0sZ0JBQ047QUFDSSxnQkFBSUMsUUFBUUMsRUFBRSxnQkFBRixDQUFaO0FBQ0EsZ0JBQUlDLGNBQWNELEVBQUUsYUFBRixDQUFsQjs7QUFFQUEsY0FBRSxNQUFGLEVBQVVFLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DLFVBQVNDLENBQVQsRUFBVztBQUMxQ0Esa0JBQUVDLGNBQUY7O0FBRUEsb0JBQUksQ0FBQ0osRUFBRSxJQUFGLEVBQVFLLFFBQVIsQ0FBaUIsWUFBakIsQ0FBTCxFQUFxQztBQUNqQyx3QkFBSUMsT0FBT04sRUFBRSxJQUFGLEVBQVFPLElBQVIsQ0FBYSxNQUFiLENBQVg7QUFDQSx3QkFBSVYsU0FBU1MsS0FBS0UsT0FBTCxDQUFhLFNBQWIsRUFBd0IsRUFBeEIsQ0FBYjs7QUFFQVAsZ0NBQVlRLElBQVosQ0FBaUIsc0JBQWpCLEVBQXlDQyxXQUF6QyxDQUFxRCxZQUFyRDs7QUFFQVgsMEJBQU1VLElBQU4sQ0FBVyxlQUFYLEVBQTRCRSxJQUE1QixDQUFpQyxZQUFXO0FBQ3hDLDRCQUFJQyxhQUFhWixFQUFFLElBQUYsRUFBUWEsSUFBUixDQUFhLFVBQWIsRUFBeUJDLEtBQXpCLENBQStCLEdBQS9CLENBQWpCOztBQUVBLDRCQUFJRixXQUFXRyxPQUFYLENBQW1CbEIsTUFBbkIsS0FBOEIsQ0FBOUIsSUFBbUNBLFVBQVUsS0FBakQsRUFBd0Q7QUFDcERHLDhCQUFFLElBQUYsRUFBUVUsV0FBUixDQUFvQix1QkFBcEIsRUFBNkNNLFFBQTdDLENBQXNELHNCQUF0RDtBQUNILHlCQUZELE1BRU87QUFDSGhCLDhCQUFFLElBQUYsRUFBUVUsV0FBUixDQUFvQixzQkFBcEIsRUFBNENNLFFBQTVDLENBQXFELHVCQUFyRDtBQUNIO0FBQ0oscUJBUkQ7O0FBVUFoQixzQkFBRSxJQUFGLEVBQVFnQixRQUFSLENBQWlCLFlBQWpCO0FBQ0g7QUFDSixhQXJCRDtBQXVCSCxTQTlCUTs7QUFnQ1RDLGNBQU0sY0FBU0MsTUFBVCxFQUNOO0FBQ0l0QixxQkFBUyxJQUFUOztBQUVBLGdCQUFJLE9BQU9zQixNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSXRCLHVCQUFPc0IsTUFBUCxHQUFnQnhCLElBQUl5QixPQUFKLENBQVl2QixPQUFPc0IsTUFBbkIsRUFBMkJBLE1BQTNCLENBQWhCO0FBQ0g7O0FBRUR0QixtQkFBT0UsSUFBUDtBQUNIOztBQTFDUSxLQUFiO0FBOENILENBbkRELEVBbURHc0IsU0FBU3pCLElBbkRaIiwiZmlsZSI6Il9hcHAuZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKGJvZHkpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIF90aGlzXztcblxuICAgIGFwcC5maWx0ZXIgPSB7XG5cbiAgICAgICAgYmluZDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgJGdyaWQgPSAkKCcjcHJvamVjdHMtbGlzdCcpO1xuICAgICAgICAgICAgdmFyICRjYXRlZ29yaWVzID0gJCgnI2NhdGVnb3JpZXMnKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuai1maWx0ZXInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2lzLWN1cnJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gaHJlZi5yZXBsYWNlKCcjZ3JvdXAtJywgJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICRjYXRlZ29yaWVzLmZpbmQoJy5qLWZpbHRlci5pcy1jdXJyZW50JykucmVtb3ZlQ2xhc3MoJ2lzLWN1cnJlbnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAkZ3JpZC5maW5kKCcucHJvamVjdC1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRlZ29yaWVzID0gJCh0aGlzKS5kYXRhKCdjYXRlZ29yeScpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yaWVzLmluZGV4T2YoZmlsdGVyKSA+PSAwIHx8IGZpbHRlciA9PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3Byb2plY3QtaXRlbS0tZGlzYWJsZScpLmFkZENsYXNzKCdwcm9qZWN0LWl0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdwcm9qZWN0LWl0ZW0tLWFjdGl2ZScpLmFkZENsYXNzKCdwcm9qZWN0LWl0ZW0tLWRpc2FibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY3VycmVudCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oY29uZmlnKVxuICAgICAgICB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

'use strict';

var app = app || {};

(function (body) {
    "use strict";

    var _this_;

    app.magnific = {

        bind: function bind() {
            if ($('.j-project-item').length) {
                $('.j-project-item').each(function () {
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
                            opener: function opener(openerElement) {
                                return openerElement.is('img') ? openerElement : openerElement.find('img');
                            }
                        },
                        closeOnContentClick: true
                    });
                });
            } else {
                $('.zoom').magnificPopup({
                    type: 'image',
                    preloader: true,
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: false,
                        duration: 300,
                        easing: 'ease-in-out',
                        opener: function opener(openerElement) {
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                    },
                    closeOnContentClick: true
                });
            }
        },

        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubWFnbmlmaWMuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzXyIsIm1hZ25pZmljIiwiYmluZCIsIiQiLCJsZW5ndGgiLCJlYWNoIiwibWFnbmlmaWNQb3B1cCIsImRlbGVnYXRlIiwidHlwZSIsInByZWxvYWRlciIsImdhbGxlcnkiLCJlbmFibGVkIiwibmF2aWdhdGVCeUltZ0NsaWNrIiwidENvdW50ZXIiLCJ6b29tIiwiZHVyYXRpb24iLCJlYXNpbmciLCJvcGVuZXIiLCJvcGVuZXJFbGVtZW50IiwiaXMiLCJmaW5kIiwiY2xvc2VPbkNvbnRlbnRDbGljayIsImluaXQiLCJjb25maWciLCJfZXh0ZW5kIiwiZG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUEsT0FBTyxFQUFqQjs7QUFFQSxDQUFDLFVBQVNDLElBQVQsRUFBYztBQUNYOztBQUVBLFFBQUlDLE1BQUo7O0FBRUFGLFFBQUlHLFFBQUosR0FBZTs7QUFFWEMsY0FBTSxnQkFDTjtBQUNJLGdCQUFJQyxFQUFFLGlCQUFGLEVBQXFCQyxNQUF6QixFQUFpQztBQUM3QkQsa0JBQUUsaUJBQUYsRUFBcUJFLElBQXJCLENBQTBCLFlBQVU7QUFDaENGLHNCQUFFLElBQUYsRUFBUUcsYUFBUixDQUFzQjtBQUNsQkMsa0NBQVUsT0FEUTtBQUVsQkMsOEJBQU0sT0FGWTtBQUdsQkMsbUNBQVcsSUFITztBQUlsQkMsaUNBQVM7QUFDTEMscUNBQVMsSUFESjtBQUVMQyxnREFBb0IsSUFGZjtBQUdMQyxzQ0FBVTtBQUhMLHlCQUpTO0FBU2xCQyw4QkFBTTtBQUNGSCxxQ0FBUyxLQURQO0FBRUZJLHNDQUFVLEdBRlI7QUFHRkMsb0NBQVEsYUFITjtBQUlGQyxvQ0FBUSxnQkFBU0MsYUFBVCxFQUF3QjtBQUM1Qix1Q0FBT0EsY0FBY0MsRUFBZCxDQUFpQixLQUFqQixJQUEwQkQsYUFBMUIsR0FBMENBLGNBQWNFLElBQWQsQ0FBbUIsS0FBbkIsQ0FBakQ7QUFDSDtBQU5DLHlCQVRZO0FBaUJsQkMsNkNBQXFCO0FBakJILHFCQUF0QjtBQW1CSCxpQkFwQkQ7QUFxQkgsYUF0QkQsTUF1Qks7QUFDRGxCLGtCQUFFLE9BQUYsRUFBV0csYUFBWCxDQUF5QjtBQUNyQkUsMEJBQUssT0FEZ0I7QUFFckJDLCtCQUFXLElBRlU7QUFHckJDLDZCQUFTO0FBQ0xDLGlDQUFTO0FBREoscUJBSFk7QUFNckJHLDBCQUFNO0FBQ0ZILGlDQUFTLEtBRFA7QUFFRkksa0NBQVUsR0FGUjtBQUdGQyxnQ0FBUSxhQUhOO0FBSUZDLGdDQUFRLGdCQUFTQyxhQUFULEVBQXdCO0FBQzVCLG1DQUFPQSxjQUFjQyxFQUFkLENBQWlCLEtBQWpCLElBQTBCRCxhQUExQixHQUEwQ0EsY0FBY0UsSUFBZCxDQUFtQixLQUFuQixDQUFqRDtBQUNIO0FBTkMscUJBTmU7QUFjckJDLHlDQUFxQjtBQWRBLGlCQUF6QjtBQWdCSDtBQUNKLFNBN0NVOztBQStDWEMsY0FBTSxjQUFTQyxNQUFULEVBQ047QUFDSXZCLHFCQUFTLElBQVQ7O0FBRUEsZ0JBQUksT0FBT3VCLE1BQVAsS0FBa0IsV0FBdEIsRUFDQTtBQUNJdkIsdUJBQU91QixNQUFQLEdBQWdCekIsSUFBSTBCLE9BQUosQ0FBWXhCLE9BQU91QixNQUFuQixFQUEyQkEsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFRHZCLG1CQUFPRSxJQUFQO0FBQ0g7O0FBekRVLEtBQWY7QUE2REgsQ0FsRUQsRUFrRUd1QixTQUFTMUIsSUFsRVoiLCJmaWxlIjoiX2FwcC5tYWduaWZpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbihib2R5KXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBfdGhpc187XG5cbiAgICBhcHAubWFnbmlmaWMgPSB7XG5cbiAgICAgICAgYmluZDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoJCgnLmotcHJvamVjdC1pdGVtJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmotcHJvamVjdC1pdGVtJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGU6ICcuem9vbScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FsbGVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRDb3VudGVyOiAnJWN1cnIlIG9mICV0b3RhbCUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcjogZnVuY3Rpb24ob3BlbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3BlbmVyRWxlbWVudC5pcygnaW1nJykgPyBvcGVuZXJFbGVtZW50IDogb3BlbmVyRWxlbWVudC5maW5kKCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbnRlbnRDbGljazogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy56b29tJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J2ltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBnYWxsZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHpvb206IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lcjogZnVuY3Rpb24ob3BlbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcGVuZXJFbGVtZW50LmlzKCdpbWcnKSA/IG9wZW5lckVsZW1lbnQgOiBvcGVuZXJFbGVtZW50LmZpbmQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ29udGVudENsaWNrOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oY29uZmlnKVxuICAgICAgICB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

'use strict';

var app = app || {};

(function (body) {
    "use strict";

    var _this_;

    app.modal = {

        config: {
            prefix: 'tmpl-modal-',
            trigger: '.j-open-popup',
            dismiss: '.j-close-popup'
        },

        prepare: function prepare(selector) {
            var nested = [];

            if (typeof selector !== 'undefined' && selector.length > 1) {
                if (selector.substr(0, 1) == '#') {
                    selector = selector.substr(1);
                }

                if (selector.indexOf('/') >= 0) {
                    nested = selector.split('/');
                    selector = nested[0];
                }

                selector = _this_.config.prefix + selector;
            }

            return selector;
        },

        _close: function _close(modal) {
            var change = modal.find('[data-change]');

            modal.removeClass('is-animate');
            change.removeClass('is-animate');

            setTimeout(function () {
                change.removeClass('is-open');
                modal.removeClass('is-open');
            }, 500);
        },

        _open: function _open(modal) {
            var change = modal.find('[data-change]');

            modal.addClass('is-open');
            change.addClass('is-open');

            setTimeout(function () {
                modal.addClass('is-animate');
                change.addClass('is-animate');

                autosize($(modal).find('textarea'));
            }, 10);

            $('body').trigger('modal.open', modal);
        },

        bind: function bind() {
            $('body').on('click', _this_.config.dismiss, function (e) {
                e.preventDefault();

                _this_._close($(this).closest('.modal'));

                return !1;
            });

            $('body').on('click', _this_.config.trigger, function (e) {
                e.preventDefault();

                var selector = $(this).data('target') || $(this).data('popup') || $(this).attr('href'),
                    modal = null;

                if (document.getElementById(_this_.prepare(selector)) !== null) {
                    modal = $(template(_this_.prepare(selector), {}));

                    $('body').append(modal);

                    _this_._open(modal);
                }

                return !1;
            });
        },

        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubW9kYWwuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzXyIsIm1vZGFsIiwiY29uZmlnIiwicHJlZml4IiwidHJpZ2dlciIsImRpc21pc3MiLCJwcmVwYXJlIiwic2VsZWN0b3IiLCJuZXN0ZWQiLCJsZW5ndGgiLCJzdWJzdHIiLCJpbmRleE9mIiwic3BsaXQiLCJfY2xvc2UiLCJjaGFuZ2UiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJzZXRUaW1lb3V0IiwiX29wZW4iLCJhZGRDbGFzcyIsImF1dG9zaXplIiwiJCIsImJpbmQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNsb3Nlc3QiLCJkYXRhIiwiYXR0ciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsImluaXQiLCJfZXh0ZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1BLE9BQU8sRUFBakI7O0FBRUEsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWDs7QUFFQSxRQUFJQyxNQUFKOztBQUVBRixRQUFJRyxLQUFKLEdBQVk7O0FBRVJDLGdCQUFRO0FBQ0pDLG9CQUFRLGFBREo7QUFFSkMscUJBQVMsZUFGTDtBQUdKQyxxQkFBUztBQUhMLFNBRkE7O0FBUVJDLGlCQUFTLGlCQUFTQyxRQUFULEVBQ1Q7QUFDSSxnQkFBSUMsU0FBUyxFQUFiOztBQUVBLGdCQUFJLE9BQU9ELFFBQVAsS0FBcUIsV0FBckIsSUFBb0NBLFNBQVNFLE1BQVQsR0FBa0IsQ0FBMUQsRUFDQTtBQUNJLG9CQUFJRixTQUFTRyxNQUFULENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEtBQXlCLEdBQTdCLEVBQ0E7QUFDSUgsK0JBQVdBLFNBQVNHLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBWDtBQUNIOztBQUVELG9CQUFJSCxTQUFTSSxPQUFULENBQWlCLEdBQWpCLEtBQXlCLENBQTdCLEVBQ0E7QUFDSUgsNkJBQVNELFNBQVNLLEtBQVQsQ0FBZSxHQUFmLENBQVQ7QUFDQUwsK0JBQVdDLE9BQU8sQ0FBUCxDQUFYO0FBQ0g7O0FBRURELDJCQUFXUCxPQUFPRSxNQUFQLENBQWNDLE1BQWQsR0FBd0JJLFFBQW5DO0FBQ0g7O0FBRUQsbUJBQU9BLFFBQVA7QUFDSCxTQTdCTzs7QUErQlJNLGdCQUFRLGdCQUFTWixLQUFULEVBQ1I7QUFDSSxnQkFBSWEsU0FBU2IsTUFBTWMsSUFBTixDQUFXLGVBQVgsQ0FBYjs7QUFFQWQsa0JBQU1lLFdBQU4sQ0FBa0IsWUFBbEI7QUFDQUYsbUJBQU9FLFdBQVAsQ0FBbUIsWUFBbkI7O0FBRUFDLHVCQUFXLFlBQVc7QUFDbEJILHVCQUFPRSxXQUFQLENBQW1CLFNBQW5CO0FBQ0FmLHNCQUFNZSxXQUFOLENBQWtCLFNBQWxCO0FBQ0gsYUFIRCxFQUdHLEdBSEg7QUFJSCxTQTFDTzs7QUE0Q1JFLGVBQU8sZUFBU2pCLEtBQVQsRUFDUDtBQUNJLGdCQUFJYSxTQUFTYixNQUFNYyxJQUFOLENBQVcsZUFBWCxDQUFiOztBQUVBZCxrQkFBTWtCLFFBQU4sQ0FBZSxTQUFmO0FBQ0FMLG1CQUFPSyxRQUFQLENBQWdCLFNBQWhCOztBQUVBRix1QkFBVyxZQUFVO0FBQ2pCaEIsc0JBQU1rQixRQUFOLENBQWUsWUFBZjtBQUNBTCx1QkFBT0ssUUFBUCxDQUFnQixZQUFoQjs7QUFFQUMseUJBQVNDLEVBQUVwQixLQUFGLEVBQVNjLElBQVQsQ0FBYyxVQUFkLENBQVQ7QUFDSCxhQUxELEVBS0csRUFMSDs7QUFPQU0sY0FBRSxNQUFGLEVBQVVqQixPQUFWLENBQWtCLFlBQWxCLEVBQWdDSCxLQUFoQztBQUNILFNBM0RPOztBQTZEUnFCLGNBQU0sZ0JBQ047QUFDSUQsY0FBRSxNQUFGLEVBQVVFLEVBQVYsQ0FBYSxPQUFiLEVBQXNCdkIsT0FBT0UsTUFBUCxDQUFjRyxPQUFwQyxFQUE2QyxVQUFTbUIsQ0FBVCxFQUFXO0FBQ3BEQSxrQkFBRUMsY0FBRjs7QUFFQXpCLHVCQUFPYSxNQUFQLENBQWNRLEVBQUUsSUFBRixFQUFRSyxPQUFSLENBQWdCLFFBQWhCLENBQWQ7O0FBRUEsdUJBQU8sQ0FBQyxDQUFSO0FBQ0gsYUFORDs7QUFRQUwsY0FBRSxNQUFGLEVBQVVFLEVBQVYsQ0FBYSxPQUFiLEVBQXNCdkIsT0FBT0UsTUFBUCxDQUFjRSxPQUFwQyxFQUE2QyxVQUFTb0IsQ0FBVCxFQUFXO0FBQ3BEQSxrQkFBRUMsY0FBRjs7QUFFQSxvQkFBSWxCLFdBQVdjLEVBQUUsSUFBRixFQUFRTSxJQUFSLENBQWEsUUFBYixLQUEwQk4sRUFBRSxJQUFGLEVBQVFNLElBQVIsQ0FBYSxPQUFiLENBQTFCLElBQW1ETixFQUFFLElBQUYsRUFBUU8sSUFBUixDQUFhLE1BQWIsQ0FBbEU7QUFBQSxvQkFDSTNCLFFBQVEsSUFEWjs7QUFHQSxvQkFBSTRCLFNBQVNDLGNBQVQsQ0FBd0I5QixPQUFPTSxPQUFQLENBQWVDLFFBQWYsQ0FBeEIsTUFBc0QsSUFBMUQsRUFDQTtBQUNJTiw0QkFBUW9CLEVBQUVVLFNBQVMvQixPQUFPTSxPQUFQLENBQWVDLFFBQWYsQ0FBVCxFQUFtQyxFQUFuQyxDQUFGLENBQVI7O0FBRUFjLHNCQUFFLE1BQUYsRUFBVVcsTUFBVixDQUFpQi9CLEtBQWpCOztBQUVBRCwyQkFBT2tCLEtBQVAsQ0FBYWpCLEtBQWI7QUFDSDs7QUFFRCx1QkFBTyxDQUFDLENBQVI7QUFDSCxhQWhCRDtBQWlCSCxTQXhGTzs7QUEwRlJnQyxjQUFNLGNBQVMvQixNQUFULEVBQ047QUFDSUYscUJBQVMsSUFBVDs7QUFFQSxnQkFBSSxPQUFPRSxNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSUYsdUJBQU9FLE1BQVAsR0FBZ0JKLElBQUlvQyxPQUFKLENBQVlsQyxPQUFPRSxNQUFuQixFQUEyQkEsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFREYsbUJBQU9zQixJQUFQO0FBQ0g7O0FBcEdPLEtBQVo7QUF3R0gsQ0E3R0QsRUE2R0dPLFNBQVM5QixJQTdHWiIsImZpbGUiOiJfYXBwLm1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKGJvZHkpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIF90aGlzXztcblxuICAgIGFwcC5tb2RhbCA9IHtcblxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHByZWZpeDogJ3RtcGwtbW9kYWwtJyxcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuai1vcGVuLXBvcHVwJyxcbiAgICAgICAgICAgIGRpc21pc3M6ICcuai1jbG9zZS1wb3B1cCdcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVwYXJlOiBmdW5jdGlvbihzZWxlY3RvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG5lc3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mKHNlbGVjdG9yKSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZWN0b3IubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3Iuc3Vic3RyKDAsIDEpID09ICcjJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5pbmRleE9mKCcvJykgPj0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5lc3RlZCA9IHNlbGVjdG9yLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gbmVzdGVkWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gX3RoaXNfLmNvbmZpZy5wcmVmaXggICsgc2VsZWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgfSxcblxuICAgICAgICBfY2xvc2U6IGZ1bmN0aW9uKG1vZGFsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbW9kYWwuZmluZCgnW2RhdGEtY2hhbmdlXScpO1xuXG4gICAgICAgICAgICBtb2RhbC5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZScpO1xuICAgICAgICAgICAgY2hhbmdlLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgbW9kYWwucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29wZW46IGZ1bmN0aW9uKG1vZGFsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbW9kYWwuZmluZCgnW2RhdGEtY2hhbmdlXScpO1xuXG4gICAgICAgICAgICBtb2RhbC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgY2hhbmdlLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBtb2RhbC5hZGRDbGFzcygnaXMtYW5pbWF0ZScpO1xuICAgICAgICAgICAgICAgIGNoYW5nZS5hZGRDbGFzcygnaXMtYW5pbWF0ZScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGF1dG9zaXplKCQobW9kYWwpLmZpbmQoJ3RleHRhcmVhJykpO1xuICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignbW9kYWwub3BlbicsIG1vZGFsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBfdGhpc18uY29uZmlnLmRpc21pc3MsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIF90aGlzXy5fY2xvc2UoJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIF90aGlzXy5jb25maWcudHJpZ2dlciwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSB8fCAkKHRoaXMpLmRhdGEoJ3BvcHVwJykgfHwgJCh0aGlzKS5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChfdGhpc18ucHJlcGFyZShzZWxlY3RvcikpICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwgPSAkKHRlbXBsYXRlKF90aGlzXy5wcmVwYXJlKHNlbGVjdG9yKSwge30pKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKG1vZGFsKTtcblxuICAgICAgICAgICAgICAgICAgICBfdGhpc18uX29wZW4obW9kYWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oY29uZmlnKVxuICAgICAgICB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

'use strict';

var app = app || {};

(function (body) {
    "use strict";

    var _this_;

    app.project = {

        bind: function bind() {
            $('body').on('mouseenter', '.j-project-item', function (e) {
                $(this).addClass('is-hovered');
            });

            $('body').on('mouseleave', '.j-project-item', function (e) {
                $(this).removeClass('is-hovered');
            });
        },

        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAucHJvamVjdC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJib2R5IiwiX3RoaXNfIiwicHJvamVjdCIsImJpbmQiLCIkIiwib24iLCJlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImluaXQiLCJjb25maWciLCJfZXh0ZW5kIiwiZG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUEsT0FBTyxFQUFqQjs7QUFFQSxDQUFDLFVBQVNDLElBQVQsRUFBYztBQUNYOztBQUVBLFFBQUlDLE1BQUo7O0FBRUFGLFFBQUlHLE9BQUosR0FBYzs7QUFFVkMsY0FBTSxnQkFDTjtBQUNJQyxjQUFFLE1BQUYsRUFBVUMsRUFBVixDQUFhLFlBQWIsRUFBMkIsaUJBQTNCLEVBQThDLFVBQVNDLENBQVQsRUFBVztBQUNyREYsa0JBQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFlBQWpCO0FBQ0gsYUFGRDs7QUFJQUgsY0FBRSxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxZQUFiLEVBQTJCLGlCQUEzQixFQUE4QyxVQUFTQyxDQUFULEVBQVc7QUFDckRGLGtCQUFFLElBQUYsRUFBUUksV0FBUixDQUFvQixZQUFwQjtBQUNILGFBRkQ7QUFHSCxTQVhTOztBQWFWQyxjQUFNLGNBQVNDLE1BQVQsRUFDTjtBQUNJVCxxQkFBUyxJQUFUOztBQUVBLGdCQUFJLE9BQU9TLE1BQVAsS0FBa0IsV0FBdEIsRUFDQTtBQUNJVCx1QkFBT1MsTUFBUCxHQUFnQlgsSUFBSVksT0FBSixDQUFZVixPQUFPUyxNQUFuQixFQUEyQkEsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFRFQsbUJBQU9FLElBQVA7QUFDSDs7QUF2QlMsS0FBZDtBQTJCSCxDQWhDRCxFQWdDR1MsU0FBU1osSUFoQ1oiLCJmaWxlIjoiX2FwcC5wcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKGJvZHkpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIF90aGlzXztcblxuICAgIGFwcC5wcm9qZWN0ID0ge1xuXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdtb3VzZWVudGVyJywgJy5qLXByb2plY3QtaXRlbScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ21vdXNlbGVhdmUnLCAnLmotcHJvamVjdC1pdGVtJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtaG92ZXJlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oY29uZmlnKVxuICAgICAgICB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

'use strict';

var app = app || {};

(function (body) {
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

        setValue: function setValue(quantity) {
            var min = 1,
                max = 100;

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

        increase: function increase(quantity) {
            quantity += 1;

            this.setValue(quantity);
        },

        decrease: function decrease(quantity) {
            if (quantity > 1) {
                quantity -= 1;
            }

            this.setValue(quantity);
        },

        callback: function callback() {
            if (typeof this.element.data('product') !== 'undefined' && typeof this.config.complete == 'function') {
                this.config.complete.call(null, this.element, this.element.data('product'));
            }
        },

        keys: function keys() {
            var _this = this,
                role = '';

            $('body').on('keydown', _this_.config.input, function (e) {
                if ([38, 40].indexOf(e.keyCode) >= 0) {
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

        bind: function bind() {
            var role = '';

            $('body').on('click', _this_.config.control, function (e) {
                e.preventDefault();

                _this_.element = $(this).closest(_this_.config.element);

                role = $(this).data('role');

                if (['increase', 'decrease'].indexOf(role) >= 0) {
                    _this[role](parseInt(_this_.element.find(_this_.config.input).val()));
                }

                _this_.callback();

                return !1;
            });
        },

        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAucXVhbnRpdHkuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzXyIsInF1YW50aXR5IiwiY29uZmlnIiwiZWxlbWVudCIsImlucHV0IiwiY29udHJvbCIsImNvbXBsZXRlIiwic2V0VmFsdWUiLCJtaW4iLCJtYXgiLCJkYXRhIiwiZmluZCIsInZhbCIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJjYWxsYmFjayIsImNhbGwiLCJrZXlzIiwiX3RoaXMiLCJyb2xlIiwiJCIsIm9uIiwiZSIsImluZGV4T2YiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJjbG9zZXN0IiwicGFyc2VJbnQiLCJiaW5kIiwiaW5pdCIsIl9leHRlbmQiLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxNQUFNQSxPQUFPLEVBQWpCOztBQUVBLENBQUMsVUFBU0MsSUFBVCxFQUFjO0FBQ1g7O0FBRUEsUUFBSUMsTUFBSjs7QUFFQUYsUUFBSUcsUUFBSixHQUFlOztBQUVYQyxnQkFBUTtBQUNKQyxxQkFBUyxhQURMO0FBRUpDLG1CQUFPLG1CQUZIO0FBR0pDLHFCQUFTLHFCQUhMO0FBSUpDLHNCQUFVO0FBSk4sU0FGRzs7QUFTWEgsaUJBQVMsSUFURTs7QUFXWEksa0JBQVUsa0JBQVNOLFFBQVQsRUFDVjtBQUNJLGdCQUFJTyxNQUFNLENBQVY7QUFBQSxnQkFBYUMsTUFBTSxHQUFuQjs7QUFFQSxnQkFBSSxLQUFLTixPQUFMLENBQWFPLElBQWIsQ0FBa0IsS0FBbEIsQ0FBSixFQUE4QjtBQUMxQkYsc0JBQU0sS0FBS0wsT0FBTCxDQUFhTyxJQUFiLENBQWtCLEtBQWxCLENBQU47QUFDSDs7QUFFRCxnQkFBSSxLQUFLUCxPQUFMLENBQWFPLElBQWIsQ0FBa0IsS0FBbEIsQ0FBSixFQUE4QjtBQUMxQkQsc0JBQU0sS0FBS04sT0FBTCxDQUFhTyxJQUFiLENBQWtCLEtBQWxCLENBQU47QUFDSDs7QUFFRCxnQkFBSVQsV0FBV1EsR0FBZixFQUFvQjtB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O0FBQ0lGLHFCQUFTLElBQVQ7O0FBRUEsZ0JBQUksT0FBT0UsTUFBUCxLQUFrQixXQUF0QixFQUNBO0FBQ0lGLHVCQUFPRSxNQUFQLEdBQWdCSixJQUFJZ0MsT0FBSixDQUFZOUIsT0FBT0UsTUFBbkIsRUFBMkJBLE1BQTNCLENBQWhCO0FBQ0g7O0FBRURGLG1CQUFPNEIsSUFBUDtBQUNBNUIsbUJBQU9pQixJQUFQO0FBQ0g7O0FBckhVLEtBQWY7QUF5SEgsQ0E5SEQsRUE4SEdjLFNBQVNoQyxJQTlIWjs7QUFnSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJfYXBwLnF1YW50aXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKGJvZHkpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIF90aGlzXztcblxuICAgIGFwcC5xdWFudGl0eSA9IHtcblxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcuai1xdWFudGl0eScsXG4gICAgICAgICAgICBpbnB1dDogJy5qLXF1YW50aXR5LWNvdW50JyxcbiAgICAgICAgICAgIGNvbnRyb2w6ICcuai1xdWFudGl0eS1jb250cm9sJyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudDogbnVsbCxcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24ocXVhbnRpdHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBtaW4gPSAxLCBtYXggPSAxMDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZGF0YSgnbWluJykpIHtcbiAgICAgICAgICAgICAgICBtaW4gPSB0aGlzLmVsZW1lbnQuZGF0YSgnbWluJyk7ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZGF0YSgnbWF4JykpIHtcbiAgICAgICAgICAgICAgICBtYXggPSB0aGlzLmVsZW1lbnQuZGF0YSgnbWF4Jyk7ICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChxdWFudGl0eSA+IG1heCkge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5ID0gbWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocXVhbnRpdHkgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICBxdWFudGl0eSA9IG1pbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQodGhpcy5jb25maWcuaW5wdXQpLnZhbChxdWFudGl0eSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbmNyZWFzZTogZnVuY3Rpb24ocXVhbnRpdHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUocXVhbnRpdHkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlY3JlYXNlOiBmdW5jdGlvbihxdWFudGl0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHF1YW50aXR5ID4gMSkge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5IC09IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUocXVhbnRpdHkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih0aGlzLmNvbmZpZy5jb21wbGV0ZSkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jb21wbGV0ZS5jYWxsKG51bGwsIHRoaXMuZWxlbWVudCwgdGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5czogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLCByb2xlID0gJyc7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5vbigna2V5ZG93bicsIF90aGlzXy5jb25maWcuaW5wdXQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoWzM4LCA0MF0uaW5kZXhPZihlLmtleUNvZGUpID49IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcm9sZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDM4OiAnaW5jcmVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgNDA6ICdkZWNyZWFzZSdcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBfdGhpc18uZWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChfdGhpc18uY29uZmlnLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzW3JvbGVbZS5rZXlDb2RlXV0ocGFyc2VJbnQoX3RoaXNfLmVsZW1lbnQuZmluZChfdGhpc18uY29uZmlnLmlucHV0KS52YWwoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXy5jYWxsYmFjaygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByb2xlID0gJyc7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBfdGhpc18uY29uZmlnLmNvbnRyb2wsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBfdGhpc18uZWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChfdGhpc18uY29uZmlnLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgcm9sZSA9ICQodGhpcykuZGF0YSgncm9sZScpO1xuICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoWydpbmNyZWFzZScsICdkZWNyZWFzZSddLmluZGV4T2Yocm9sZSkgPj0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzW3JvbGVdKHBhcnNlSW50KF90aGlzXy5lbGVtZW50LmZpbmQoX3RoaXNfLmNvbmZpZy5pbnB1dCkudmFsKCkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfdGhpc18uY2FsbGJhY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZylcbiAgICAgICAge1xuICAgICAgICAgICAgX3RoaXNfID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF90aGlzXy5jb25maWcgPSBhcHAuX2V4dGVuZChfdGhpc18uY29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBfdGhpc18uYmluZCgpO1xuICAgICAgICAgICAgX3RoaXNfLmtleXMoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoZG9jdW1lbnQuYm9keSk7XG5cbi8vIHRoaXMucXVhbnRpdHkuaW5pdCh7XG4vLyAgICAgY29tcGxldGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGlkKSB7XG4vLyAgICAgICAgIC8vICQoZWxlbWVudCkuY3NzKHtcbi8vICAgICAgICAgLy8gICAgICdib3JkZXInOiAnMXB4IHNvbGlkIGxpbWUnXG4vLyAgICAgICAgIC8vIH0pO1xuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiaWQgOlwiLCBpZCk7XG4vLyAgICAgfVxuLy8gfSk7XG5cbi8vIDxkaXYgY2xhc3M9XCJxdWFudGl0eSBqLXF1YW50aXR5IGNsZWFyZml4XCIgZGF0YS1wcm9kdWN0PVwiMTAwMFwiIGRhdGEtbWluPVwiMVwiIGRhdGEtbWF4PVwiOTk5XCI+XG4vLyAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJxdWFudGl0eV9fY29udHJvbCBfZGVjcmVhc2Ugai1xdWFudGl0eS1jb250cm9sXCIgZGF0YS1yb2xlPVwiZGVjcmVhc2VcIj48L2J1dHRvbj5cbi8vICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY291bnRbMTAwMF1cIiB2YWx1ZT1cIjFcIiBkYXRhLXJvbGU9XCJxdWFudGl0eS1pbnB1dFwiIGNsYXNzPVwicXVhbnRpdHlfX2NvdW50IGotcXVhbnRpdHktY291bnRcIiBtYXhsZW5ndGg9XCIzXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4vLyAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJxdWFudGl0eV9fY29udHJvbCBfaW5jcmVhc2Ugai1xdWFudGl0eS1jb250cm9sXCIgZGF0YS1yb2xlPVwiaW5jcmVhc2VcIj48L2J1dHRvbj5cbi8vIDwvZGl2PiJdfQ==

'use strict';

var app = app || {};

;(function (body) {
    "use strict";

    var _this;

    app.sandwich = {

        config: {
            keyHooks: !1,
            selector: '.js-sandwich-menu',
            wrapper: '.layout-wrapper',
            overlay: '.overlay'
        },

        extend: function extend(config) {
            _this = this;

            if (typeof config !== 'undefined') {
                var x;
                for (x in config) {
                    if (typeof _this.config[x] !== 'undefined') _this.config[x] = config[x];
                }
            }
        },

        isOpen: function isOpen() {
            return $('body').hasClass('page-visible');
        },

        hide: function hide() {
            $('body').removeClass('page-open');

            setTimeout(function () {
                $('body').removeClass('page-visible');
            }, 10);

            $(this.config.overlay).css({
                'visibility': 'hidden'
            });
        },

        toggle: function toggle() {
            if ($('body').hasClass('page-visible')) {
                $('body').removeClass('page-open');

                setTimeout(function () {
                    $('body').removeClass('page-visible');
                }, 200);
            } else {
                $('body').addClass('page-open');

                setTimeout(function () {
                    $('body').addClass('page-visible');
                }, 10);
            }

            var visibility = 'visible';

            if (!$('body').hasClass('page-open')) {
                visibility = 'hidden';
            }

            $(_this.config.overlay).css({
                'visibility': visibility
            });
        },

        sandwichTrigger: function sandwichTrigger() {
            _this = this;

            if (_this.config.keyHooks) {
                $('body').on('keydown', function (e) {
                    if (e.keyCode == 27 && _this.isOpen()) {
                        _this.toggle();
                    }
                });
            };

            $('body').on('click', _this.config.selector, function (e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                _this.toggle();
            });
        },

        overlayTrigger: function overlayTrigger() {
            _this = this;

            $('body').on('click', _this.config.overlay, function (e) {
                _this.hide();
            });
        },

        init: function init(config) {
            this.extend(config);
            this.sandwichTrigger();
            this.overlayTrigger();
        }

    };
})(document.body);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAuc2FuZHdpY2guanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzIiwic2FuZHdpY2giLCJjb25maWciLCJrZXlIb29rcyIsInNlbGVjdG9yIiwid3JhcHBlciIsIm92ZXJsYXkiLCJleHRlbmQiLCJ4IiwiaXNPcGVuIiwiJCIsImhhc0NsYXNzIiwiaGlkZSIsInJlbW92ZUNsYXNzIiwic2V0VGltZW91dCIsImNzcyIsInRvZ2dsZSIsImFkZENsYXNzIiwidmlzaWJpbGl0eSIsInNhbmR3aWNoVHJpZ2dlciIsIm9uIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInJldHVyblZhbHVlIiwib3ZlcmxheVRyaWdnZXIiLCJpbml0IiwiZG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUEsT0FBTyxFQUFqQjs7QUFFQSxDQUFDLENBQUMsVUFBU0MsSUFBVCxFQUFjO0FBQ1o7O0FBRUEsUUFBSUMsS0FBSjs7QUFFQUYsUUFBSUcsUUFBSixHQUFlOztBQUVYQyxnQkFBUTtBQUNKQyxzQkFBVSxDQUFDLENBRFA7QUFFSkMsc0JBQVUsbUJBRk47QUFHSkMscUJBQVMsaUJBSEw7QUFJSkMscUJBQVM7QUFKTCxTQUZHOztBQVNYQyxnQkFBUSxnQkFBU0wsTUFBVCxFQUNSO0FBQ0lGLG9CQUFRLElBQVI7O0FBRUEsZ0JBQUksT0FBT0UsTUFBUCxLQUFrQixXQUF0QixFQUNBO0FBQ0ksb0JBQUlNLENBQUo7QUFDQSxxQkFBS0EsQ0FBTCxJQUFVTixNQUFWLEVBQ0E7QUFDSSx3QkFBSSxPQUFPRixNQUFNRSxNQUFOLENBQWFNLENBQWIsQ0FBUCxLQUEyQixXQUEvQixFQUNJUixNQUFNRSxNQUFOLENBQWFNLENBQWIsSUFBa0JOLE9BQU9NLENBQVAsQ0FBbEI7QUFDUDtBQUNKO0FBQ0osU0F0QlU7O0FBd0JYQyxnQkFBUSxrQkFDUjtBQUNJLG1CQUFPQyxFQUFFLE1BQUYsRUFBVUMsUUFBVixDQUFtQixjQUFuQixDQUFQO0FBQ0gsU0EzQlU7O0FBNkJYQyxjQUFNLGdCQUNOO0FBQ0lGLGNBQUUsTUFBRixFQUFVRyxXQUFWLENBQXNCLFdBQXRCOztBQUVBQyx1QkFBVyxZQUFVO0FBQ2pCSixrQkFBRSxNQUFGLEVBQVVHLFdBQVYsQ0FBc0IsY0FBdEI7QUFDSCxhQUZELEVBRUcsRUFGSDs7QUFJQUgsY0FBRSxLQUFLUixNQUFMLENBQVlJLE9BQWQsRUFBdUJTLEdBQXZCLENBQTJCO0FBQ3ZCLDhCQUFjO0FBRFMsYUFBM0I7QUFHSCxTQXhDVTs7QUEwQ1hDLGdCQUFRLGtCQUNSO0FBQ0ksZ0JBQUlOLEVBQUUsTUFBRixFQUFVQyxRQUFWLENBQW1CLGNBQW5CLENBQUosRUFDQTtBQUNJRCxrQkFBRSxNQUFGLEVBQVVHLFdBQVYsQ0FBc0IsV0FBdEI7O0FBRUFDLDJCQUFXLFlBQVU7QUFDakJKLHNCQUFFLE1BQUYsRUFBVUcsV0FBVixDQUFzQixjQUF0QjtBQUNILGlCQUZELEVBRUcsR0FGSDtBQUdILGFBUEQsTUFTQTtBQUNJSCxrQkFBRSxNQUFGLEVBQVVPLFFBQVYsQ0FBbUIsV0FBbkI7O0FBRUFILDJCQUFXLFlBQVU7QUFDakJKLHNCQUFFLE1BQUYsRUFBVU8sUUFBVixDQUFtQixjQUFuQjtBQUNILGlCQUZELEVBRUcsRUFGSDtBQUdIOztBQUVELGdCQUFJQyxhQUFhLFNBQWpCOztBQUVBLGdCQUFJLENBQUNSLEVBQUUsTUFBRixFQUFVQyxRQUFWLENBQW1CLFdBQW5CLENBQUwsRUFDQTtBQUNJTyw2QkFBYSxRQUFiO0FBQ0g7O0FBRURSLGNBQUVWLE1BQU1FLE1BQU4sQ0FBYUksT0FBZixFQUF3QlMsR0FBeEIsQ0FBNEI7QUFDeEIsOEJBQWNHO0FBRFUsYUFBNUI7QUFHSCxTQXZFVTs7QUF5RVhDLHlCQUFpQiwyQkFDakI7QUFDSW5CLG9CQUFRLElBQVI7O0FBRUEsZ0JBQUlBLE1BQU1FLE1BQU4sQ0FBYUMsUUFBakIsRUFDQTtBQUNJTyxrQkFBRSxNQUFGLEVBQVVVLEVBQVYsQ0FBYSxTQUFiLEVBQXdCLFVBQVNDLENBQVQsRUFBWTtBQUNoQyx3QkFBR0EsRUFBRUMsT0FBRixJQUFhLEVBQWIsSUFBbUJ0QixNQUFNUyxNQUFOLEVBQXRCLEVBQ0E7QUFDSVQsOEJBQU1nQixNQUFOO0FBQ0g7QUFDSixpQkFMRDtBQU1IOztBQUVETixjQUFFLE1BQUYsRUFBVVUsRUFBVixDQUFhLE9BQWIsRUFBc0JwQixNQUFNRSxNQUFOLENBQWFFLFFBQW5DLEVBQTZDLFVBQVNpQixDQUFULEVBQVc7QUFDcERBLGtCQUFFRSxjQUFGLEdBQW1CRixFQUFFRSxjQUFGLEVBQW5CLEdBQXdDRixFQUFFRyxXQUFGLEdBQWdCLEtBQXhEO0FBQ0F4QixzQkFBTWdCLE1BQU47QUFDSCxhQUhEO0FBSUgsU0EzRlU7O0FBNkZYUyx3QkFBZ0IsMEJBQ2hCO0FBQ0l6QixvQkFBUSxJQUFSOztBQUVBVSxjQUFFLE1BQUYsRUFBVVUsRUFBVixDQUFhLE9BQWIsRUFBc0JwQixNQUFNRSxNQUFOLENBQWFJLE9BQW5DLEVBQTRDLFVBQVNlLENBQVQsRUFBVztBQUNuRHJCLHNCQUFNWSxJQUFOO0FBQ0gsYUFGRDtBQUdILFNBcEdVOztBQXNHWGMsY0FBTSxjQUFTeEIsTUFBVCxFQUNOO0FBQ0ksaUJBQUtLLE1BQUwsQ0FBWUwsTUFBWjtBQUNBLGlCQUFLaUIsZUFBTDtBQUNBLGlCQUFLTSxjQUFMO0FBQ0g7O0FBM0dVLEtBQWY7QUErR0gsQ0FwSEEsRUFvSEVFLFNBQVM1QixJQXBIWCIsImZpbGUiOiJfYXBwLnNhbmR3aWNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuOyhmdW5jdGlvbihib2R5KXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBfdGhpcztcblxuICAgIGFwcC5zYW5kd2ljaCA9IHtcblxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGtleUhvb2tzOiAhMSxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLmpzLXNhbmR3aWNoLW1lbnUnLFxuICAgICAgICAgICAgd3JhcHBlcjogJy5sYXlvdXQtd3JhcHBlcicsXG4gICAgICAgICAgICBvdmVybGF5OiAnLm92ZXJsYXknXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbihjb25maWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB4O1xuICAgICAgICAgICAgICAgIGZvciAoeCBpbiBjb25maWcpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLmNvbmZpZ1t4XSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb25maWdbeF0gPSBjb25maWdbeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzT3BlbjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdwYWdlLXZpc2libGUnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncGFnZS1vcGVuJyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3BhZ2UtdmlzaWJsZScpO1xuICAgICAgICAgICAgfSwgMTApO1xuXG4gICAgICAgICAgICAkKHRoaXMuY29uZmlnLm92ZXJsYXkpLmNzcyh7XG4gICAgICAgICAgICAgICAgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3BhZ2UtdmlzaWJsZScpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncGFnZS1vcGVuJyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncGFnZS12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3BhZ2Utb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3BhZ2UtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgICAgICAgIGlmICghJCgnYm9keScpLmhhc0NsYXNzKCdwYWdlLW9wZW4nKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gJ2hpZGRlbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJChfdGhpcy5jb25maWcub3ZlcmxheSkuY3NzKHtcbiAgICAgICAgICAgICAgICAndmlzaWJpbGl0eSc6IHZpc2liaWxpdHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNhbmR3aWNoVHJpZ2dlcjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChfdGhpcy5jb25maWcua2V5SG9va3MpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT0gMjcgJiYgX3RoaXMuaXNPcGVuKCkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgX3RoaXMuY29uZmlnLnNlbGVjdG9yLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb3ZlcmxheVRyaWdnZXI6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgX3RoaXMuY29uZmlnLm92ZXJsYXksIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5leHRlbmQoY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuc2FuZHdpY2hUcmlnZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlUcmlnZ2VyKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50LmJvZHkpOyJdfQ==

"use strict";

(function (callback) {
    var ready = false;

    var detach = function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    };
    var completed = function completed() {
        if (!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if (document.readyState === "complete") {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch (e) {}

        if (top && top.doScroll) {
            (function scrollCheck() {
                if (ready) return;

                try {
                    top.doScroll("left");
                } catch (e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
})(function () {
    app.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiXSwibmFtZXMiOlsiY2FsbGJhY2siLCJyZWFkeSIsImRldGFjaCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb21wbGV0ZWQiLCJ3aW5kb3ciLCJkZXRhY2hFdmVudCIsImV2ZW50IiwidHlwZSIsInJlYWR5U3RhdGUiLCJhdHRhY2hFdmVudCIsInRvcCIsImZyYW1lRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsImUiLCJkb1Njcm9sbCIsInNjcm9sbENoZWNrIiwic2V0VGltZW91dCIsImFwcCIsImluaXQiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxVQUFTQSxRQUFULEVBQW1CO0FBQ2hCLFFBQUlDLFFBQVEsS0FBWjs7QUFFQSxRQUFJQyxTQUFTLFNBQVRBLE1BQVMsR0FBVztBQUNwQixZQUFHQyxTQUFTQyxnQkFBWixFQUE4QjtBQUMxQkQscUJBQVNFLG1CQUFULENBQTZCLGtCQUE3QixFQUFpREMsU0FBakQ7QUFDQUMsbUJBQU9GLG1CQUFQLENBQTJCLE1BQTNCLEVBQW1DQyxTQUFuQztBQUNILFNBSEQsTUFHTztBQUNISCxxQkFBU0ssV0FBVCxDQUFxQixvQkFBckIsRUFBMkNGLFNBQTNDO0FBQ0FDLG1CQUFPQyxXQUFQLENBQW1CLFFBQW5CLEVBQTZCRixTQUE3QjtBQUNIO0FBQ0osS0FSRDtBQVNBLFFBQUlBLFlBQVksU0FBWkEsU0FBWSxHQUFXO0FBQ3ZCLFlBQUcsQ0FBQ0wsS0FBRCxLQUFXRSxTQUFTQyxnQkFBVCxJQUE2QkssTUFBTUMsSUFBTixLQUFlLE1BQTVDLElBQXNEUCxTQUFTUSxVQUFULEtBQXdCLFVBQXpGLENBQUgsRUFBeUc7QUFDckdWLG9CQUFRLElBQVI7QUFDQUM7QUFDQUY7QUFDSDtBQUNKLEtBTkQ7O0FBUUEsUUFBR0csU0FBU1EsVUFBVCxLQUF3QixVQUEzQixFQUF1QztBQUNuQ1g7QUFDSCxLQUZELE1BRU8sSUFBR0csU0FBU0MsZ0JBQVosRUFBOEI7QUFDakNELGlCQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENFLFNBQTlDO0FBQ0FDLGVBQU9ILGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDRSxTQUFoQztBQUNILEtBSE0sTUFHQTtBQUNISCxpQkFBU1MsV0FBVCxDQUFxQixvQkFBckIsRUFBMkNOLFNBQTNDO0FBQ0FDLGVBQU9LLFdBQVAsQ0FBbUIsUUFBbkIsRUFBNkJOLFNBQTdCOztBQUVBLFlBQUlPLE1BQU0sS0FBVjs7QUFFQSxZQUFJO0FBQ0FBLGtCQUFNTixPQUFPTyxZQUFQLElBQXVCLElBQXZCLElBQStCWCxTQUFTWSxlQUE5QztBQUNILFNBRkQsQ0FFRSxPQUFNQyxDQUFOLEVBQVMsQ0FBRTs7QUFFYixZQUFHSCxPQUFPQSxJQUFJSSxRQUFkLEVBQXdCO0FBQ3BCLGFBQUMsU0FBU0MsV0FBVCxHQUF1QjtBQUNwQixvQkFBR2pCLEtBQUgsRUFBVTs7QUFFVixvQkFBSTtBQUNBWSx3QkFBSUksUUFBSixDQUFhLE1BQWI7QUFDSCxpQkFGRCxDQUVFLE9BQU1ELENBQU4sRUFBUztBQUNQLDJCQUFPRyxXQUFXRCxXQUFYLEVBQXdCLEVBQXhCLENBQVA7QUFDSDs7QUFFRGpCLHdCQUFRLElBQVI7QUFDQUM7QUFDQUY7QUFDSCxhQVpEO0FBYUg7QUFDSjtBQUNKLENBbkRELEVBbURHLFlBQVU7QUFBRW9CLFFBQUlDLElBQUo7QUFBYSxDQW5ENUIiLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciByZWFkeSA9IGZhbHNlO1xuXG4gICAgdmFyIGRldGFjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGNvbXBsZXRlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kZXRhY2hFdmVudChcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCBjb21wbGV0ZWQpO1xuICAgICAgICAgICAgd2luZG93LmRldGFjaEV2ZW50KFwib25sb2FkXCIsIGNvbXBsZXRlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGNvbXBsZXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighcmVhZHkgJiYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgfHwgZXZlbnQudHlwZSA9PT0gXCJsb2FkXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSkge1xuICAgICAgICAgICAgcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgZGV0YWNoKCk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBjb21wbGV0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCk7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCBjb21wbGV0ZWQpO1xuXG4gICAgICAgIHZhciB0b3AgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdG9wID0gd2luZG93LmZyYW1lRWxlbWVudCA9PSBudWxsICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfSBjYXRjaChlKSB7fVxuXG4gICAgICAgIGlmKHRvcCAmJiB0b3AuZG9TY3JvbGwpIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiBzY3JvbGxDaGVjaygpIHtcbiAgICAgICAgICAgICAgICBpZihyZWFkeSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wLmRvU2Nyb2xsKFwibGVmdFwiKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoc2Nyb2xsQ2hlY2ssIDUwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICB9XG59KShmdW5jdGlvbigpeyBhcHAuaW5pdCgpOyB9KTsiXX0=
