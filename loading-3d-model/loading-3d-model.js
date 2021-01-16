"use strict";

//import * as THREE from 'three';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// Scene/Camera/Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, // FOV (degrees)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Light

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// Load 3D Model

const loader = new GLTFLoader();

loader.load('Walther PPK Original.gltf', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// Render/Animate loop

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();