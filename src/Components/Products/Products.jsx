import { FaShoppingCart } from 'react-icons/fa';  

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import TopSlider from './../slider/TopSlider';
import CategorySlider from './../slider/catigorySlider/CategorySlider';
import { Link } from "react-router-dom";
import { productToCart } from './../../context/AddProductToCartContext';
import toast from "react-hot-toast";
import { woshlist } from "../../context/Woshlist";

export default function Products() {

  let { dataofwosh, getwoshlist, gip } = useContext(woshlist);
  const [loading, setLoading] = useState({});
  let [lod, setLod] = useState({});

  const { AddToCart } = useContext(productToCart);

  async function specificaddtocart(id) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    let data = await AddToCart(id);
    if (data) {
      toast.success(data.message);
    } else {
      toast.error("Error");
    }
    setLoading((prev) => ({ ...prev, [id]: false }));
  }

  async function getAllData() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("products", getAllData, {
    refetchOnMount: false,
  });

  useEffect(function () {
    gip();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  async function addtowish(e, id) {
    setLod((prev) => ({ ...prev, [id]: true }));
    e.target.classList.replace("fa-regular", "fa-solid");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("usertoken"),
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
    setLod((prev) => ({ ...prev, [id]: false }));
  }

  function isInWishlist(productId) {
    return dataofwosh?.some((data) => data.id === productId);
  }

  return (
    <div className="py-10 bg-gray-50">
      <div className="w-full md:w-[90%] mx-auto">
        <TopSlider />
        <CategorySlider />
        <div className="flex justify-center flex-wrap items-center gap-6 mt-8">
          {data.data.data.map((product, index) => (
            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative flex flex-col h-full">
                <Link to={`/ProductDetails/${product.id}`}>
                  <div className="inner p-5 bg-white cursor-pointer group rounded-t-2xl">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={product.imageCover}
                        alt="img"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-5 text-left">
                      <div className="text-sm font-medium text-green-600 mb-1 tracking-wider uppercase">{product.category.name}</div>
                      <div className="font-bold text-gray-900 text-lg truncate mb-2 transition-colors group-hover:text-green-600">{product.title.split(" ").slice(0, 2).join(" ")}</div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xl font-extrabold text-gray-900">{product.price} <span className="text-sm font-normal text-gray-500">EGP</span></div>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                          <i className="fa fa-star text-yellow-500 text-sm mr-1"></i>
                          <span className="font-semibold text-gray-700">{product.ratingsAverage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          addtowish(e, product.id);
                        }}
                        className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all duration-300"
                      >
                        <i className={`${isInWishlist(product.id) ? "fa-solid text-red-500" : "fa-regular"} fa-heart text-xl`}></i>
                      </button>
                      {lod[product.id] && (
                        <div className="absolute -top-1 -right-1">
                          <i className="fa-solid fa-spinner fa-spin text-green-500"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="px-5 pb-5">
                  <div className="flex gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => specificaddtocart(product.id)}
                      className="flex-grow py-3 px-4 bg-green-600 rounded-xl group-hover:bg-green-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {loading[product.id] ? (
                        <i className="fa-solid fa-spinner fa-spin text-white"></i>
                      ) : (
                        <>
                          <FaShoppingCart className="text-white text-lg" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                    
                    {/* Details Button */}
                    <Link
                      to={`/ProductDetails/${product.id}`}
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                      title="View Details"
                    >
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
