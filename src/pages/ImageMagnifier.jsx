import React from 'react';
import { GEGreen1 } from '../assets/images/men';

const ImageMagnifier = () => {
  const handleMouseMove = (e) => {
    const img = document.getElementById("gfg-img");
    const preview = document.querySelector(".zoom-preview");
    
    // calculating the ratio
    const x = preview.offsetWidth / 100;
    const y = preview.offsetHeight / 100;

    preview.style.backgroundImage = `url(${GEGreen1})`;
    preview.style.backgroundSize = `${img.width * x}px ${img.height * y}px`;

    const posX = e.nativeEvent.offsetX;
    const posY = e.nativeEvent.offsetY;

    preview.style.backgroundPosition = `-${posX * x}px -${posY * y}px`;
  };

  const handleMouseOut = () => {
    const preview = document.querySelector(".zoom-preview");
    preview.style.backgroundImage = "none";
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Image Magnifier</h1>
      <p className="mb-4">Move your mouse over the image</p>
      <div className="flex">
        <img
          src={GEGreen1}
          id="gfg-img"
          className="cursor-zoom-in h-80 w-80"
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        />
              <div className="zoom-preview h-80 w-80 ml-8 z-50 "> </div>
              
      </div>
    </div>
  );
};

export default ImageMagnifier;