import * as Three from 'three';

const ROOT_ID = 'cartographer-v1-root';

let camera: Three.PerspectiveCamera;
let mesh: Three.Mesh;
let renderer: Three.WebGLRenderer;
let root: HTMLDivElement | null;
let scene: Three.Scene;

const clientHeight = 500;

function animate(): void {
  requestAnimationFrame( animate );

  // Increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render( scene, camera );
}

function init(): void {
  root = document.querySelector('#' + ROOT_ID);
  if (!root) {
    throw new Error(`Could not find HTML element with ID ${ROOT_ID}`);
  }

  // Scene
  scene = new Three.Scene();
  scene.background = new Three.Color('skyblue');

  // Camera
  const fov = 35;
  const aspect = root.clientWidth / clientHeight;
  const near = 0.1;
  const far = 100;
  camera = new Three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  // Box geometry
  const geometry = new Three.BoxBufferGeometry(2, 2, 2);
  const material = new Three.MeshStandardMaterial({ color: 0x800080 });
  mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);

  // Light
  const light = new Three.DirectionalLight( 0xffffff, 5.0 );
  light.position.set( 10, 10, 10 );
  scene.add( light );

  // Render
  renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setSize(root.clientWidth, clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  root.appendChild(renderer.domElement);
}

init();
animate();
