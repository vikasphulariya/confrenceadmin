/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
// import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Modal from "react-modal";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css"; // Add this line to import styles
import { db } from "./firestoreConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

const App = () => {
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState("#f2a654");
  const [showDialog, setShowDialog] = useState(false);
  const [buttonTextColor, setButtonTextColor] = useState("");

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

  const [settingsData, setSettingsData] = useState({
    PrimaryColor: "#ffffff",
  });
  useEffect(() => {
    isLightColor(settingsData.PrimaryColor)
      ? setButtonTextColor("text-black")
      : setButtonTextColor("text-white");
  }, [settingsData.PrimaryColor]);

  const handleColorChange = (newColor) => {
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      PrimaryColor: newColor.hex,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      MainLogo: file,
    }));
  };

  const handleAdditionalLogoToggle = async () => {
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      AdditionalLogo: !prevSettings.AdditionalLogo,
    }));
    const temp = doc(db, "Website", "Data");
    let k = {
      AdditionalLogo:!settingsData.AdditionalLogo,
    };
    await updateDoc(temp, k).then(()=>{
      // alert("ipdates")
    }).catch(()=>{
      alert("Something Went wrong")
    })
  };

  const openDialog = (w) => {
    w.preventDefault();
    setShowDialog(!showDialog);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };
  const getData = async () => {
    const firebaseData = doc(db, "Website", "Data");

    const docSnapshot = await getDoc(firebaseData);

    if (docSnapshot.exists()) {
      // Access the data from the document
      const data = docSnapshot.data();
      console.log("Document data:", data.Logo);
      // setDynamicData(data);
      setSettingsData((prevSettings) => ({
        ...prevSettings,
        MainLogo: data.Logo,
        AdditionalLogo: data.AdditionalLogo,
      }));
      setImageUrls(data.logoImages);
      console.log(":");
    } else {
      console.log("No such document!");
    }
  };

  const updateData = async (e) => {
    // e.preventDefault();
    // const data = await response.json();
    // const imageUrl = data.data.url;
    const temp = doc(db, "Website", "Data");
    let k = {
      AdditionalLogo: settingsData.AdditionalLogo,
      logoImages: e,
    };
    await updateDoc(temp, k).then(() => {
      setSettingsData((prevSettings) => ({
        ...prevSettings,
        logoImages: k,
      }));
    });
  };

  const isLightColor = (hexColor) => {
    // Function to determine if a color is light or dark
    // You can customize this function based on your color contrast requirements
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128; // Returns true if color is light, false if dark
  };

  const uploadImageToImgBB = async (image) => {
    try {
      const apiKey = "101405e8c4bd3a056e79883b57b8b8f8";

      const formData = new FormData();
      formData.append("image", image);
      formData.append("key", apiKey);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      }).catch((e) => {
        alert(JSON.stringify(e));
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.data.url;
        const temp = doc(db, "Website", "Data");
        console.log(imageUrl);
        // console.log(dynamicData);
        let k = {
          Logo: imageUrl,
        };
        await updateDoc(temp, k)
          .then(() => {
            setSettingsData((prevSettings) => ({
              ...prevSettings,
              MainLogo: imageUrl,
            }));
          })
          .then(() => {
            alert("Logo Uploaded Successfulyy");
          })
          .catch(() => {
            alert("Upload Failed");
          });
      } else {
        console.log("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const uploadImagesToImgBB = async () => {
    // e.preventDefault();
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
      let tempData = [...imageUrls, ...newUrls];
      updateData(tempData);
      setSelectedImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center bg-white p-8 rounded-md shadow-md">
      <div className="mb-4 mt-3">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Logo Image:
        </label>
        {settingsData.MainLogo && (
          <div className="mt-4">
            <img
              src={settingsData.MainLogo}
              alt="Chosen Logo"
              className="max-w-24 max-h-24 rounded-md border-2 border-black"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("Scd", e.target.files[0]);
            uploadImageToImgBB(e.target.files[0]);
          }}
          className="hidden"
          id="fileInputk"
          disabled={loader}
        />
        <label
          htmlFor="fileInputk"
          className="   p-4 text-center cursor-pointer"
        >
          <p className="border-2 border-dashed border-gray-300 p-4 bg-blue-200 rounded-lg text-lg font-bold text-gray-600">
            Change Logo
          </p>
        </label>
      </div>

      {false ? (
        <SketchPicker
          className="mt-10"
          color={settingsData.PrimaryColor}
          onChange={handleColorChange}
        />
      ) : null}
      <Dialog
        animation="zoom"
        maskAnimation="fade"
        title="Choose Color"
        visible={showDialog}
        onClose={() => setShowDialog(false)}
        style={{ width: 250 }}
        styles={{ body: { marginTop: -30 } }}
      >
        <div className="flex w-full  items-center justify-center bg-center">
          <SketchPicker
            className="mt-10"
            color={settingsData.PrimaryColor}
            onChange={handleColorChange}
          />
        </div>
      </Dialog>
      {/* <form> */}
      <div
        style={{
          backgroundColor: settingsData.PrimaryColor,
          borderColor: buttonTextColor,
        }}
        className="w-36 h-16 rounded-xl mb-6  border-solid border-2 shadow-2xl  hover:scale-105 "
      >
        <button
          className={`${buttonTextColor} py-2 px-4 rounded font-bold`}
          onClick={openDialog}
        >
          Choose Primary Color
        </button>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <span className="text-gray-700 text-sm">Additional Logo:</span>
          <Toggle
            type="checkbox"
            checked={settingsData.AdditionalLogo}
            onChange={handleAdditionalLogoToggle}
            className="ml-2 form-checkbox h-6 w-6 text-blue-500"
          />
        </label>
      </div>
      {settingsData.AdditionalLogo && (
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
            Upload Selected Logos
          </button>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-black">
              Uploaded Logos
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
      )}

      {/* </form> */}
    </div>
  );
};

export default App;
