/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export default function Banner() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([
    "https://i.ibb.co/gMhbCz0/storm.png",
  ]);

  const onFileChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  
  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  const removeImageuRLS = (index) => {
    const updatedImagesurls = [...imageUrls];
    updatedImagesurls.splice(index, 1);
    setImageUrls(updatedImagesurls);
  };
  const uploadImagesToImgBB = async () => {
    try {
      const apiKey = "101405e8c4bd3a056e79883b57b8b8f8";

      const uploadPromises = selectedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image.file);
        formData.append("key", apiKey);

        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        return data.data.url;
      });

      const newUrls = await Promise.all(uploadPromises);

      setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
      setSelectedImages([])
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 m-4">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        multiple
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
      >
        <p className="text-gray-600">Click to select images</p>
      </label>
      <div className="flex">
        {selectedImages.map((image, index) => (
          <div key={index} className="mr-4">
            <img
              src={image.preview}
              alt={`preview-${index}`}
              className="max-w-24 max-h-24 rounded mb-2"
            />
            <button
              onClick={() => removeImage(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={uploadImagesToImgBB}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Upload Images to ImgBB
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2 text-black">
          Uploaded Images
        </h2>
        <div className="flex">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="mr-4">
              <img
                src={imageUrl}
                alt={`preview-${index}`}
                className="max-w-24 max-h-24 rounded mb-2"
              />
              <button
                onClick={() => removeImageuRLS(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
