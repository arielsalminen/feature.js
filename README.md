# Feature.js

Feature.js is a fast, simple and lightweight browser feature detection library. It has no dependencies and weighs only 1kb minified and gzipped. Feature.js automatically initializes itself on page load, so you don’t have to. It doesn’t, however, run any tests while initializing, so it will only ever run them when you ask it to. This makes it perform very fast.

With [Feature.js](http://featurejs.com/), it’s simple to build progressively enhanced experiences that use feature detection to determine if a code can be executed in the user’s browser.



## How to use

First, include the script somewhere on your page — usually either in the ```<head>``` or just before the  ```</body>``` closing tag. No need to initialize or do anything else really, all the feature tests are now available for usage:

```javascript
if (feature.webGL) {
  console.log("WebGL supported");
} else {
  console.log("WebGL not supported");
}
```

If you want to add a class to the ```<html>``` element like [Modernizr](http://modernizr.com) does when something is supported, that’s simple:

```javascript
if (feature.webGL) {
  document.documentElement.className += " webgl";
}
```

If you’re using [jQuery](http://jquery.com/), it’s even more simple:

```javascript
if (feature.webGL) {
  $("html").addClass("webgl");
}
```

Combining multiple feature tests is possible too, you can just write an if statement like:

```javascript
if (feature.canvas && feature.webGL) {
  console.log("Canvas and WebGL are supported")
}
```

When you want to target JavaScript only towards browsers that support the features you need, you can check inside a function if the tests return false and stop further execution:

```javascript
(function() {
  if (!feature.webGL || !feature.svg) {
    throw new Error("WebGL or SVG isn’t supported");
  }
  console.log("Browser supports both WebGL & SVG");
})();
```



## Gotchas

There are few gotchas related to browser feature detection in general and these things are good to keep in mind when using the Feature.js library.

**TOUCH:** Feature.js tries to detect if touch events are supported, but this doesn’t necessarily reflect a touch screen device. Sometimes you might get a false positive on a device that doesn’t really have touchscreen since it’s virtually [impossible](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/) nowadays to detect this accurately. For 95-98% of the time this test should be correct though, but you should always keep this in mind when using this detection.

**CSS 3D TRANSFORMS:** Current implementation might give false positive on some older Android stock WebKits in very rare cases. [This issue](https://github.com/viljamis/feature.js/issues/1) is currently being tracked and will be addressed in the future releases if needed.

**DEVICE MOTION & ORIENTATION:** Keep in mind that many desktop browsers support these event listeners, and will hence give a positive result even though the device might not have the [needed sensors](http://www.html5rocks.com/en/tutorials/device/orientation/).

**PLACEHOLDERS:** Feature.js gives false negative for iOS 3 Safari, but since this OS has basically no users, it’s not considered an issue at the moment.



## API reference

Below you’ll find a list of all the available browser feature tests and how to call them.

```javascript
feature.async
feature.addEventListener
feature.canvas
feature.classList
feature.cors
feature.contextMenu
feature.css3Dtransform
feature.cssTransform
feature.cssTransition
feature.defer
feature.deviceMotion
feature.deviceOrientation
feature.geolocation
feature.historyAPI
feature.placeholder
feature.localStorage
feature.matchMedia
feature.pictureElement
feature.querySelectorAll
feature.remUnit
feature.serviceWorker
feature.sizes
feature.srcset
feature.svg
feature.touch
feature.viewportUnit
feature.webGL
```



## Live demo

* Official site with live tests: [http://featurejs.com](http://featurejs.com)
* Test with actual features: [http://featurejs.com/test](http://featurejs.com/test)



## Download

* [Download the latest release](https://github.com/viljamis/feature.js/archive/master.zip)
* Install by running `npm install feature.js`



## Working on the project

Local development requires both Node and Gulp. You can install Node by visiting [nodejs.org](http://nodejs.org) and following the website’s instructions. If you have Node.js already installed, you can proceed by installing npm and its dependencies:

```shell
$ npm install

// If you’re getting an error about permissions you might have to use sudo:
$ sudo npm install
```

To build feature.min.js run the following command:

```shell
$ gulp build
```



## Tested on the following platforms

* iOS 3.0+
* Android 1.6+
* Windows Phone 7.0+
* Blackberry 3.0+
* Blackberry Tablet 1.0+
* Jolla 1.0+
* Kindle 3.3+
* Maemo 5.0+
* Meego 1.2+
* Symbian 3
* Symbian Belle
* Symbian S40 Asha
* webOS 2.0+
* Windows XP+ (IE6 and up)
* Mac OS X



## License

The MIT License (MIT)

Copyright (c) 2016 [Viljami Salminen](https://viljamis.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



## Changelog

`1.0.1` (2016-01-31) - Code optimization, gulp build task, npm support.

`1.0.0` (2016-01-09) - Initial release.
