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
      <section className="p-9 bg-gray-50 flex flex-col items-center">
        <h2 className="text-gray-900 text-center font-extrabold text-3xl md:text-4xl mb-10">
          Explore <span className="text-green-600">Brands</span>
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
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer flex flex-col h-full"
                >
                  <div className="p-6 flex-grow flex items-center justify-center bg-white line-clamp-2">
                    <img
                      src={item.image}
                      className="w-full max-h-48 object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                      alt={item.name}
                    />
                  </div>
                  <div className="p-4 text-center bg-gray-50 border-t border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      {item.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
