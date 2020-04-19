import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PointLight,
  Scene,
  Vector3,
} from 'babylonjs';

import { addLabelToMesh } from './gui';

const CANVAS_ID = 'cartographer-v1-canvas';

function getCanvas(): HTMLCanvasElement {
  const output: HTMLElement | null = document.getElementById(CANVAS_ID);
  if (!output) {
    throw new Error();
  }
  return output as HTMLCanvasElement;
}

const canvas: HTMLCanvasElement = getCanvas();
const engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
  const scene: Scene = new Scene(engine);

  const camera: ArcRotateCamera = new ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    Math.PI / 2,
    4,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);

  const light1: HemisphericLight = new HemisphericLight(
    'light1',
    new Vector3(1, 1, 0),
    scene,
  );
  const light2: PointLight = new PointLight(
    'light2',
    new Vector3(0, 1, -1),
    scene,
  );

  // May eventually want to change this to `MeshBuilder.CreateGround`
  const plane = MeshBuilder.CreatePlane(
    'plane',
    { height: 2, width: 1, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );

  addLabelToMesh(plane);

  return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
