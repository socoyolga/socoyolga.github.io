//IIFE - Immediately Invoked Functional Expression
(
    // Load jQuery
    function (library) {

        library(window.jQuery, window, document);

    }


    (function ($, window, document) {

        function includeHTML() {
            var z, i, elmnt, file, xhttp;
            /*loop through a collection of all HTML elements:*/
            z = document.getElementsByTagName("*");
            for (i = 0; i < z.length; i++) {
                elmnt = z[i];
                /*search for elements with a certain atrribute:*/
                file = elmnt.getAttribute("include-html");
                if (file) {
                    /*make an HTTP request using the attribute value as the file name:*/
                    xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4) {
                            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                            /*remove the attribute, and call this function once more:*/
                            elmnt.removeAttribute("include-html");
                            includeHTML();
                        }
                    }
                    xhttp.open("GET", file, true);
                    xhttp.send();
                    /*exit the function:*/
                    return;
                }
            }

            $('.flexslider').flexslider({
                animation: "slide",
                slideshowSpeed: 5000,
                start: function(slider) {
                    $('body').removeClass('loading');
                }
            });

            // Load twitter widgets
            $.getScript("https://platform.twitter.com/widgets.js");
        }


        // The DOM is ready
        $(function () {
            includeHTML();

            $(document).ready(function() {
                var mq = window.matchMedia("(min-width: 990px)");
                if (mq.matches) {
                    new WOW().init();
                }
            });

            //jQuery for page scrolling feature - requires jQuery Easing plugin
            $(document).on('click', 'a.page-scroll', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset()
                        .top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });

        })
    })
)








