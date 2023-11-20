"use client";
import Image from "next/image";
import { Days_One, Inter } from "next/font/google";
import { db } from "./firestoreConfig";
import {
  getDocs,
  addDoc,
  getDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
function ContactDetails() {
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
    const temp = doc(db, "Website", "Contact");
    console.log(dynamicData);
    // Use the updateDoc function to update specific fields in the document
    await updateDoc(temp, dynamicData).then(() => {
      alert("Update successfull");
    });

    console.log("Document updated successfully");
  };

  const getData = async () => {
    const firebaseData = doc(db, "Website", "Contact");

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
  return (
    <main className="flex flex-col w-full  justify-center  items-center pb-10">
      <form className="flex flex-col w-full  justify-center items-center  ">
        <div className=" flex flex-col w-1/2  justify-center items-center ">
          <div className="flex flex-col w-full  justify-center items-center">
            <div className="flex w-full   flex-col items-center gap-x-6  sm:grid-cols-6">
              <div className="w-full justify-center items-center  ">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone No
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Phone}
                      type="number"
                      name="Phone"
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Email}
                      type="email"
                      name="Email"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <div className="flex mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={dynamicData.Address}
                      type="text"
                      name="Address"
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

export default ContactDetails;
