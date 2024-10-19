import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let camera;
let blender_camera;
const loader = new GLTFLoader();
loader.load('assets/pong.glb', (gltf) => {
    scene.add(gltf.scene);
    const importedCamera = gltf.cameras[0];
    if (importedCamera) {
        blender_camera = importedCamera;
    }
     else {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-10, 10, 2);
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    if (blender_camera){
        renderer.render(scene, blender_camera);
        console.log('blender_camera');
    }
    else{
        renderer.render(scene, camera);
        console.log('camera');
    }
}

// renderer.setClearColor(0x1D1F21);

animate();
