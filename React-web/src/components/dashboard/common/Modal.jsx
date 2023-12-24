import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  return (
    <div>
      {
        <div className="fixed inset-0 bg-opacity-20 bg-black z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-primarybg m-2 p-6 rounded-lg shadow-lg overflow-auto"
          >
            {children}
          </div>
        </div>
      }
    </div>
  );
};

export default Modal;
