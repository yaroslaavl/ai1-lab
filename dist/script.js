/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var styles = {
  style1: {
    name: "style1.css",
    path: "./css/style.css"
  },
  style2: {
    name: "style2.css",
    path: "./css/style2.css"
  }
};
var currentStyleKey = "style1";
var switchButton = document.getElementById('switch-style');
function addStyleLink(href) {
  var existingStyleLink = document.getElementById('style-link');
  if (existingStyleLink) {
    existingStyleLink.href = href;
  } else {
    var styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = href;
    styleLink.id = 'style-link';
    document.head.appendChild(styleLink);
  }
}
addStyleLink(styles[currentStyleKey].path);
switchButton.addEventListener('click', function () {
  currentStyleKey = currentStyleKey === 'style1' ? 'style2' : 'style1';
  addStyleLink(styles[currentStyleKey].path);
});
/******/ })()
;