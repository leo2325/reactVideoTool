import React, { useRef } from 'react';
import PlayerPage from '../pages/PlayerPage';

function App() {
  const videoRef = useRef(null);

  return (
    <div className="App">
      <PlayerPage />
    </div>
  );
}

export default App;
