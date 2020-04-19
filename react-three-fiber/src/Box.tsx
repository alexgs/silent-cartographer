import * as React from 'react';
import { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';

interface Props {
  position: Vector3 | [number, number, number];
}

export const Box: React.FC<Props> = (props: Props) => {
  // This reference will give us direct access to the mesh
  const mesh: React.MutableRefObject<Mesh | undefined> = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
};
