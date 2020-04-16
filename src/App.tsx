import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Canvas } from 'react-three-fiber';

import './App.css';
import { Box } from './Box';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const App: React.FunctionComponent<Props> = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};
App.displayName = 'App';

export default hot(App);
