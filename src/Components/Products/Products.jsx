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
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group relative">
                <Link to={`/ProductDetails/${product.id}`}>
                  <div className="inner p-4 bg-slate-100 cursor-pointer group">
                    <img
                      src={product.imageCover}
                      alt="img"
                      className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="mt-4 text-center">
                      <div className="text-gray-600">{product.category.name}</div>
                      <div className="font-semibold text-gray-800 text-lg truncate">{product.title.split(" ").slice(0, 2).join(" ")}</div>
                      <div className="flex justify-between items-center mt-2 text-gray-700">
                        <div className="text-lg font-bold text-green-600">{product.price}</div>
                        <div className="flex items-center">
                          <i className="fa fa-star text-yellow-500 mr-2"></i>
                          <span>{product.ratingsAverage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-gray-600">
                      <i
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          addtowish(e, product.id);
                        }}
                        className={`${isInWishlist(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-2xl`}
                      ></i>
                      {lod[product.id] ? <i className="fa-solid fa-spinner fa-spin text-green-500"></i> : ""}
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <button
  onClick={() => specificaddtocart(product.id)}
  className="py-3 px-6 w-full bg-green-600 rounded-2xl group hover:bg-green-800 duration-300 text-white my-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
>
  {/* إضافة أيقونة الدائرة المتحركة عند التحميل */}
  {loading[product.id] ? (
    <i className="fa-solid fa-spinner fa-spin text-white"></i>  // Spinner عند التحميل
  ) : (
    <>
      <FaShoppingCart className="text-white" /> {/* أيقونة عربة التسوق */}
      <span>Add to Cart</span> {/* نص الزر */}
    </>
  )}
</button>

                {/* Details Button */}
                <Link
                  to={`/ProductDetails/${product.id}`}
                  className="flex items-center justify-center py-3 px-6 w-full bg-blue-600 rounded-2xl text-white font-semibold shadow-md mt-2 hover:bg-blue-800 transition-all duration-300"
                >
                  <i className="fa fa-info-circle mr-2"></i> Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
