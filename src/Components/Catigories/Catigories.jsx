import axios from "axios";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner"; 
import Catchield from "../Catchield/Catchield";

export default function Categories() {
  const [load, setLoad] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cat, setCat] = useState(null);
  const [subcat, setSubcat] = useState(null);


  async function getCategory() {
    setLoad(true);
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCat(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  }


  async function getSubcat(id) {
    setLoader(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubcat(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }

  useEffect(function () {
    getCategory();
  }, []);

 
  if (load) {
    return (
      <div className="h-screen bg-green-100 flex justify-center items-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }


  if (loader) {
    return (
      <div className="h-screen bg-gray-100 flex justify-center items-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  return (
    <section className="md:p-10 p-6 bg-gray-50">
      <div className="w-full md:w-[80%] mx-auto">
        
        <div className="flex justify-center items-center flex-wrap gap-6">
          {cat?.map(function (ca, idx) {
            return (
              <div
                onClick={() => getSubcat(ca._id)}
                key={idx}
                className="w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
              >
                <div className="inner border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl bg-white">
                  <img
                    style={{ objectFit: "cover" }}
                    src={ca.image}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-110"
                    alt={ca.name}
                  />
                  <h2 className="p-3 text-center text-2xl text-green-700 font-semibold">{ca.name}</h2>
                </div>
              </div>
            );
          })}
        </div>

        
        <div className="py-6 mt-10">
          <h2 className="text-green-600 text-center font-mono text-3xl mb-6">Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {subcat ? (
              subcat.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex justify-center items-center bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg mb-4">
                    <i className="fa fa-cogs text-3xl text-green-600"></i>
                  </div>
                  <h3 className="text-center text-lg font-semibold text-gray-800">{item.name}</h3>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No subcategories found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
