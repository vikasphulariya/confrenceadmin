"use client"
import Image from "next/image";
import { db } from "./firestoreConfig";
import { Days_One, Inter } from "next/font/google";
import {
  getDocs,
  addDoc,
  getDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

const DynamicForm = ({ data, setData, itemName }) => {
  const handleAddItem = () => {
    setData((prevData) => ({
      ...prevData,
      [itemName]: [...prevData[itemName], ""],
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...data[itemName]];
    updatedItems.splice(index, 1);
    setData({ ...data, [itemName]: updatedItems });
  };

  const handleChangeItem = (index, value) => {
    const updatedItems = [...data[itemName]];
    updatedItems[index] = value;
    setData({ ...data, [itemName]: updatedItems });
  };

  return (
    <div className="flex flex-col w-full  justify-center  items-center pb-10 ">
      <form className="flex flex-col w-full  justify-center items-center  ">
        {data[itemName].map((item, index) => (
          <div key={index} className=" flex flex-col w-1/2  justify-center items-center ">
            {/* <label className="text-black capitalize">{`${itemName} ${index + 1}: `}</label> */}
            <div className="mt-2 flex flex-col w-full  justify-center items-center">
              <div className="flex w-full mb-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="bg-red-400 rounded-md px-2 py-1 ml-2"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          className="bg-green-400 rounded-md px-2 py-1"
          type="button"
          onClick={handleAddItem}
        >
          Add {itemName}
        </button>
      </form>
      {/* <div>
        <h3>Dynamic Data:</h3>
        <pre className={"text-black"}>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
    </div>
  );
};

const MyForm = () => {
  const [formData, setFormData] = useState({
    chiefs: [],
    technicalProgramChairs: [],
    "Co-Patron": [],
    "Conference General Chair": [],
    // Add more items as needed
  });

  useEffect(() => {
    // console.log("vikas");

    getData();
  }, []);
  const getData = async () => {
    const firebaseData = doc(db, "Website", "Comitte");

    const docSnapshot = await getDoc(firebaseData);

    if (docSnapshot.exists()) {
      // Access the data from the document
      const data = docSnapshot.data();
      console.log("Document data:", data);
      setFormData(data);
    } else {
      console.log("No such document!");
    }
  };
  const updateData = async (e) => {
    e.preventDefault();
    const temp = doc(db, "Website", "Comitte");
    console.log(formData);
    // Use the updateDoc function to update specific fields in the document
    await updateDoc(temp, formData).then(() => {
      alert("Update successfull");
    });

    console.log("Document updated successfully");
  };
  return (
    <div className="flex flex-col w-full  justify-center  items-center pb-10">
      <label className="text-black text-lg font-bold ">Cheif's</label>
      <DynamicForm data={formData} setData={setFormData} itemName="chiefs" />
      <label className="text-black text-lg font-bold">
        Technical Program Chair's
      </label>

      <DynamicForm
        data={formData}
        setData={setFormData}
        itemName="technicalProgramChairs"
      />
      <label className="text-black text-lg font-bold">Co-Patron's</label>

      <DynamicForm data={formData} setData={setFormData} itemName="Co-Patron" />
      <label className="text-black text-lg font-bold">Conference General Chair's</label>

      <DynamicForm data={formData} setData={setFormData} itemName="Conference General Chair" />
      <button
        onClick={(e) => {
          updateData(e);
        }}
        className="bg-green-600 px-2 py-1 transform duration-500 rounded-md my-4 text-xl shadow-[#c0c0c0] shadow-lg hover:scale-105"
      >
        Update Commitee Details
      </button>
    </div>
  );
};

export default MyForm;
