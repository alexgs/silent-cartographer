import * as React from 'react';
import { useLoader } from 'react-three-fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
  position: Vector3 | [number, number, number];
  url: string;
}

export const Model: React.FC<Props> = (props: Props) => {
  const gltf = useLoader(GLTFLoader, props.url);
  return <primitive object={gltf.scene} dispose={null} />;
};
Model.displayName = 'Model';
