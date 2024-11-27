/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var styles = {
  style1: {
    name: "Style 1",
    path: "./css/style.css"
  },
  style2: {
    name: "Style 2",
    path: "./css/style2.css"
  },
  style3: {
    name: "Style 3",
    path: "./css/style3.css"
  }
};
var currentStyleKey = "style1";
function addStyleLink(href) {
  var existingLink = document.getElementById("style-link");
  if (existingLink) {
    existingLink.href = href;
  } else {
    var link = document.createElement("link");
    link.id = "style-link";
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}
function generateStyleLinks() {
  var container = document.getElementById("style-links");
  if (!container) {
    console.error("Error!");
    return;
  }
  container.innerHTML = "";
  Object.keys(styles).forEach(function (key) {
    var button = document.createElement("button");
    button.textContent = styles[key].name;
    button.style.marginRight = "10px";
    if (key === currentStyleKey) {
      button.style.backgroundColor = "#007BFF";
      button.style.color = "#FFFFFF";
    } else {
      button.style.backgroundColor = "#FFFFFF";
      button.style.color = "#000000";
    }
    button.addEventListener("click", function () {
      if (key !== currentStyleKey) {
        console.log("Changing: ".concat(styles[key].name));
        switchStyle(key);
      }
    });
    console.log("Adding:", styles[key].name);
    container.appendChild(button);
  });
  var buttons = container.getElementsByTagName('button');
  console.log("Create button: ".concat(buttons.length));
}
function switchStyle(key) {
  if (!styles[key]) {
    console.warn("Style key '".concat(key, "' not found!"));
    return;
  }
  currentStyleKey = key;
  addStyleLink(styles[key].path);
  generateStyleLinks();
}
document.addEventListener("DOMContentLoaded", function () {
  addStyleLink(styles[currentStyleKey].path);
  generateStyleLinks();
});
/******/ })()
;
