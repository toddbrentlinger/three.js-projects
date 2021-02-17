"use strict";

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene/Camera/Renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, // FOV (degrees)
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load 3D Model

const loader = new GLTFLoader();
let monkey;
loader.load(
    // resource URL - Walther PPK Original.gltf | monkey.glb
    './monkey.glb',
    // called when the resource is loaded
    function (gltf) {
        scene.add(gltf.scene);
        monkey = gltf.scene.children[0];
        console.log(monkey);
        // Material
        monkey.material.color = new THREE.Color(0xCD853F);
        // Animate
        animate();
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.error(error);
    }
);

// Render/Animate loop

function animate() {
    requestAnimationFrame(animate);
    monkey.rotation.x += 0.01;
    monkey.rotation.y += 0.01;
    renderer.render(scene, camera);
}