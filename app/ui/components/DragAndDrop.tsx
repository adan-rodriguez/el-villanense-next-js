"use client";

import { isValidImageFile } from "@/app/lib/utils";
import {
  dropzone,
  image_preview,
  drag,
} from "@/app/ui/styles/DragAndDrop.module.css";
import { useEffect, useState } from "react";

export function DragAndDrop({
  getImageFile,
  externalImageFile,
  imageUrl,
  allowedImageFileTypes,
}: {
  getImageFile: (file: File | null) => void;
  externalImageFile: File | null;
  imageUrl?: string;
  allowedImageFileTypes: string[];
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isValidImageFile({ file: externalImageFile, allowedImageFileTypes })) {
      setImageFile(externalImageFile);
    }
  }, [externalImageFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add(drag);
  };

  const handleDragLeave = (e) => {
    e.target.classList.remove(drag);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (isValidImageFile({ file, allowedImageFileTypes })) {
      getImageFile(file);
      setImageFile(file);
    }
    e.target.classList.remove(drag);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={dropzone}
    >
      <div
        style={{
          backgroundImage: imageFile
            ? `url(${URL.createObjectURL(imageFile)})`
            : imageUrl
            ? `url(${imageUrl})`
            : "",
        }}
        className={image_preview}
      >
        {!imageFile && !imageUrl && (
          <>
            <p>O arrastra la imagen aquí </p>
            <svg width="24" height="24">
              <path
                d="M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"
                fill="gray"
              ></path>
            </svg>
          </>
        )}
      </div>
    </div>
  );
}
