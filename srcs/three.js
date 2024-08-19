import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let table = new THREE.Object3D();
loader.load('assets/table.glb', function (gltf) {
    table = gltf.scene;
    scene.add(table);
    table.scale.set(15, 5, 15);
    table.position.z = -10;
}
, undefined, function (error) {
    console.error(error);
});
let ball = new THREE.Object3D();
loader.load('assets/ball.glb', function (gltf) {
    ball = gltf.scene;
    scene.add(ball);
    ball.scale.set(20, 20, 20);
    ball.position.y = 60;
    ball.position.z = 35;
}, undefined, function (error) {
    console.error(error);
});

let paddle = new THREE.Object3D();
loader.load('assets/paddle.glb', function (gltf) {
    paddle = gltf.scene;
    scene.add(paddle);
    paddle.scale.set(2, 2, 2);
    paddle.position.y = 14;
    paddle.position.z = 22;
    paddle.position.x = 0;
    paddle.rotation.z = -Math.PI / 2;
    paddle.rotation.y = Math.PI / 2;
}, undefined, function (error) {
    console.error(error);
});

let mouseX = 0;
let mouseZ = 0;
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseZ = (event.clientY / window.innerHeight) * 2 - 1;
}
document.addEventListener('mousemove', onMouseMove);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

camera.position.z = 80;
camera.position.y = 20;
camera.rotation.x = -Math.PI / 6;

function paddleMove() {
    paddle.position.x += mouseX * 5;
    paddle.position.z += mouseZ * 5;
    if (paddle.position.x > 25) {
        paddle.position.x = 25;
    }
    if (paddle.position.x < -25) {
        paddle.position.x = -25;
    }
    if (paddle.position.z > 25) {
        paddle.position.z = 25;
    }
    if (paddle.position.z < -10) {
        paddle.position.z = -10;
    }
}

function animate() {
    renderer.render(scene, camera);
    // controls.update();
    paddleMove();
    requestAnimationFrame(animate);
}
renderer.setClearColor(0xF0EAD6);
animate();
