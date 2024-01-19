import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug

//Track mouse

const client = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  client.x = event.clientX / window.innerHeight;
  client.y = event.clientY / window.innerWidth;

  for (let i = 0; i < 1000; i++) {
    donuts[i].rotation.y += client.x * 0.2;
    donuts[i].rotation.x += client.y * 0.2;
  }
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Donuts
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

const donuts = [];

for (let i = 0; i < 1000; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);
  donut.position.x = (Math.random() - 0.5) * 2;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 2;
  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;
  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  donuts.push(donut);

  scene.add(donut);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
