/* eslint-disable react/jsx-key */
// "use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import UpdateContnent from "./UpdateContent";
import { useState } from "react";
import CommitteData from "./CommittieData";
import ChiefsForm from "./temp";
import MyForm from "./temp";
import ContactDetails from "./ContactDetails";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import { PinData } from "./pin";
import Banner from "./Banner";
export default function Home() {
  const [verifPin, setVerifPin] = useState("");
  const [verifed, setVerifed] = useState(false);
  const [option, setOption] = useState("Main Page");
  const data = ["Main Page", "Committe", "Contact", "Paper Submission","Banner"];
  const [committie, setCommittie] = useState(false);
  const [mainPgae, setMainPage] = useState(false);

  const CheckPin = async (e) => {
    // console.log("ftht")
    e.preventDefault();
    // try {
    //   const response = await fetch("https://your-flask-api-url/check_pin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ pin:"6130" }),
    //   });

    //   const result = await response.json();
    //   console.log(result.result);
    // } catch (error) {
    //   console.log("Error checking pin:", error);
    //   alert("kj")
    // }
    // let data = JSON.stringify({
    //   pin: "6130",
    // });

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://confrenceadmin.onrender.com/verify_pin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     alert(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
      console.log("c");

    try {
      console.log(PinData);
      if(PinData.pin==verifPin){
        setVerifed(true)
      }
      // setCheckResult(response.data.result);
    } catch (error) {
      console.log("Error checking pin:", error);
    }
    // };

    // alert("hi");
  };

  return (
    <main
      className={`flex flex-1 h-full flex-col items-center justify-between w-full  bg-white py-10 `}
    >
      {verifed ? (
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-row">
            {data.map((item) => {
              return (
                <button
                  onClick={() => {
                    setOption(item);
                  }}
                  className={` transform duration-500 ${
                    option === item ? "bg-green-400 scale-110" : "bg-red-500"
                  } py-2 mx-2 px-3 rounded-full shadow-lg shadow-[#c7c7c7]`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {option === "Main Page" ? (
            <div
              className={`flex flex-col items-center justify-between w-full bg-white py-10 `}
            >
              <UpdateContnent />
              {/* <MyForm /> */}
            </div>
          ) : null}
          {option === "Committe" ? (
            <div
              className={`flex flex-col items-center justify-between w-full bg-white py-10 `}
            >
              {/* <UpdateContnent /> */}
              <MyForm />
            </div>
          ) : null}

          {option === "Contact" ? (
            <div
              className={`flex flex-col items-center justify-between w-full bg-white py-10 `}
            >
              {/* <ChiefsForm/> */}
              <ContactDetails />
            </div>
          ) : null}
          {option === "Banner" ? (
            <div
              className={`flex flex-col items-center justify-between w-full bg-white py-10 `}
            >
              {/* <ChiefsForm/> */}
              <Banner />
            </div>
          ) : null}
        </div>
      ) : (
        <div className=" grid w-screen items-center absolute h-full inset-y-0   justify-center">
          <div className="">
            <label className="flex  text-center  justify-center text-lg font-bold text-black mb-2">
              Enter Pin to Access Website
            </label>
            <div>
              <form onSubmit={CheckPin}>
                <input
                  value={verifPin}
                  onChange={(e) => {
                    // alert(e.target.value);

                    setVerifPin(e.target.value);
                  }}
                  type="password"
                  className="rounded-xl text-black"
                  placeholder="Enter Pin"
                />
                <button 
                  // type="submit"
                  className="bg-green-400  transform duration-500 h-full py-1.5 px-3 rounded-xl ml-3 font-bold text-lg hover:scale-105"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

