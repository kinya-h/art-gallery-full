import React, { useEffect, useState } from "react";
import { GoPaperclip } from "react-icons/go";

interface ImageUploadProps {
  onFileSelect: (imageData: FormData) => void;
}

function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);




  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target?.files[0]);
      console.log("SELECTED FILE", selectedFile);
      
    const newFormData = new FormData();

    if (selectedFile !== null) {
      newFormData.append("image", selectedFile);
      onFileSelect(newFormData);
    } else {
      console.log("No file selected");
    }
    }
  };

  return (
    <div>
      <label htmlFor="file-input" className="cursor-pointer ">
              <GoPaperclip className="transform rotate-90"/>
        </label>
      <input id="file-input" type="file"   onChange={handleFileSelect}  accept="image/*" className="hidden" />
    </div>
  );
}

export default ImageUpload;
