/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAslvKIwGKp9m4YFbC-NZRbmmDXwBOfJmA",
  authDomain: "confrencewebsite.firebaseapp.com",
  projectId: "confrencewebsite",
  storageBucket: "confrencewebsite.appspot.com",
  messagingSenderId: "511860114926",
  appId: "1:511860114926:web:45651c7ac1c8040406baff",
  measurementId: "G-0J6GTCSWX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
import {
  getDocs,
  addDoc,
  getDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Banner() {
  const [dataUpdated, setDataUpdated] = useState(true);
  useEffect(() => {
    getData();
  }, []);

 

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
    updateData(updatedImagesurls);
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
      let tempData=[...imageUrls,...newUrls]
      updateData(tempData)
      setSelectedImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const getData = async () => {
    const firebaseData = doc(db, "Website", "Banner");

    const docSnapshot = await getDoc(firebaseData);

    if (docSnapshot.exists()) {
      // Access the data from the document
      const data = docSnapshot.data();
      console.log("Document data:", data);
      setImageUrls(data.Images);
    } else {
      console.log("No such document!");
    }
  };

  const updateData = async (e) => {
    // e.preventDefault();
    const temp = doc(db, "Website", "Banner");
    // console.log(dynamicData);
    const k = { Images: e };
    // Use the updateDoc function to update specific fields in the document
    await updateDoc(temp, k).then(() => {
      alert("Update successfull");
    });

    console.log("Document updated successfully");
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
        Upload Images 
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
