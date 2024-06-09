import React from 'react';
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

const PlayerControls = ({
  videoRef,
  isPlaying,
  isEnded,
  currentTimeSec,
  durationSec,
  handlePlay,
  handleRestart
}) => {
  return (
    <div className="playerControls_container">
      <div className="readingControl_container">
        {isEnded ? (
          <button className="controlButton" onClick={handleRestart}>
            <FontAwesomeIcon className="controls_icon" icon={faRotateLeft} />
          </button>
        ) : (
          isPlaying ? (
            <button className="controlButton" onClick={handlePlay}>
              <FontAwesomeIcon className="controls_icon" icon={faPause} />
            </button>
          ) : (
            <button className="controlButton" onClick={handlePlay}>
              <FontAwesomeIcon className="controls_icon" icon={faPlay} />
            </button>
          )
        )}
      </div>
      <div className="durationControl_container">
        <input
          type="range"
          min="0"
          max={durationSec.toString()} // Convert to string if NaN
          value={currentTimeSec}
          className="timeline"
          onChange={(e) => {
            videoRef.current.currentTime = e.target.value;
          }}
        />
      </div>
    </div>
  );
}

export default PlayerControls;
