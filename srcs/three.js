import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
// renderer.domElement.className = 'three-canvas';
document.body.appendChild(renderer.domElement);

let camera;
let blender_camera;
let cube;
let icosphere;
let frontPaddle;
let backPaddle;

const loader = new GLTFLoader();
loader.load('assets/pong3.glb', (gltf) => {
    scene.add(gltf.scene);
    const importedCamera = gltf.cameras[0];
    if (importedCamera) {
        blender_camera = importedCamera;
        let light = new THREE.AmbientLight(0xffffff, 2);
        scene.add(light);
    }
    // else {
    //     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     camera.position.set(-10, 10, 2);
    // }
    cube = scene.getObjectByName("Cube");
    icosphere = scene.getObjectByName("Icosphere");
    frontPaddle = scene.getObjectByName("frontPaddle");
    backPaddle = scene.getObjectByName("backPaddle");
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

function ballMove(){
    constrainIcosphere(icosphere);
    if (icosphere.position.x == -15.980481147766113)
        icosphere.translateZ(0.1);
    console.log(icosphere.position.x, icosphere.position.y, icosphere.position.z);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        scene.getObjectByName("frontPaddle").translateX(0.5);
    }
    if (event.key === 's') {
        scene.getObjectByName("frontPaddle").translateX(-0.5);
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        scene.getObjectByName("frontPaddle").translateX(0);
    }
    if (event.key === 's') {
        scene.getObjectByName("frontPaddle").translateX(0);
    }
});

function animate() {
    if (!scene.children.length) {
        requestAnimationFrame(animate);
        return;
    }
    else{
        if (blender_camera)
            renderer.render(scene, blender_camera);
        ballMove();
        requestAnimationFrame(animate);
    }
}

animate();


function constrainIcosphere(icosphere) {
    let cubeBox = new THREE.Box3().setFromObject(cube);
    let frontPaddleBox = new THREE.Box3().setFromObject(frontPaddle);
    let backPaddleBox = new THREE.Box3().setFromObject(backPaddle);
    let icosphereRadius = 0.5;
    let pos = icosphere.position;
    pos.x = Math.max(cubeBox.min.x + icosphereRadius, Math.min(cubeBox.max.x - icosphereRadius, pos.x));
    pos.y = Math.max(cubeBox.min.y + icosphereRadius, Math.min(cubeBox.max.y - icosphereRadius, pos.y));
    pos.z = Math.max(cubeBox.min.z + icosphereRadius, Math.min(cubeBox.max.z - icosphereRadius, pos.z));
    icosphere.position.set(pos.x, pos.y, pos.z);
    let icosphereBox = new THREE.Sphere(icosphere.position, icosphereRadius);

    if (frontPaddleBox.intersectsSphere(icosphereBox)) {
        console.log("Collision with front paddle!");
        icosphere.translateZ(0.1);
        icosphere.translateY(0.2);
        pos.z = frontPaddleBox.min.z - icosphereRadius;
    }

    if (backPaddleBox.intersectsSphere(icosphereBox)) {
        console.log("Collision with back paddle!");
        pos.z = backPaddleBox.min.z - icosphereRadius;
        icosphere.translateY(-0.2);
        icosphere.translateZ(-0.1);
    }
    icosphere.position.set(pos.x, pos.y, pos.z);
}


