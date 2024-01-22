import { useState,useEffect } from 'react';

const ImageMagnifier = ({ imgSrc, imgAlt, zoomStrength }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [isGlassVisible, setIsGlassVisible] = useState(false);
    useEffect(() => {
      const magnify = (imgID, zoom) => {
        const img = document.getElementById(imgID);
        let glass, w, h, bw;

        /* Create magnifier glass: */
        glass = document.createElement("div");
        glass.setAttribute("class", "img-magnifier-glass");

        /* Insert magnifier glass: */
        img.parentElement.insertBefore(glass, img);

        /* Set background properties for the magnifier glass: */
        glass.style.backgroundImage = `url('${img.src}')`;
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;

        /* Execute a function when someone moves the magnifier glass over the image: */
        const moveMagnifier = (e) => {
          e.preventDefault();
          setIsGlassVisible(true);
          /* Get the cursor's x and y positions: */
          const pos = getCursorPos(e);
          let x = pos.x;
          let y = pos.y;

          /* Prevent the magnifier glass from being positioned outside the image: */
          if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
          if (x < w / zoom) { x = w / zoom; }
          if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
          if (y < h / zoom) { y = h / zoom; }

          /* Set the position of the magnifier glass: */
          glass.style.left = `${x - w}px`;
          glass.style.top = `${y - h}px`;

          /* Display what the magnifier glass "sees": */
          glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${y * zoom - h + bw}px`;
        };

        /* Add event listeners for mousemove and touchmove: */
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        // glass.addEventListener("touchmove", moveMagnifier);
        // img.addEventListener("touchmove", moveMagnifier);

        const getCursorPos = (e) => {
          let x = 0, y = 0;
          e = e || window.event;

          /* Get the x and y positions of the image: */
          const a = img.getBoundingClientRect();

          /* Calculate the cursor's x and y coordinates, relative to the image: */
          x = e.pageX - a.left;
          y = e.pageY - a.top;

          /* Consider any page scrolling: */
          x = x - window.scrollX;
          y = y - window.scrollY;

          return { x, y };
        };
      };

      /* Initiate Magnify Function with the id of the image and the strength of the magnifier glass: */
      magnify("myimage", zoomStrength);
    }, [zoomStrength]);

    return (
      <div>

        <div className="img-magnifier-container relative cursor-pointer">
          <img id="myimage" src={imgSrc} alt={imgAlt} width="600" height="400" onClick={handleOpenModal} />
        </div>
        <style>
          {`
          .img-magnifier-glass {
            position: absolute;
            border: 0px solid #000;
            border-radius: 50%;
            cursor: none;
            /* Set the size of the magnifier glass: */
            width: 270px;
            height: 270px;
            display: ${isGlassVisible ? 'block' : 'none'}; 
          }
        `}
        </style>
      </div>
    );
};
  
export default ImageMagnifier