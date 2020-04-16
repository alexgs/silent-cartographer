import * as Three from 'three';

const ROOT_ID = 'cartographer-v1-root';

let camera: Three.PerspectiveCamera | null = null;
let mesh: Three.Mesh | null = null;
let renderer: Three.WebGLRenderer | null = null;
let root: HTMLDivElement | null = null;
let scene: Three.Scene | null = null;

function createCamera(): void {
  if (!root) { throw new Error() }
  const fov = 35;
  const aspect = root.clientWidth / root.clientHeight;
  const near = 0.1;
  const far = 100;
  camera = new Three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);
}

function createLights(): void {
  if (!scene) { throw new Error(); }
  const light = new Three.DirectionalLight( 0xffffff, 5.0 );
  light.position.set( 10, 10, 10 );
  scene.add( light );
}

function createMeshes(): void {
  if (!scene) { throw new Error(); }
  const geometry = new Three.BoxBufferGeometry(2, 2, 2);
  const material = new Three.MeshStandardMaterial({ color: 0x800080 });
  mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);
}

function createRenderer(): void {
  if (!root) { throw new Error(); }
  renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
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
  createLights();
  createMeshes();
  createRenderer();

  if (!renderer) { throw new Error(); }
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function render(): void {
  if (!renderer || !scene || !camera) { throw new Error(); }
  renderer.render( scene, camera );
}

function update(): void {
  if (!mesh) { throw new Error(); }

  // Increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

window.addEventListener( 'resize', handleWindowResize );
init();
