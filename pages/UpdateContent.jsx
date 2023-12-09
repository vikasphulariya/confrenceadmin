/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Days_One, Inter } from "next/font/google";
// import { db } from "./firestoreConfig";
// Import the functions you need from the SDKs you need
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
import { useEffect, useState } from "react";

export default function UpdateContent() {
  const [dynamicData, setDynamicData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setDynamicData({
      ...dynamicData,
      [name]: value,
    });
  };
  useEffect(() => {
    // console.log("vikas");

    getData();
  }, []);

  const updateData = async (e) => {
    e.preventDefault();
    const temp = doc(db, "Website", "Data");
    console.log(dynamicData);
    // Use the updateDoc function to update specific fields in the document
    await updateDoc(temp, dynamicData).then(() => {
      alert("Update successfull");
    });

    console.log("Document updated successfully");
  };

  const getData = async () => {
    const firebaseData = doc(db, "Website", "Data");

    const docSnapshot = await getDoc(firebaseData);

    if (docSnapshot.exists()) {
      // Access the data from the document
      const data = docSnapshot.data();
      console.log("Document data:", data);
      setDynamicData(data);
    } else {
      console.log("No such document!");
    }
  };
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Convert FileList to an array
    const newImagePreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    // Update state with the new image previews
    setImagePreviews([...imagePreviews, ...newImagePreviews]);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };
  return (
    <main className="flex flex-col w-full  justify-center  items-center pb-10 ">
      <form className="flex flex-col w-full  justify-center items-center  ">
        <div className=" flex flex-col w-full md:w-1/2 justify-center items-center ">
          <div className="flex flex-col w-full  justify-center items-center ">
            <div className="flex w-full   flex-col items-center gap-x-6  sm:grid-cols-6">
              <div className="w-full justify-center items-center  ">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confrence Title
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Title}
                      type="text"
                      name="Title"
                      onChange={handleChange}
                      className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confrence Location
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Location}
                      type="text"
                      name="Location"
                      onChange={handleChange}
                      id="username"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confrence Discription
                </label>
                <div className="flex w-full mt-2">
                  <div className="flex w-full mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
                    <textarea
                      value={dynamicData.About}
                      name="About"
                      rows={10}
                      className="block w-full text-justify rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={"NA"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block mt-3 text-sm font-medium leading-6 text-gray-900"
                >
                  Confrence Date
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Date}
                      type="text"
                      name="Date"
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confrence Approval Link
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.approveLink}
                      type="url"
                      name="approveLink"
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start of Paper Submission date
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="paperSubmissionDate"
                      value={dynamicData.paperSubmissionDate}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Extented Paper Submission Date
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="extendedPaperSubmissionDate"
                      value={dynamicData.extendedPaperSubmissionDate}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Author Notified Date
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="authorNotified"
                      value={dynamicData.authorNotified}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Date of Registration
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="lastDateRegistration"
                      value={dynamicData.lastDateRegistration}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Registration Link
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="url"
                      name="RegistrationLink"
                      value={dynamicData.RegistrationLink}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

             
               
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            // type="submit"
            onClick={updateData}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </main>
  );
}
