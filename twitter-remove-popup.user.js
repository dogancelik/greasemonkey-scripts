// ==UserScript==
// @name         Twitter Remove Popup
// @namespace    dogancelik.com
// @version      0.3.1
// @description  Remove scroll blocking popup
// @match        https://twitter.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

/* eslint-env jquery, browser, es2020, greasemonkey */

const sheetDialog = 'div[data-testid="sheetDialog"]';
document.arrive(`#layers ${sheetDialog} a[href="/login"]`, { existing: true }, function() {
	this.closest(sheetDialog).parentElement.remove();
});

document.arrive('#layers a[href="/i/flow/signup"]', { existing: true }, function() {
	const last = $(this).parentsUntil('#layers').last();
	if (last.find('div[aria-label="Image"]').length === 0) {
		last.remove();
	}
});

const observer = new MutationObserver(function() {
	document.firstElementChild.style.overflow = 'auto';
	document.firstElementChild.style.overscrollBehaviorY = 'auto';
});
observer.observe(document.firstElementChild, { attributes: true });
