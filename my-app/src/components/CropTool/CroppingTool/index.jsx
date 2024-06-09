import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const CroppingTool = ({ videoRef, videoHeight }) => {
  const [crop, setCrop] = useState({ width: 100, height: 100, top: 0, left: 0 });
  const [isCropping, setIsCropping] = useState(false);
  const cropAreaRef = useRef(null);

  const handleCropClick = () => {
    setIsCropping(!isCropping);
  };
  useEffect(() => {
    console.log("isCropping:", isCropping);
  }, [isCropping]);
  

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
    if (videoRef.current && !isNaN(videoHeight)) {
      videoRef.current.style.clipPath = `rect(${newCrop.top}px, ${newCrop.left + newCrop.width}px, ${newCrop.top + newCrop.height}px, ${newCrop.left}px)`;
    }
  };

  useEffect(() => {
    const updateCropAreaHeight = () => {
      if (videoRef.current && cropAreaRef.current && !isNaN(videoHeight)) {
        cropAreaRef.current.style.height = `${videoHeight}px`;
      }
    };
    window.addEventListener("resize", updateCropAreaHeight);
    updateCropAreaHeight(); // Appel initial pour fixer la hauteur
    return () => {
      window.removeEventListener("resize", updateCropAreaHeight);
    };
  }, [videoRef, videoHeight]);

  return (
    <div className="cropping-tool-container">
      <button onClick={handleCropClick}>
        {isCropping ? "Stop Cropping" : "Start Cropping"}
      </button>
      {isCropping && (
        <div className="crop-controls">
          { !isNaN(videoHeight) && (
            <button onClick={() => handleCropChange({ ...crop, height: videoHeight, width: videoHeight })}>1:1</button>
          )}
          { !isNaN(videoHeight) && (
            <button onClick={() => handleCropChange({ ...crop, width: (9/16) * videoHeight, height: videoHeight })}>9:16</button>
          )}
          { !isNaN(videoHeight) && (
            <button onClick={() => handleCropChange({ ...crop, width: (3/4) * videoHeight, height: videoHeight })}>3:4</button>
          )}
          <div
            ref={cropAreaRef}
            className="crop-area"
            style={{
              width: crop.width,
              height: crop.height,
              top: crop.top,
              left: crop.left,
            }}
            draggable
            onDrag={(e) => handleCropChange({
              ...crop,
              top: e.clientY - crop.height / 2,
              left: e.clientX - crop.width / 2,
            })}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CroppingTool;
