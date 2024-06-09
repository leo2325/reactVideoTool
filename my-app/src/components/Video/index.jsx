import React from 'react';
import vd1 from '../../assets/vd.mp4';
import './index.css';

const Video = ({ videoRef }) => {
  return (
    <div className="video_containerbis">
      <video 
        src={vd1} 
        autoPlay 
        ref={videoRef}
      />  
    </div>
  );
}

export default Video;
