import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Canvas } from 'react-three-fiber';

import './App.css';
import { Box } from './Box';
import { Model } from './Model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: React.FunctionComponent<Props> = () => {
  return (
    <Canvas camera={{ fov: 60 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
      <React.Suspense fallback={<Box position={[0, 0, 0]} />}>
        <Model position={[0, 0, 0]} url={'models/parrot.glb'} />
      </React.Suspense>
    </Canvas>
  );
};
App.displayName = 'App';

export default hot(App);
