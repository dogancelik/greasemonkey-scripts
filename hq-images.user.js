// ==UserScript==
// @name        HQ Images
// @namespace   dogancelik.com
// @include     https://pbs.twimg.com/media/*
// @include     https://*.media.tumblr.com/*
// @include     https://*.pinimg.com/*
// @include     https://data*.whicdn.com/*
// @include     https://scontent*.cdninstagram.com/*
// @include     https://instagram.*.fbcdn.net/*
// @include     https://media*.popsugar-assets.com/*
// @include     https://*.bp.blogspot.com/*
// @include     https://static.wixstatic.com/*
// @updateURL   https://github.com/dogancelik/userscripts/raw/master/hq-images.user.js
// @version     1.1.1
// @grant       none
// ==/UserScript==

function getRoot () {
  return location.hostname.match(/[\w\-]+\.\w+$/)[0];
}

var redirects = {};

redirects['twimg.com'] = function () {
  if (location.pathname.indexOf(':orig') === -1) {
    location.pathname = location.pathname.replace(/(\/media\/[\w\-]+\.\w{3})(:\w+)?/, '$1:orig');
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
  var size = /s[0-9]+x[0-9]+\//i;
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
  if (location.pathname.indexOf('/s1600/') === -1) {
    location.pathname = location.pathname.replace(/\/s[0-9]+\//, '/s1600/');
  }
};

redirects['wixstatic.com'] = function () {
  if (location.pathname.indexOf('/v1/') > -1) {
    location.pathname = location.pathname.split('/').slice(0, 3).join('/');
  }
};

redirects[getRoot()]();
