import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ROOT_ID = 'cartographer-v1-root';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAP_URL = '/images/rickedness-map.jpg'; // TODO Find a map to use here
const TEXTURE_URL = '/images/texture.jpg';

const mixers: Three.AnimationMixer[] = [];
const clock = new Three.Clock();

let camera: Three.PerspectiveCamera | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let controls: OrbitControls | null = null;
let renderer: Three.WebGLRenderer | null = null;
let root: HTMLDivElement | null = null;
let scene: Three.Scene | null = null;

function createCamera(): void {
  if (!root) {
    throw new Error();
  }
  const fov = 50;
  const aspect = root.clientWidth / root.clientHeight;
  const near = 1;
  const far = 1000;
  camera = new Three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-15, 15, 500);
}

function createControls(): void {
  if (!camera || !root) {
    throw new Error();
  }
  controls = new OrbitControls(camera, root);
}

function createLights(): void {
  if (!scene) {
    throw new Error();
  }
  const ambientLight = new Three.HemisphereLight(0xddeeff, 0x202020, 5);
  const mainLight = new Three.DirectionalLight(0xffffff, 5.0);
  mainLight.position.set(10, 10, 10);
  scene.add(ambientLight, mainLight);
}

function createMap(): void {
  if (!scene) {
    throw new Error();
  }
  const geometry = new Three.BoxBufferGeometry(1, 200, 800);
  const image = new Three.TextureLoader().load(TEXTURE_URL);
  const mapMaterial = new Three.MeshBasicMaterial({ map: image });
  const defaultMaterial = new Three.MeshBasicMaterial({ color: 'darkblue' });
  const map = new Three.Mesh(geometry, [
    mapMaterial,
    defaultMaterial,
    defaultMaterial,
    defaultMaterial,
    defaultMaterial,
    defaultMaterial,
  ]);
  map.receiveShadow = true;
  map.position.set(0, 0, 0);
  scene.add(map);
}

function createRenderer(): void {
  if (!root) {
    throw new Error();
  }
  renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;

  root.appendChild(renderer.domElement);
}

function handleWindowResize(): void {
  if (!camera || !renderer || !root) {
    throw new Error();
  }

  camera.aspect = root.clientWidth / root.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(root.clientWidth, root.clientHeight);
}

function init(): void {
  root = document.querySelector('#' + ROOT_ID);
  if (!root) {
    throw new Error(`Could not find HTML element with ID ${ROOT_ID}`);
  }

  scene = new Three.Scene();
  scene.background = new Three.Color('skyblue');

  createCamera();
  createControls();
  createLights();
  createMap();
  createRenderer();

  if (!renderer) {
    throw new Error();
  }
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function render(): void {
  if (!renderer || !scene || !camera) {
    throw new Error();
  }
  renderer.render(scene, camera);
}

function update(): void {
  // if (!mixers || mixers.length === 0) { throw new Error(); }
  const delta = clock.getDelta();
  for (const mixer of mixers) {
    mixer.update(delta);
  }
}

window.addEventListener('resize', handleWindowResize);
init();
