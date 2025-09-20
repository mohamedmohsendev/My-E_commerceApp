import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import { useQuery } from "react-query";  // Assuming you have react-query installed
import Model from "../Model/Model";  // Assuming Model is a custom component for modal

export default function Brands() {
  const [spebrand, setspebrand] = useState("unknown");
  const [toload, settoload] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Fetch specific brand data by ID
  async function getspebrand(id) {
    settoload(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setspebrand(data.data.name);
    } catch (error) {
      console.log(error);
    }
    settoload(false);
  }

  // Fetch all brands data
  async function getbrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  // Use react-query to fetch data
  let { data, isLoading } = useQuery("brands", getbrands);

  // If loading data, show the loader
  if (isLoading) {
    return (
      <div className="h-screen bg-green-400 flex justify-center items-center">
        <ColorRing
          visible={true}
          width="200"
          color="green"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <>
      {/* Modal for displaying brand details */}
      <Model
        load={toload}
        name={spebrand}
        modeltoggle={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      
      {/* Brands Section */}
      <section className="p-9 bg-gray-50">
        <h2 className="text-center text-green-700 font-mono text-3xl mb-6">
          All Brands
        </h2>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.data.data.map(function (item, idx) {
            return (
              <div key={idx} className="w-full p-4">
                <div
                  onClick={() => {
                    toggleModal();
                    getspebrand(item._id);
                  }}
                  className="inner p-4 border-2 rounded-lg hover:drop-shadow-2xl cursor-pointer duration-300 transform transition-all hover:scale-105"
                >
                  <img
                    src={item.image}
                    className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 transform hover:scale-110"
                    alt={item.name}
                  />
                  <h2 className="text-center text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
