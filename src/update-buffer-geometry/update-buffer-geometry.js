"use strict";

import * as THREE from 'three';
import './update-buffer-geometry.css';

const MAX_POINTS = 500;
let scene, camera, renderer;
let line, drawCount;

init();
animate();

function init() {
    // Info
    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = 'three.js animated line using BufferGeometry';
    document.body.appendChild(info);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        45, // FOV (degrees)
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane
        10000 // far clipping plane
    );
    camera.position.set(0, 0, 1000);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.BufferGeometry();

    // Attributes
    const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );

    // Draw Calls
    drawCount = 2; // draw the first 2 points only
    geometry.setDrawRange(0, drawCount);

    // Material
    const material = new THREE.LineBasicMaterial(
        { color: 0xff0000 }
    );

    // Line
    line = new THREE.Line(geometry, material);
    scene.add(line);

    // Update positions
    updatePositions();
}

function updatePositions() {
    const positions = line.geometry.attributes.position.array;

    let x, y, z, index;
    x = y = z = index = 0;

    for (let i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;

        x += (Math.random() - 0.5) * 30;
        y += (Math.random() - 0.5) * 30;
        z += (Math.random() - 0.5) * 30;
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    drawCount = (drawCount + 1) % MAX_POINTS;

    line.geometry.setDrawRange(0, drawCount);

    if (drawCount === 0) {
        // periodically generate new data
        updatePositions();
        line.geometry.attributes.position.needsUpdate = true; // required after the first render
        line.material.color.setHSL(Math.random(), 1, 0.5);
    }

    render();
}