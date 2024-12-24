import React from 'react';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-4">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="relative bg-gray-800 rounded-lg z-10 w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-auto shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 focus:outline-none hover:bg-gray-600"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="p-6">
          <h1 className="text-white text-xl font-bold mb-4">{title}</h1>
          <pre className="text-gray-400 whitespace-pre-wrap text-justify">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Modal;