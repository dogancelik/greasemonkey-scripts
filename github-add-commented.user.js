// ==UserScript==
// @name        Github Add Commented
// @description Add "Commented" button to Issues page
// @namespace   dogancelik.com
// @include     https://github.com/issues/*
// @include     https://github.com/issues?*
// @include     https://github.com/issues
// @version     1.1.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @updateURL   https://github.com/dogancelik/userscripts/raw/master/github-add-commented.user.js
// @grant       none
// ==/UserScript==

/* eslint-env jquery */

function getUsername () {
	return document.querySelector('.header-nav-current-user .css-truncate-target').textContent.trim();
}

function getQuery () {
	return 'is:open is:issue commenter:' + getUsername();
}

function isAdded (links) {
	return links.innerHTML.indexOf('Commented') > -1;
}

function add (links) {
	var html = '<a href="/issues?q=::query::" aria-label="Issues commented by you" class="js-selected-navigation-item subnav-item" data-selected-links="dashboard_commented /issues?q=::query::" role="tab">Commented</a>';
	var query = encodeURIComponent(getQuery());
	if (window.location.search.indexOf(query) > -1) {
		html = html.replace('js-selected-navigation-item', 'js-selected-navigation-item selected');
	}
	links.innerHTML = links.innerHTML + html.replace(/::query::/g, query);
}

function removeCommenter (i, e) {
	var deleteQuery = encodeURIComponent('commenter:' + getUsername());
	e.href = e.href.replace(deleteQuery,'');
}

function check () {
	var links = document.querySelector('.subnav-links');

	if (links != null && !isAdded(links)) {
		add(links);
		$(links).find('a').on('click', check).slice(0, 3).each(removeCommenter);
	} else setTimeout(check, 50);
}

$('#js-pjax-container').on('pjax:end', check);
check();
