"use strict";

import printMe from './print.js';
import './style.css';
import Logo from './three-js-logo.png';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello webpack, Meet Three.js';
    element.classList.add('hello');

    const logo = new Image();
    logo.src = Logo;
    element.appendChild(logo);

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());