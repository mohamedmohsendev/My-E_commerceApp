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
                className="w-full md:w-1/2 lg:w-1/3 p-4 cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={ca.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={ca.name}
                    />
                  </div>
                  <div className="p-6 text-center bg-white relative z-10 before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-white before:to-transparent">
                    <h2 className="text-2xl text-gray-900 font-bold group-hover:text-green-600 transition-colors">{ca.name}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
        <div className="py-6 mt-10">
          <h2 className="text-gray-900 text-center font-extrabold text-3xl md:text-4xl mb-10">Explore <span className="text-green-600">Subcategories</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {subcat ? (
              subcat.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 flex justify-center items-center bg-green-50 rounded-2xl mb-4 group-hover:bg-green-600 transition-colors duration-300">
                    <i className="fa fa-list text-2xl text-green-600 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors">{item.name}</h3>
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
