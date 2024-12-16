import React from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#594614] rounded-lg p-6 w-full max-w-3xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500"
        >
         <MdClose className="text-[30px]" />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
