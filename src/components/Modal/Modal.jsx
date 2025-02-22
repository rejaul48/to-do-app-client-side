 
import React from 'react';
import { ImCross } from "react-icons/im";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#66785F] flex justify-center items-center z-50 w-full">
            <div className="bg-white p-6 rounded-lg w-2/3 lg:w-1/3 mx-auto">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-red-500 font-bold cursor-pointer"><ImCross className='text-2xl' /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;


