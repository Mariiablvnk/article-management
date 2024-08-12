//not implemented yet
import React, { ChangeEvent, useRef } from 'react';
import { CustomFileUploadProps } from '../lib/interfaces';

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onFileChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="custom-file-upload px-2 flex flex-row items-center flex-wrap gap-10">
      <h3 className=''>{label}:</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="mt-1 block w-full px-3 py-2 max-w-[300px] bg-grey rounded-md shadow-sm focus:outline-none focus:ring-pink focus:border-pink sm:text-sm bg-white"
      >
        Select File
      </button>
      <div className="mt-2 ml-2 text-sm text-gray-500">
        {fileInputRef.current?.files?.[0] ? fileInputRef.current.files[0].name : "No file selected"}
      </div>
    </div>
  );
};

export default CustomFileUpload;
