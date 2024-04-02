import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//constants
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".three")! as HTMLElement;

//scene
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#03ff46",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateY(Math.PI * 0.5);

const camera = new THREE.PerspectiveCamera(50, size.width / size.height);
window.addEventListener("resize", (e) => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

camera.position.z = 10;
camera.position.x = 0.5;
camera.position.y = 3;
scene.add(mesh);
scene.add(camera);

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else document.exitFullscreen();
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);
});

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  // mesh.rotation.y = elapsedTime;
  // mesh.position.y = Math.sin(elapsedTime) + 2;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
