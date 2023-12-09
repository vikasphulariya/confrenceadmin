import React, { useState } from "react";
import Image from "next/image";
import UpdateContent from "./UpdateContent";
import MyForm from "./temp";
import ContactDetails from "./ContactDetails";
import Banner from "./Banner";
import axios from "axios";
import Settings from "./Settings"
import { PinData } from "./pin";

export default function Home() {
  const [verifPin, setVerifPin] = useState("");
  const [verified, setVerified] = useState(false);
  const [option, setOption] = useState("Main Page");
  const data = ["Main Page", "Committee", "Contact", "Paper Submission", "Banner","Settings" ];

  const handleOptionClick = (item) => {
    setOption(item);
  };

  const handlePinVerification = async (e) => {
    e.preventDefault();
    try {
      if (PinData.pin == verifPin) {
        setVerified(true);
      }
      else{

        alert("regreg")
      }
    } catch (error) {
      console.log("Error checking pin:", error);
    }
  };

  return (
    <main className={`flex flex-1 h-full flex-col items-center w-full bg-white py-10 `}>
      {verified ? (
        <div className="flex flex-col w-full items-center flex-wrap ">
          <div className="flex flex-row">
            {data.map((item) => (
              <button
                key={item}
                onClick={() => handleOptionClick(item)}
                className={`transform duration-500 ${
                  option === item ? "bg-green-400 scale-110" : "bg-red-500"
                } py-2 mx-2 px-3 rounded-full shadow-lg shadow-[#c7c7c7]`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={`flex flex-col items-center justify-between w-full bg-white py-10`}>
            {option === "Main Page" && <UpdateContent />}
            {option === "Committee" && <MyForm />}
            {option === "Contact" && <ContactDetails />}
            {option === "Banner" && <Banner />}
            {option === "Settings" && <Settings />}
          </div>
        </div>
      ) : (
        <div className="grid w-screen items-center absolute h-full inset-y-0 justify-center">
          <div>
            <label className="flex text-center justify-center text-lg font-bold text-black mb-2">
              Enter Pin to Access Website
            </label>
            <form onSubmit={handlePinVerification}>
              <input
                value={verifPin}
                onChange={(e) => setVerifPin(e.target.value)}
                type="password"
                className="rounded-xl text-black"
                placeholder="Enter Pin"
              />
              <button
                type="submit"
                className="bg-green-400 transform duration-500 h-full py-1.5 px-3 rounded-xl ml-3 font-bold text-lg hover:scale-105"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
