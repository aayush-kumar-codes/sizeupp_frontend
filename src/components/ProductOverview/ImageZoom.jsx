import React, { useState, useRef,useEffect } from 'react';

const ImageZoom = ({imglink}) => {
  // State to track the current zoom level
  const [currentZoom, setCurrentZoom] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  // Constants for minimum and maximum zoom levels, and step size for each zoom level change
  const minZoom = 1;    
  const maxZoom = 3;
  const stepSize = 0.2;

  // Ref to store a reference to the image element
  const imageRef = useRef(null);

  // Function to handle zooming the image
  const zoomImage = (direction, cursorPosition) => {
    // Calculate the new zoom level
    const newZoom = currentZoom + direction * stepSize;

    // Limit the zoom level to the specified minimum and maximum values
    if (newZoom < minZoom || newZoom > maxZoom) {
      return;
    }

    // Update the state with the new zoom level
    setCurrentZoom(newZoom);

    // Calculate the cursor position relative to the image
    const imageRect = imageRef.current.getBoundingClientRect();
    const x = (cursorPosition.x - imageRect.left) / imageRect.width;
    const y = (cursorPosition.y - imageRect.top) / imageRect.height;

    // Update the CSS transform of the image to scale it with the new transform origin
    if (imageRef.current) {
      imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      imageRef.current.style.transform = `scale(${newZoom})`;
    }
  };


  // Event handler for the wheel event
  const handleWheel = (event) => {
    // Determine the scroll direction
    const direction = event.deltaY > 0 ? -1 : 1;

      // Get the cursor position relative to the image
    const cursorPosition = {
        x: event.clientX,
        y: event.clientY,
      };

    // Zoom in or out based on the scroll direction
    zoomImage(direction, cursorPosition);
    };
    
  useEffect(() => {
    const tooltipTimeout = setTimeout(() => {
      setShowTooltip(false);
    }, 2500);

    return () => clearTimeout(tooltipTimeout);
  }, [showTooltip]);


  return (
    <div
      id="image-container"
          onWheel={handleWheel}
          onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        // Style for the container div to ensure it can capture the wheel event
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
      >
          {showTooltip && (
        <div
          className="tooltip"
            style={{
                position: 'absolute',
                bottom: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '8px',
                borderRadius: '4px',
                zIndex: 1000,
            }}
              >
                  Scroll on image to zoom
        </div>
      )}
      <img
        ref={imageRef}
        src={imglink} // Replace with the actual image source
        alt="Zoomable Image"
        style={{
          // Initial CSS style for the image, including the initial scale
          width: '100%',
          height: '100%',
          transformOrigin: 'top left',
          transform: `scale(${currentZoom})`,
          transition: 'transform 0.2s ease', // Optional: Add a smooth transition effect
        }}
      />
    </div>
  );
};

export default ImageZoom;
