// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });


const cameraPosition = new THREE.Vector3();
cameraPosition.x = -Math.PI / 10;
cameraPosition.y = 20;
cameraPosition.z = 100;
camera.position.copy(cameraPosition);
camera.lookAt(scene.position);
// camera.position.z = 100;
// camera.position.y = 20;
// camera.rotation.x = -Math.PI / 10;

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add('three-canvas');


window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

const tableGeometry = new THREE.BoxGeometry(window.innerWidth / 2, window.innerHeight / 2, 5);
const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
// table.rotation.x = Math.PI / 2;
// table.position.z = 100;
scene.add(table);

const tableCenter = new THREE.Vector3();
table.geometry.computeBoundingBox();
table.geometry.boundingBox.getCenter(tableCenter);

const paddleGeometry = new THREE.BoxGeometry(15, 3, 2);
const paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
paddle.position.z = 80;
paddle.position.y = tableCenter.y + 6;
paddle.position.x = tableCenter.x;
scene.add(paddle);

const ballGeometry = new THREE.SphereGeometry(5, 32, 32);
const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffa500 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.z = tableCenter.z;
ball.position.y = tableCenter.y;
ball.position.x = tableCenter.x;
scene.add(ball);

let paddleSpeed = 2;
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && paddle.position.x > -table.geometry.parameters.width / 2 + paddle.geometry.parameters.width / 2) {
        paddle.position.x -= paddleSpeed;
    } else if (event.key === 'ArrowRight' && paddle.position.x < table.geometry.parameters.width / 2 - paddle.geometry.parameters.width / 2) {
        paddle.position.x += paddleSpeed;
    }
});

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

renderer.setClearColor(0x1D1F21);
animate();
