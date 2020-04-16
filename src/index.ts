import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ROOT_ID = 'cartographer-v1-root';
const SCALE_FACTOR = 0.1;

const mixers: Three.AnimationMixer[] = [];
const clock = new Three.Clock();

let camera: Three.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;
let renderer: Three.WebGLRenderer | null = null;
let root: HTMLDivElement | null = null;
let scene: Three.Scene | null = null;

function createCamera(): void {
  if (!root) { throw new Error() }
  const fov = 50;
  const aspect = root.clientWidth / root.clientHeight;
  const near = 10;
  const far = 100;
  camera = new Three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-15, 15, 50);
}

function createControls(): void {
  if (!camera || !root) { throw new Error(); }
  controls = new OrbitControls(camera, root);
}

function createLights(): void {
  if (!scene) { throw new Error(); }
  const ambientLight = new Three.HemisphereLight(0xddeeff, 0x202020, 5);
  const mainLight = new Three.DirectionalLight( 0xffffff, 5.0 );
  mainLight.position.set( 10, 10, 10 );
  scene.add( ambientLight, mainLight );
}

function createRenderer(): void {
  if (!root) { throw new Error(); }
  renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;

  root.appendChild(renderer.domElement);
}

function handleWindowResize(): void {
  if (!camera || !renderer || !root) { throw new Error(); }

  camera.aspect = root.clientWidth / root.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( root.clientWidth, root.clientHeight );
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
  loadModels();
  createRenderer();

  if (!renderer) { throw new Error(); }
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function loadModels(): void {
  const loader = new GLTFLoader();

  const handleLoad = (gltf: GLTF, position: Three.Vector3): void => {
    if (!scene) { throw new Error(); }

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    const scaleM = model.matrix.clone().makeScale(SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
    model.applyMatrix4(scaleM);

    const animation = gltf.animations[ 0 ];

    const mixer = new Three.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();

    scene.add( model );
  };

  const FUDGE = 3;
  const parrotPosition = new Three.Vector3(0, 0, 2.5 * FUDGE / SCALE_FACTOR);
  loader.load('models/parrot.glb', (gltf: GLTF) => handleLoad(gltf, parrotPosition));
  const flamingoPosition = new Three.Vector3( 7.5 * FUDGE / SCALE_FACTOR, 0, -10 * FUDGE / SCALE_FACTOR );
  loader.load('models/flamingo.glb', (gltf: GLTF) => handleLoad(gltf, flamingoPosition));
  const storkPosition = new Three.Vector3( 0, -2.5 * FUDGE / SCALE_FACTOR, -10 * FUDGE / SCALE_FACTOR );
  loader.load('models/stork.glb', (gltf: GLTF) => handleLoad(gltf, storkPosition));
}

function render(): void {
  if (!renderer || !scene || !camera) { throw new Error(); }
  renderer.render( scene, camera );
}

function update(): void {
  // if (!mixers || mixers.length === 0) { throw new Error(); }
  const delta = clock.getDelta();
  for (const mixer of mixers) {
    mixer.update(delta);
  }
}

window.addEventListener( 'resize', handleWindowResize );
init();
