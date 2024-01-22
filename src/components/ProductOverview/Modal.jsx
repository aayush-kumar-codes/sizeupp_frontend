import { useEffect, } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ children, onClose }) => {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    useEffect(() => {
      const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
  
      document.addEventListener('keydown', handleEscapeKey);
  
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [onClose]);
    return ReactDOM.createPortal(
      <div className="fixed overflow-hidden top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-80 bg-gray-900" onClick={handleOverlayClick}>
        <div className=" p-8 rounded-md w-fit h-auto overflow-auto">
          <button className="absolute z-50 top-6 right-4 md:top-6 md:right-2 lg:top-6 bg-black rounded-full p-1 text-gray-100" onClick={onClose}>
            <XMarkIcon className="h-8 w-8 text-gray-100" />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  };

export default Modal;