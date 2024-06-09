import React, { useRef, useState, useEffect } from 'react';
import PlayerFrame from '../../components/PlayerFrame';
import PlayerControls from '../../components/PlayerControls';
import logoCC from '../../assets/logoCC.png';
import './index.css';

function PlayerPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState([0, 0]);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [duration, setDuration] = useState([0, 0]);
  const [durationSec, setDurationSec] = useState(0);

  const handlePlay = () => {
    if (!videoRef.current) {
      console.error('videoRef is null');
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) {
      console.error('videoRef is null');
      return;
    }
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setIsEnded(false);
  };

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
    };
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleEnded);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const { min, sec } = sec2Min(videoRef.current.duration);
    setDurationSec(videoRef.current.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      const { min, sec } = sec2Min(videoRef.current.currentTime);
      setCurrentTimeSec(videoRef.current.currentTime);
      setCurrentTime([min, sec]);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const sec2Min = (sec) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain,
    };
  };

  return (
    <div className="PlayerPage_container">
      <div className='logo'>
        <img src={logoCC} alt="logo company" />
      </div>

      <PlayerFrame videoRef={videoRef} />
      <PlayerControls
        videoRef={videoRef}
        isPlaying={isPlaying}
        isEnded={isEnded}
        currentTime={currentTime}
        currentTimeSec={currentTimeSec}
        duration={duration}
        durationSec={durationSec}
        handlePlay={handlePlay}
        handleRestart={handleRestart}
      />
    </div>
  );
}

export default PlayerPage;
