import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

// Global variables
let scene,
  camera,
  renderer,
  controls,
  clickMouse,
  moveMouse,
  raycaster,
  draggableModel;

// Create Scene and lights
function init() {
  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x073B4C);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.set(200, 100, 0);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // CAMERA MOVEMENT CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.update();

  // LIGHTS
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-30, 50, 150);
  scene.add(ambientLight);
  scene.add(directionalLight);

// RAYCASTING (funcionalidade do mouse)
  raycaster = new THREE.Raycaster();
  clickMouse = new THREE.Vector2();
  moveMouse = new THREE.Vector2();

  // CHÃO
  let floor = new THREE.Mesh(
    new THREE.BoxBufferGeometry(250, 5, 250),
    new THREE.MeshPhongMaterial({ color: 0x118AB2 })
  );
  floor.isDraggable = false;
  scene.add(floor);
}

/**
 *Adiciona um simples à cena
 *
 * @param {string} dir Nome da pasta que contém o arquivo .gltf.
 * @param {Object} pos objeto contendo dados de posição { x: number, y: number, z: number }
 */
function addModelSaturnV(pos) {
  const loader = new GLTFLoader();
  loader.load(`assets/saturnV/scene.gltf`, (gltf) => {
    const model = gltf.scene;
    model.position.set(pos.x, pos.y, pos.z);
    model.isDraggable = true;
    scene.add(model);
  });
}

function addModelSakurajimaMai(pos) {
  const loader = new GLTFLoader();
  loader.load(`assets/SakurajimaMai/scene.gltf`, (gltf) => {
    const model = gltf.scene;
    model.position.set(pos.x, pos.y, pos.z);
    model.isDraggable = true;
    scene.add(model);
  });
}

function addModelMoon(pos) {
  const loader = new GLTFLoader();
  loader.load(`assets/lunalow1/scene.gltf`, (gltf) => {
    const model = gltf.scene;
    model.position.set(pos.x, pos.y, pos.z);
    model.isDraggable = true;
    scene.add(model);
  });
}

/**
  * Verifica se o usuário está 'segurando' e modelo.
  * Se verdadeiro, a função atualiza a localização do modelo com base na posição do mouse
  * Se falso, a função não faz nada
  */
function dragModel() {
// Se 'segurar' um modelo, mova o modelo  
if (draggableModel) {
    raycaster.setFromCamera(moveMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    if (found.length > 0) {
      for (let obj3d of found) {
        if (!obj3d.object.isDraggablee) {
          draggableModel.position.x = obj3d.point.x;
          draggableModel.position.z = obj3d.point.z;
          break;
        }
      }
    }
  }
}

// Permite que o usuário pegue e solte modelos em eventos de clique
window.addEventListener("click", (event) => {
// Se 'segurar' o modelo ao clicar, defina o contêiner como <indefinido> para 'soltar' o modelo.  
if (draggableModel) {
    draggableModel = undefined;
    return;
  }

// Se NÃO 'segurar' o modelo ao clicar, defina o contêiner como <object> para 'pegar' o modelo.  
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children, true);
  if (found.length) {
    // Percorre cada pai para cima até atingir a camada superior
     // Esta camada superior é o grupo criado pela função GLTFLoader
    let current = found[0].object;
    while (current.parent.parent !== null) {
      current = current.parent;
    }
    if (current.isDraggable) {
      draggableModel = current;
    }
  }
});

// Atualiza constantemente a localização do mouse para uso em `dragModel()`
window.addEventListener("mousemove", (event) => {
  dragModel(); // atualiza a posição do modelo toda vez que o mouse se move
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Função recursiva para renderizar a cena
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Re-renderiza a cena ao redimensionar a janela
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Iniciar o programa
(function () {
  window.addEventListener("resize", onWindowResize, false);
  init();
  // addModelSaturnV({ x: -50, y: 1, z: 0 });
  // addModelMoon({ x: 0, y: 1, z: 0 });
  addModelSakurajimaMai({ x: 50, y: 1, z: 0 });
  animate();
})();