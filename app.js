import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

// Global variables
let scene, camera, renderer, controls, clickMouse, moveMouse, raycaster;
let draggableObject;

// Create Scene and lights
function init() {
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xBE95C4);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(-80, 100, 200);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // CAMERA MOVEMENT CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 60, 0);
  controls.enableDamping = false;
  controls.update();

  // LIGHTS
  let ambientLight = new THREE.AmbientLight(0xE0B1CB, 0.3);
  let directionalLight = new THREE.DirectionalLight(0xE0B1CB, 1);
  directionalLight.position.set(-30, 50, 150);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // RAYCASTING (mouse functionality)
  raycaster = new THREE.Raycaster();
  clickMouse = new THREE.Vector2();
  moveMouse = new THREE.Vector2();

  // FLOOR
  let floor = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2000, 3, 2000),
    new THREE.MeshPhongMaterial({ color: 0x231942 })
  );
  floor.isDraggable = false;
  scene.add(floor);
}

// Recursive function to render the scene
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Re-renders the scene upon window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addObject(radius, pos, color) {
  const object = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(radius, radius, 10, 50),
    new THREE.MeshPhongMaterial({ color: color })
  );
  object.position.set(pos.x, pos.y, pos.z);
  object.isDraggable = true;
  scene.add(object);
}

window.addEventListener("click", (event) => {
  // If 'holding' object on-click, set container to <undefined> to 'drop’ the object.
  if (draggableObject) {
    draggableObject = undefined;
    return;
  }

  // If NOT 'holding' object on-click, set container to <object> to 'pick up' the object.
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children, true);
  if (found.length && found[0].object.isDraggable) {
    draggableObject = found[0].object;
  }
});

window.addEventListener("mousemove", (event) => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function dragObject() {
  // If 'holding' an object, move the object
  if (draggableObject) {
    const found = raycaster.intersectObjects(scene.children);
    // `found` is the metadata of the objects, not the objetcs themsevles
    if (found.length) {
      for (let obj3d of found) {
        if (!obj3d.object.isDraggablee) {
          draggableObject.position.x = obj3d.point.x;
          draggableObject.position.z = obj3d.point.z;
          break;
        }
      }
    }
  }
}

window.addEventListener("mousemove", (event) => {
  dragObject();
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Start the program
(function () {
  window.addEventListener("resize", onWindowResize, false);
  init();
  animate();
  addObject(8, { x: 0, y: 6, z: 0 }, "#5E548E");
})();