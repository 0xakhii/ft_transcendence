import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let table;
loader.load('assets/table.glb', function (gltf) {
    table = gltf.scene;
    scene.add(gltf.scene);
    table.scale.set(10, 5, 5);
}
, undefined, function (error) {
    console.error(error);
});

let paddle;
loader.load('assets/paddle.glb', function (gltf) {
    paddle = gltf.scene;
    scene.add(gltf.scene);
    paddle.scale.set(0.5, 0.5, 0.5);
    paddle.position.y = 14;
    paddle.position.z = 22;
    paddle.position.x = 0;
    paddle.rotation.z = -Math.PI / 2;
    paddle.rotation.y = Math.PI / 2;
}, undefined, function (error) {
    console.error(error);
});

let mouseX = 0;
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
}
document.addEventListener('mousemove', onMouseMove);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 25;
camera.position.y = 15;

function animate() {
    requestAnimationFrame(animate);
    paddle.position.x = mouseX * 10;
    if (paddle.position.x > 3.5) {
        paddle.position.x = 3.5;
    }
    if (paddle.position.x < -3.5) {
        paddle.position.x = -3.5;
    }
    renderer.render(scene, camera);
}
renderer.setClearColor(0xffffff);
animate();
