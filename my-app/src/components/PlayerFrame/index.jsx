import React from 'react';
import Video from '../Video';

const PlayerFrame = ({ videoRef }) => {
  return (
    <div className="playerFrame_containerbis">
      <Video videoRef={videoRef} />
    </div>
  );
}

export default PlayerFrame;
