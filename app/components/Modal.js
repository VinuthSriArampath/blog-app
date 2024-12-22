import React from 'react';

const Modal = ({ isOpen, onClose,title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-gray-800 rounded-lg p-6 z-10 overflow-hidden max-w-2xl">
        <button onClick={onClose} className="absolute top-2 right-2"></button>
        <div className='overflow-y-auto h-[800px] overflow-x-hidden p-6'>
            <h1 className='text-white text-xl'>{title}</h1>
            <pre className='text-gray-400 whitespace-pre-wrap text-justify'>{content}</pre>
        </div>
      </div>
    </div>
  );
};

export default Modal; 