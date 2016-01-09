/*!
 * FeatureJS.com v1.0
 * http://featurejs.com
 */

 /* global feature, smoothScroll */
(function (window, document, undefined) {
  "use strict";

  /**
   * The FeatureJScom object
   *
   * @constructor
   */
  function FeatureJScom() {
    this.ua = navigator.userAgent;
    this.dummy = document.createElement("div");
    this.results = document.getElementById("results");
    this.timer = false;
  }

  FeatureJScom.prototype = {
    constructor : FeatureJScom,

    /**
     * Intializes the instance
     *
     * @function
     */
    init : function() {
      var self = this;

      // Hide no JavaScript message
      var nojs = document.getElementById("no-js");
      nojs.style.display = "none";

      // Add hover for touch screens
      if (feature.addEventListener) {
        document.addEventListener("touchstart", function(){}, true);
      }

      // Run tests!
      this.tests();
      this.testAll();
      this.preventMaskUsage();

      // Stop if the browser doesn't have the needed features
      if (!feature.querySelectorAll || !feature.addEventListener ||
          !feature.classList) {
        return;
      }

      if (feature.css3Dtransform) {
        document.documentElement.className += " css3dtransform";
      }

      // Continue if the browser has enough support…
      smoothScroll.init({ speed: 700, offset: 30 });
      window.addEventListener("resize", this.header, false);
      setTimeout(function() {
        window.addEventListener("scroll", self.notice, false);
      }, 500);
      this.sectionLinks();
      this.navigation();
      this.header();
      this.notice();
    },

    /**
     * forEach method
     *
     * @param  {array} array to loop through
     * @param  {function} callback function
     * @param  {object} context
     */
    forEach : function(array, callback, context) {
      var length = array.length;
      var cont, i;
      for (i = 0; i < length; i++) {
        cont = callback.call(context, i, array[i]);
        if (cont === false) {
          break; // Allow early exit
        }
      }
    },

    /**
     * Simple logger
     *
     * @param  {boolean} support, true or false
     * @param  {string} feature name
     */
    logger : function(support, value) {
      var yes = " supported";
      var no = " not supported by your browser!";

      this.dummy.innerHTML +=
        "<li class='" + (support ? "yes" : "no") + "'>" +
          "<em>" +
            "<abbr title='" + (support ? value + yes : value + no) + "'>" +
              value +
            (support ? "</abbr>" : "<b>!</b></abbr>") +
          "</em>" +
        "</li>";
    },

    /**
     * Handle element focus
     *
     * @param  {Element} element
     */
    focus : function(elem) {
      setTimeout(function() {
        elem.classList.add("focus");
      }, 650);
      setTimeout(function() {
        elem.classList.remove("focus");
      }, 1500);
    },

    /**
     * Simple append method
     *
     * @param  {string}  markup
     * @param  {element} target
     */
    append : function(markup, target) {
      target.innerHTML += " " + markup;
    },

    /**
     * Run all the tests and log results
     *
     * @function
     */
    tests : function() {
      this.logger(feature.addEventListener, "AddEventListener");
      this.logger(feature.async, "Async attribute");
      this.logger(feature.canvas, "Canvas");
      this.logger(feature.classList, "ClassList API");
      this.logger(feature.cors, "CORS API");
      this.logger(feature.contextMenu, "Context Menu");
      this.logger(feature.css3Dtransform, "CSS 3D transform");
      this.logger(feature.cssTransform, "CSS transform");
      this.logger(feature.cssTransition, "CSS transition");
      this.logger(feature.defer, "Defer attribute");
      this.logger(feature.deviceOrientation, "DeviceOrientation");
      this.logger(feature.deviceMotion, "DeviceMotion");
      this.logger(feature.geolocation, "Geolocation");
      this.logger(feature.historyAPI, "History API");
      this.logger(feature.placeholder, "Input Placeholder");
      this.logger(feature.localStorage, "LocalStorage");
      this.logger(feature.matchMedia, "MatchMedia");
      this.logger(feature.pictureElement, "Picture element");
      this.logger(feature.querySelectorAll, "QuerySelectorAll");
      this.logger(feature.remUnit, "REM Units");
      this.logger(feature.serviceWorker, "Service Worker");
      this.logger(feature.sizes, "Sizes attribute");
      this.logger(feature.srcset, "Srcset attribute");
      this.logger(feature.svg, "SVG");
      this.logger(feature.touch, "Touch");
      this.logger(feature.viewportUnit, "Viewport Units");
      this.logger(feature.webGL, "WebGL");

      // When all test have been logged, append to DOM
      this.append(this.dummy.innerHTML, this.results);
    },

    /**
     * Handle a special case when all features are supported
     *
     * @function
     */
    testAll : function() {
      if (feature.addEventListener && feature.async &&
          feature.canvas && feature.classList &&
          feature.cors && feature.contextMenu &&
          feature.css3Dtransform && feature.cssTransform &&
          feature.cssTransition && feature.defer &&
          feature.deviceOrientation && feature.deviceMotion &&
          feature.geolocation && feature.historyAPI &&
          feature.placeholder && feature.localStorage &&
          feature.matchMedia && feature.pictureElement &&
          feature.querySelectorAll && feature.remUnit &&
          feature.sizes && feature.srcset && feature.svg &&
          feature.touch && feature.viewportUnit &&
          feature.webWorker && feature.webGL
      ) {
        this.results.classList.add("all");
      }
    },

    /**
     * Build section links
     *
     * @function
     */
    sectionLinks : function() {
      var headers = document.querySelectorAll("h3");
      if (headers) {
        this.forEach(headers, function (i) {
          var link = document.createElement("a");
          var id = "#" + headers[i].id;
          link.setAttribute("href", id);
          link.setAttribute("title", "Right click to copy a link to " + id);
          link.className = "section-id";
          link.innerHTML = "#";
          headers[i].appendChild(link);
        });
      }
    },

    /**
     * Build navigation
     *
     * @function
     */
    navigation : function() {
      var links = document.querySelectorAll("nav a");
      var active = "active";
      var self = this;

      this.forEach(links, function (i) {

        // Mouse over
        links[i].addEventListener("mouseover", function() {
          window.clearTimeout(self.timer);
          self.forEach(links, function (i) {
            links[i].parentNode.classList.remove(active);
          });
          links[i].parentNode.classList.add(active);
        }, false);

        // Mouse out
        links[i].addEventListener("mouseout", function() {
          self.forEach(links, function (i) {
            links[i].parentNode.classList.remove(active);
          });
          if (links[i] === links[0]) {
            links[0].parentNode.classList.add(active);
          } else {
            self.timer = window.setTimeout(function () {
              links[0].parentNode.classList.add(active);
            }, 300);
          }
        }, false);
      });

      // click
      links[1].addEventListener("click", function() {
        self.focus(document.querySelector("#how-to-use"));
      }, false);
      links[2].addEventListener("click", function() {
        self.focus(document.querySelector("#download .btn"));
      }, false);
    },

    /**
     * Prevent usage of CSS Masks for certain platforms
     *
     * @function
     */
    preventMaskUsage : function() {
      if ((this.ua.search("windows phone os 7") > -1) ||
          (this.ua.search("android 2") > -1) ||
          (this.ua.search("linux; hpwos") > -1) ||
          (this.ua.search("webos") > -1) ||
          (this.ua.search("series60") > -1)
         ) {
           document.documentElement.className += " nomask";
      }
    },

    /**
     * Fixed header height for tiny screens
     *
     * @param  {event} the window.resize event
     */
    header : function(event) {
      var width = window.innerWidth;
      var header = document.querySelector("header");

      if (header) {
        if (!event && width < 860 && width > 300) {
          header.style.height = window.innerHeight + "px";
        } else if (event && header.hasAttribute("style") && width > 860) {
          header.removeAttribute("style");
        } else if (width < 300) {
          header.removeAttribute("style");
        }
      }
    },

    /**
     * Dismissable notice message
     *
     * @function
     */
    notice : function() {
      if (feature.localStorage && !localStorage.getItem("featurejs")) {
        var self = this;
        var width = window.innerWidth;
        var notice = document.querySelector(".notice");
        var scrollTop = window.pageYOffset;

        if (scrollTop > 1500 && width > 300) {
          notice.classList.add("active");
        } else {
          notice.classList.remove("active");
        }

        notice.addEventListener("click", function(e) {
          e.preventDefault();
          notice.classList.remove("active");
          window.removeEventListener("scroll", self.notice, false);
          localStorage.setItem("featurejs", "true");
        }, false);
      }
    }

  };

  /**
   * Initialize
   */
  function init() {
    var website = new FeatureJScom();
    website.init();
  }
  init();

}(window, document));
