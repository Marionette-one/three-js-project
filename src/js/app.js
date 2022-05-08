import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const renderer = new THREE.WebGL1Renderer();

const assetUrl = new URL("../assets/full_sculpture.gltf", import.meta.url);
// const asset2Url = new URL("../assets/full_sculpture.bin", import.meta.url);


renderer.shadowMap.enabled = true;

var width = window.innerWidth;
var height = window.innerHeight;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 1.4, 4);
orbit.update();

const light = new THREE.SpotLight(0xffffff, 1, 180);
light.position.set(-18, 40, 10);
light.angle = 0.2;
light.castShadow = true;
scene.add(light);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.position.y = -0.01;
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xbb0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.y = 5;
box.castShadow = true;
scene.add(box);

renderer.setClearColor(0x111111);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);
gridHelper.receiveShadow = true;

const loader = new GLTFLoader();

loader.load(
  // resource URL
  "../assets/full_sculpture.gltf",
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.error(error);
  }
);

function animate(time) {
  // box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
