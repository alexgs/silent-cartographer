import * as Three from 'three';

const root = document.querySelector('#cartographer-v1-root');
const clientHeight = 500;
if (root) {
  // Scene
  const scene = new Three.Scene();
  scene.background = new Three.Color( 'skyblue' );

  // Camera
  const fov = 35;
  const aspect = root.clientWidth / clientHeight;
  const near = 0.1;
  const far = 100;
  const camera = new Three.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(0, 0, 10);

  // Box
  const geometry = new Three.BoxBufferGeometry( 2, 2, 2 );
  const material = new Three.MeshBasicMaterial();
  const mesh = new Three.Mesh( geometry, material );
  scene.add( mesh );

  // Render
  const renderer = new Three.WebGLRenderer();
  renderer.setSize( root.clientWidth, clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  root.appendChild( renderer.domElement );

  renderer.render( scene, camera );
}
