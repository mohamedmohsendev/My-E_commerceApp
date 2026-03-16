import { useParams } from "react-router-dom";
import static2 from "../../assets/images/grocery-banner-2.jpeg";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from 'react-loader-spinner';
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { productToCart } from './../../context/AddProductToCartContext';

export default function ProductDetails() {
  let { id } = useParams();
  const [check, setcheck] = useState(false);

  let { AddToCart } = useContext(productToCart);

  async function specificaddtocart(id) {
    setcheck(true);
    let data = await AddToCart(id);
    if (data) {
      toast.success(data.message);
    } else {
      toast.error("Error");
    }
    setcheck(false);
  }

  async function getDetails() {
    return await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading } = useQuery(`productDetails${id}`, getDetails);

  if (isLoading) {
    return (
      <div className="h-screen bg-green-400 flex justify-center items-center">
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
    <section className="py-10 bg-gray-50">
      <div className="w-full md:w-[90%] mx-auto">
        <div className="flex flex-wrap justify-center gap-8 items-center">

          {/* Image Section */}
          <div className="w-full md:w-1/2 lg:w-5/12 p-5 flex justify-center">
            <div className="relative p-4 bg-white rounded-3xl shadow-sm border border-gray-100 group">
              <img
                src={data?.data.data.imageCover}
                alt={data?.data.data.title}
                className="w-full max-w-sm h-auto object-contain rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 lg:w-7/12 p-5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-sm font-semibold rounded-full tracking-wide uppercase">
                  {data?.data.data.category.name}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {data?.data.data.title}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {data?.data.data.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-between mb-8 pb-8 border-b border-gray-100 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Price</span>
                  <div className="text-4xl font-black text-green-600">
                    {data?.data.data.price} <span className="text-xl text-gray-500 font-medium">EGP</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 mb-1">Rating</span>
                  <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-xl">
                    <i className="fa fa-star text-yellow-500 text-xl mr-2"></i>
                    <span className="text-xl font-bold text-gray-800">{data?.data.data.ratingsAverage}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => specificaddtocart(id)}
                className="w-full sm:w-auto min-w-[200px] py-4 px-8 bg-green-600 rounded-2xl text-white text-lg font-bold hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                {check ? (
                  <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus text-xl"></i>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
