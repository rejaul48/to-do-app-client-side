 
import React from 'react';
import { ImCross } from "react-icons/im";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-red-500 font-bold cursor-pointer"><ImCross className='text-2xl' /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;


