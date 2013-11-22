(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.scrollspy = function (article, options) {
        var $this = $(this),
            lastId,
            auto_id = 0;

	options = options || { 'minItems' : 1 };

        if ($(article).find("h2").length < options.minItems) {
            $this.remove();
	    return;
	}

        var scrollItems = $(article).find("h2,h3").map(function() { return $(this); });
        $(article).find("h2").map(function() {
            var id = $(this).attr("id"),
                h3s = $(this).nextUntil("h2", "h3");

            if (typeof(id) === "undefined") {
                id = "scrollspy_auto_" + auto_id++;
                $(this).attr("id", id);
            }

            var li = $(document.createElement("li"))
                .html('<a href="#' + id + '">' + $(this).html() + '</a>');
            if (h3s.length > 0) {
                var ul = $(document.createElement("ul"));
                $.each(h3s, function(idx, val) {
                    var id = $(val).attr("id");
                    if (typeof(id) === "undefined") {
                        id = "scrollspy_auto_" + auto_id++;
                        $(val).attr("id", id);
                    }
                    $(document.createElement("li"))
                        .html('<a href="#' + id + '">' + $(val).html() + '</a>')
                        .appendTo(ul);
                });
                li.append(ul);
            }
            $this.append(li[0]);
        });

        var menuItems = $this.find("a");

        menuItems.click(function(e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top+1;
            $('html, body').stop().animate({ 
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function(){
            // Get container scroll position
            var fromTop = $(this).scrollTop();
   
            // Get id of current scroll item
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });

            // Get the id of the current element
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
   
            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=#"+id+"]").parent().addClass("active");
                $this.children("li").has("li.active").addClass("active");
            }
        });
    }
}));
