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
            $('.zoom').magnificPopup({
                type: 'image',
                preloader: true,
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    easing: 'ease-in-out',
                    opener: function opener(openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                },
                closeOnContentClick: true
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubWFnbmlmaWMuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzXyIsIm1hZ25pZmljIiwiYmluZCIsIiQiLCJtYWduaWZpY1BvcHVwIiwidHlwZSIsInByZWxvYWRlciIsImdhbGxlcnkiLCJlbmFibGVkIiwiem9vbSIsImR1cmF0aW9uIiwiZWFzaW5nIiwib3BlbmVyIiwib3BlbmVyRWxlbWVudCIsImlzIiwiZmluZCIsImNsb3NlT25Db250ZW50Q2xpY2siLCJpbml0IiwiY29uZmlnIiwiX2V4dGVuZCIsImRvY3VtZW50Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1BLE9BQU8sRUFBakI7O0FBRUEsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWDs7QUFFQSxRQUFJQyxNQUFKOztBQUVBRixRQUFJRyxRQUFKLEdBQWU7O0FBRVhDLGNBQU0sZ0JBQ047QUFDSUMsY0FBRSxPQUFGLEVBQVdDLGFBQVgsQ0FBeUI7QUFDckJDLHNCQUFLLE9BRGdCO0FBRXJCQywyQkFBVyxJQUZVO0FBR3JCQyx5QkFBUztBQUNMQyw2QkFBUztBQURKLGlCQUhZO0FBTXJCQyxzQkFBTTtBQUNGRCw2QkFBUyxJQURQO0FBRUZFLDhCQUFVLEdBRlI7QUFHRkMsNEJBQVEsYUFITjtBQUlGQyw0QkFBUSxnQkFBU0MsYUFBVCxFQUF3QjtBQUM1QiwrQkFBT0EsY0FBY0MsRUFBZCxDQUFpQixLQUFqQixJQUEwQkQsYUFBMUIsR0FBMENBLGNBQWNFLElBQWQsQ0FBbUIsS0FBbkIsQ0FBakQ7QUFDSDtBQU5DLGlCQU5lO0FBY3JCQyxxQ0FBcUI7QUFkQSxhQUF6QjtBQWdCSCxTQXBCVTs7QUFzQlhDLGNBQU0sY0FBU0MsTUFBVCxFQUNOO0FBQ0lsQixxQkFBUyxJQUFUOztBQUVBLGdCQUFJLE9BQU9rQixNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSWxCLHVCQUFPa0IsTUFBUCxHQUFnQnBCLElBQUlxQixPQUFKLENBQVluQixPQUFPa0IsTUFBbkIsRUFBMkJBLE1BQTNCLENBQWhCO0FBQ0g7O0FBRURsQixtQkFBT0UsSUFBUDtBQUNIOztBQWhDVSxLQUFmO0FBb0NILENBekNELEVBeUNHa0IsU0FBU3JCLElBekNaIiwiZmlsZSI6Il9hcHAubWFnbmlmaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oYm9keSl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgX3RoaXNfO1xuXG4gICAgYXBwLm1hZ25pZmljID0ge1xuXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnLnpvb20nKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgICAgICAgICB0eXBlOidpbWFnZScsXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdhbGxlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgem9vbToge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlLWluLW91dCcsXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lcjogZnVuY3Rpb24ob3BlbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZW5lckVsZW1lbnQuaXMoJ2ltZycpID8gb3BlbmVyRWxlbWVudCA6IG9wZW5lckVsZW1lbnQuZmluZCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZylcbiAgICAgICAge1xuICAgICAgICAgICAgX3RoaXNfID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF90aGlzXy5jb25maWcgPSBhcHAuX2V4dGVuZChfdGhpc18uY29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpc18uYmluZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KShkb2N1bWVudC5ib2R5KTsiXX0=

'use strict';

var app = app || {};

(function (body) {
    "use strict";

    var _this_;

    app.modal = {

        config: {
            prefix: 'tmpl-modal-',
            trigger: '.j-open-popup'
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
            $('body').on('click', _this_.config.trigger, function (e) {
                e.preventDefault();

                var selector = $(this).data('target') || $(this).attr('href'),
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubW9kYWwuanMiXSwibmFtZXMiOlsiYXBwIiwiYm9keSIsIl90aGlzXyIsIm1vZGFsIiwiY29uZmlnIiwicHJlZml4IiwidHJpZ2dlciIsInByZXBhcmUiLCJzZWxlY3RvciIsIm5lc3RlZCIsImxlbmd0aCIsInN1YnN0ciIsImluZGV4T2YiLCJzcGxpdCIsIl9vcGVuIiwiY2hhbmdlIiwiZmluZCIsImFkZENsYXNzIiwic2V0VGltZW91dCIsImF1dG9zaXplIiwiJCIsImJpbmQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJhdHRyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlbXBsYXRlIiwiYXBwZW5kIiwiaW5pdCIsIl9leHRlbmQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUEsT0FBTyxFQUFqQjs7QUFFQSxDQUFDLFVBQVNDLElBQVQsRUFBYztBQUNYOztBQUVBLFFBQUlDLE1BQUo7O0FBRUFGLFFBQUlHLEtBQUosR0FBWTs7QUFFUkMsZ0JBQVE7QUFDSkMsb0JBQVEsYUFESjtBQUVKQyxxQkFBUztBQUZMLFNBRkE7O0FBT1JDLGlCQUFTLGlCQUFTQyxRQUFULEVBQ1Q7QUFDSSxnQkFBSUMsU0FBUyxFQUFiOztBQUVBLGdCQUFJLE9BQU9ELFFBQVAsS0FBcUIsV0FBckIsSUFBb0NBLFNBQVNFLE1BQVQsR0FBa0IsQ0FBMUQsRUFDQTtBQUNJLG9CQUFJRixTQUFTRyxNQUFULENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEtBQXlCLEdBQTdCLEVBQ0E7QUFDSUgsK0JBQVdBLFNBQVNHLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBWDtBQUNIOztBQUVELG9CQUFJSCxTQUFTSSxPQUFULENBQWlCLEdBQWpCLEtBQXlCLENBQTdCLEVBQ0E7QUFDSUgsNkJBQVNELFNBQVNLLEtBQVQsQ0FBZSxHQUFmLENBQVQ7QUFDQUwsK0JBQVdDLE9BQU8sQ0FBUCxDQUFYO0FBQ0g7O0FBRURELDJCQUFXTixPQUFPRSxNQUFQLENBQWNDLE1BQWQsR0FBd0JHLFFBQW5DO0FBQ0g7O0FBRUQsbUJBQU9BLFFBQVA7QUFDSCxTQTVCTzs7QUE4QlJNLGVBQU8sZUFBU1gsS0FBVCxFQUNQO0FBQ0ksZ0JBQUlZLFNBQVNaLE1BQU1hLElBQU4sQ0FBVyxlQUFYLENBQWI7O0FBRUFiLGtCQUFNYyxRQUFOLENBQWUsU0FBZjtBQUNBRixtQkFBT0UsUUFBUCxDQUFnQixTQUFoQjs7QUFFQUMsdUJBQVcsWUFBVTtBQUNqQmYsc0JBQU1jLFFBQU4sQ0FBZSxZQUFmO0FBQ0FGLHVCQUFPRSxRQUFQLENBQWdCLFlBQWhCOztBQUVBRSx5QkFBU0MsRUFBRWpCLEtBQUYsRUFBU2EsSUFBVCxDQUFjLFVBQWQsQ0FBVDtBQUNILGFBTEQsRUFLRyxFQUxIOztBQU9BSSxjQUFFLE1BQUYsRUFBVWQsT0FBVixDQUFrQixZQUFsQixFQUFnQ0gsS0FBaEM7QUFDSCxTQTdDTzs7QUErQ1JrQixjQUFNLGdCQUNOO0FBQ0lELGNBQUUsTUFBRixFQUFVRSxFQUFWLENBQWEsT0FBYixFQUFzQnBCLE9BQU9FLE1BQVAsQ0FBY0UsT0FBcEMsRUFBNkMsVUFBU2lCLENBQVQsRUFBVztBQUNwREEsa0JBQUVDLGNBQUY7O0FBRUEsb0JBQUloQixXQUFXWSxFQUFFLElBQUYsRUFBUUssSUFBUixDQUFhLFFBQWIsS0FBMEJMLEVBQUUsSUFBRixFQUFRTSxJQUFSLENBQWEsTUFBYixDQUF6QztBQUFBLG9CQUNJdkIsUUFBUSxJQURaOztBQUdBLG9CQUFJd0IsU0FBU0MsY0FBVCxDQUF3QjFCLE9BQU9LLE9BQVAsQ0FBZUMsUUFBZixDQUF4QixNQUFzRCxJQUExRCxFQUNBO0FBQ0lMLDRCQUFRaUIsRUFBRVMsU0FBUzNCLE9BQU9LLE9BQVAsQ0FBZUMsUUFBZixDQUFULEVBQW1DLEVBQW5DLENBQUYsQ0FBUjs7QUFFQVksc0JBQUUsTUFBRixFQUFVVSxNQUFWLENBQWlCM0IsS0FBakI7O0FBRUFELDJCQUFPWSxLQUFQLENBQWFYLEtBQWI7QUFDSDs7QUFFRCx1QkFBTyxDQUFDLENBQVI7QUFDSCxhQWhCRDtBQWlCSCxTQWxFTzs7QUFvRVI0QixjQUFNLGNBQVMzQixNQUFULEVBQ047QUFDSUYscUJBQVMsSUFBVDs7QUFFQSxnQkFBSSxPQUFPRSxNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSUYsdUJBQU9FLE1BQVAsR0FBZ0JKLElBQUlnQyxPQUFKLENBQVk5QixPQUFPRSxNQUFuQixFQUEyQkEsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFREYsbUJBQU9tQixJQUFQO0FBQ0g7O0FBOUVPLEtBQVo7QUFrRkgsQ0F2RkQsRUF1RkdNLFNBQVMxQixJQXZGWiIsImZpbGUiOiJfYXBwLm1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKGJvZHkpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIF90aGlzXztcblxuICAgIGFwcC5tb2RhbCA9IHtcblxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHByZWZpeDogJ3RtcGwtbW9kYWwtJyxcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuai1vcGVuLXBvcHVwJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHByZXBhcmU6IGZ1bmN0aW9uKHNlbGVjdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmVzdGVkID0gW107XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc2VsZWN0b3IpICE9PSAndW5kZWZpbmVkJyAmJiBzZWxlY3Rvci5sZW5ndGggPiAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5zdWJzdHIoMCwgMSkgPT0gJyMnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLmluZGV4T2YoJy8nKSA+PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmVzdGVkID0gc2VsZWN0b3Iuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBuZXN0ZWRbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBfdGhpc18uY29uZmlnLnByZWZpeCAgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vcGVuOiBmdW5jdGlvbihtb2RhbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG1vZGFsLmZpbmQoJ1tkYXRhLWNoYW5nZV0nKTtcblxuICAgICAgICAgICAgbW9kYWwuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIGNoYW5nZS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbW9kYWwuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUnKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2UuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBhdXRvc2l6ZSgkKG1vZGFsKS5maW5kKCd0ZXh0YXJlYScpKTtcbiAgICAgICAgICAgIH0sIDEwKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ21vZGFsLm9wZW4nLCBtb2RhbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmluZDogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgX3RoaXNfLmNvbmZpZy50cmlnZ2VyLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpIHx8ICQodGhpcykuYXR0cignaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoX3RoaXNfLnByZXBhcmUoc2VsZWN0b3IpKSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsID0gJCh0ZW1wbGF0ZShfdGhpc18ucHJlcGFyZShzZWxlY3RvciksIHt9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChtb2RhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfLl9vcGVuKG1vZGFsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZylcbiAgICAgICAge1xuICAgICAgICAgICAgX3RoaXNfID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF90aGlzXy5jb25maWcgPSBhcHAuX2V4dGVuZChfdGhpc18uY29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpc18uYmluZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KShkb2N1bWVudC5ib2R5KTsiXX0=

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
