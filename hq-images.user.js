// ==UserScript==
// @name        HQ Images
// @namespace   dogancelik.com
// @include     https://pbs.twimg.com/*
// @include     https://*.media.tumblr.com/*
// @include     https://*.pinimg.com/*
// @include     https://data*.whicdn.com/*
// @include     https://scontent*.cdninstagram.com/*
// @include     https://instagram.*.fbcdn.net/*
// @include     https://media*.popsugar-assets.com/*
// @include     https://*.bp.blogspot.com/*
// @include     https://*.googleusercontent.com/*
// @include     https://static.wixstatic.com/*
// @include     https://*.files.wordpress.com/*
// @include     https://*.static.flickr.com/*
// @include     https://yt*.ggpht.com/*
// @include     https://i*.pximg.net/*
// @updateURL   https://github.com/dogancelik/userscripts/raw/master/hq-images.user.js
// @version     1.8.0
// @grant       none
// ==/UserScript==

function getRoot () {
  return location.hostname.match(/[\w\-]+\.\w+$/)[0];
}

var redirects = {};

redirects['twimg.com'] = function () {
  if (location.pathname.includes('profile_images/')) {
    var rgx = /(\w{8})(_\w+)(\.jpg)/;
    if (rgx.test(location.pathname)) {
      location.pathname = location.pathname.replace(rgx, '$1$3');
    } 
  } else if (location.pathname.includes('media/')) {
    if (location.pathname.indexOf(':orig') === -1) {
      location.pathname = location.pathname.replace(/(\/media\/[\w\-]+\.\w{3})(:\w+)?/, '$1:orig');
    }
  }
};

redirects['tumblr.com'] = function () {
  if (location.pathname.indexOf('_1280.') === -1 && location.pathname.indexOf('avatar_') === -1) {
    location.pathname = location.pathname.replace(/_\d+\.(\w+)$/, '_1280.$1');
  }
};

redirects['pinimg.com'] = function () {
  if (location.pathname.indexOf('originals') === -1) {
    location.pathname = location.pathname.replace(/^\/\d+x/,'/originals');
  }
};

redirects['whicdn.com'] = function () {  
  if (location.pathname.indexOf('original.') === -1) {
    location.pathname = location.pathname.replace(/\w+\./, 'original.');
  }
};

redirects['cdninstagram.com'] = function () {
  var size = /(s|p)[0-9]+x[0-9]+\//i;
  if (size.test(location.pathname)) {
    location.pathname = location.pathname.replace(size, '');
  }
};

redirects['fbcdn.net'] = redirects['cdninstagram.com']; // instagram

redirects['popsugar-assets.com'] = function () {
  if (location.pathname.indexOf('thumbor') > -1) {
    location.pathname = location.pathname.replace(/\/thumbor.*filters[^\/]+/i, '');
  }
};

redirects['blogspot.com'] = function () {
  if (location.host.indexOf('webcache') > -1) return;
  
  if (location.pathname.indexOf('/s1600/') === -1) {
    var pn = location.pathname.replace(/\/((s|w)[0-9]+(\-h[0-9]+)?)(-h)?\//, '/s1600/');
    if (pn.indexOf('s1600') === -1) {
      var a = location.pathname.split('/');
      a.splice(-1, 0, 's1600');
      location.pathname = a.join('/');
    } else {
      location.pathname = pn;
    }
  }
};

redirects['googleusercontent.com'] = redirects['blogspot.com'];

redirects['wixstatic.com'] = function () {
  if (location.pathname.indexOf('/v1/') > -1) {
    location.pathname = location.pathname.split('/').slice(0, 3).join('/');
  }
};

redirects['wordpress.com'] = function () {
  if (location.search.length > 0) {
    location.search = '';
  }
};

redirects['wp.com'] = redirects['wordpress.com'];

redirects['flickr.com'] = function () {
  if (location.pathname.indexOf('_o.') === -1 && location.pathname.indexOf('_z.') === -1) {
    location.pathname = location.pathname.replace(/([a-z0-9]+_[a-z0-9]+)(\w*)(\.\w+)$/, '$1_z$3');
  }
};

redirects['ggpht.com'] = function () {
  var a = location.pathname.split('/');
  if (/^s[0-9]+\-/.test(a[a.length - 2])) {
    a.splice(a.length - 2, 1);
    location.pathname = a.join('/');
  }
};

redirects['pximg.net'] = function () {
  if (location.pathname.includes('img-master')) {
    var orig = location.pathname
      .replace(/c\/[0-9]+x[0-9]+\/img-master/i, 'img-original')
      .replace(/_master[0-9]+/, '');
    location.pathname = orig;
  }
}

redirects[getRoot()]();
