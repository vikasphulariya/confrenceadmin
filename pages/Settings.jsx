/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const App = () => {
  const [color, setColor] = useState("#f2a654");
  const [showDialog, setShowDialog] = useState(false);

  const [settingsData, setSettingsData] = useState({
    PrimaryColor: "",
    MainLogo:
      "https://acctcomputing.com/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-05-at-7.33.41-PM.jpeg",
    AdditionalLogo: false,
  });

  const handleColorChange = (newColor) => {
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      PrimaryColor: newColor.hex,
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      MainLogo: file,
    }));
  };

  const handleAdditionalLogoToggle = () => {
    setSettingsData((prevSettings) => ({
      ...prevSettings,
      AdditionalLogo: !prevSettings.AdditionalLogo,
    }));
  };

  const openDialog = () => {
    setShowDialog(!showDialog);
  };

  const closeDialog = () => {
    setShowDialog(false);
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

  const buttonTextColor = isLightColor(settingsData.PrimaryColor)
    ? "text-black"
    : "text-white";
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>
        <div
          style={{ backgroundColor: settingsData.PrimaryColor }}
          className="w-36 h-16 rounded-xl mb-6"
        >
          <button
            className={`${buttonTextColor} py-2 px-4 rounded`}
            onClick={openDialog}
          >
            Choose Primary Color
          </button>
        </div>
        {showDialog ? (
          <SketchPicker
            className="mt-10"
            color={settingsData.PrimaryColor}
            onChange={handleColorChange}
          />
        ) : null}
        <form>
          <div className="mb-4 mt-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Logo Image:
            </label>
            {settingsData.MainLogo && (
              <div className="mt-4">
                <img
                  src={settingsData.MainLogo}
                  alt="Chosen Logo"
                  className="max-w-24 max-h-24 rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
            //   onChange={onFileChange}
              multiple
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="   p-4 text-center cursor-pointer"
            >
              <p className="border-2 border-dashed border-gray-300 p-4 bg-blue-200 rounded-lg text-lg font-bold text-gray-600">Change Logo</p>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <span className="text-gray-700 text-sm">Additional Logo:</span>
              <input
                type="checkbox"
                checked={settingsData.AdditionalLogo}
                onChange={handleAdditionalLogoToggle}
                className="ml-2 form-checkbox h-6 w-6 text-blue-500"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            Save Settings
          </button>
        </form>
      </div>

      {/* <Dialog isOpen={showDialog} onDismiss={closeDialog}>
       
      </Dialog> */}
    </div>
  );
};

export default App;
