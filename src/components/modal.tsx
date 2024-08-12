import React from 'react';
import { ModalProps } from '../lib/interfaces';

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
    return (
        <div className="fixed font-poppins inset-0 flex items-center justify-center bg-grey">
            <div
                className={`bg-white p-6 rounded-lg shadow-lg border-2 ${type === 'success' ? 'border-green' : 'border-ochra'}`}
            >
                <h2
                    className={`text-2xl font-bold mb-2 ${type === 'success' ? 'text-green' : 'text-ochra'}`}
                >
                    {type === 'success' ? 'Success!' : 'Error!'}
                </h2>
                <p className={`${type === 'success' ? 'text-green' : 'text-ochra'}"text-black mb-4"`}>{message}</p>
                <button
                    className="bg-gray-300 text-black mt-4 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition"
                    onClick={onClose}
                >
                    Close
                    
                </button>
            </div>
        </div>
    );
};

export default Modal;
