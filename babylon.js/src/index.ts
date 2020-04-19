import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from 'babylonjs';

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
    Math.PI / 2,
    Math.PI / 2,
    2,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);

  const light1: HemisphericLight = new HemisphericLight(
    'light1',
    new Vector3(1, 1, 0),
    scene,
  );

  const sphere: Mesh = MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 1 },
    scene,
  );

  return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
