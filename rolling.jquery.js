/*  
 * time 2015-8-1 11:54:00
 * author Meng
 * 
 */
(function($) {
    var defaults = {
        auto: true, // 是否自动切换
        interval: 3000 // 间隔时间(毫秒)
    }

    function Tab(element, options) {
        this.warp = element;
        this.menu = element.find("div:first");
        this.cont = element.find("ul:first");
        this.timer = null;
        this.num = 0;
    }
    Tab.prototype = {
        init: function() {
            this.bind();
        },
        bind: function() {
            var _self = this;
            if (defaults.auto) {
                this.interVal();
            };
            this.menu.find("a").on("click", function() {
                var index = $(this).index();
                this.num = $(this).index();
                _self.action(index);
            });
            this.menu.find("a").on("mouseover", function() {
                _self.mouseover();
            });
            this.menu.find("a").on("mouseout", function() {
                _self.mouseout();
            });
        },
        action: function(num) {
            var menu = this.menu.find("a"),
                cont = this.cont.find('li');
            menu.each(function(index, el) {
                $(el).removeClass('active');
            });
            cont.each(function(index, el) {
                $(el).hide();
            });
            menu.eq(num).addClass('active');
            cont.eq(num).show();
        },
        interVal: function() {
            var _self = this;
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                _self.num++;
                if (_self.num === _self.menu.find("a").length) _self.num = 0;
                _self.action(_self.num);
                console.log(_self.num);
            }, defaults.interval);
        },
        mouseover: function() {
            clearInterval(this.timer);
        },
        mouseout: function() {
            if (defaults.auto) {
                this.interVal();
            };
        }
    }

    $.fn.Tab = function(options) {
        var options = $.extend(defaults, options);
        return this.each(function() {
            new Tab($(this), defaults).init();
        });
    }
})(jQuery);
