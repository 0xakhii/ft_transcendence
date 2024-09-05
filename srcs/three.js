import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add('three-canvas');

const loader = new GLTFLoader();
let table = new THREE.Object3D();
loader.load('assets/table.glb', function (gltf) {
    table = gltf.scene;
    table.scale.set(7, 10, 5);
    table.position.set(0, -10, 15);
    table.rotation.x = -Math.PI / 2;
    table.rotation.z = -Math.PI / 2;
    table.position.z = 30;
    scene.add(table);
}
, undefined, function (error) {
    console.error(error);
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

camera.position.z = 80;
camera.position.y = 20;
camera.rotation.x = -Math.PI / 6;

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
renderer.setClearColor(0x1D1F21);
animate();
