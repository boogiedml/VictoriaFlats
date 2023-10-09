import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Modal({ children, close }) {
  const modalRef = useRef(null);

  const handleBackgroundClick = (event) => {
    if (event.target === modalRef.current) {
      close();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 lg:flex justify-center items-center"
      ref={modalRef}
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  styles: PropTypes.string,
};

export default Modal;
