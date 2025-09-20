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
          <div className="w-full md:w-1/3 p-5">
            <img
              src={data?.data.data.imageCover}
              alt={data?.data.data.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3 p-5">
            <h2 className="text-4xl font-semibold text-green-600 mb-4">
              {data?.data.data.title}
            </h2>
            <p className="text-lg text-gray-700 font-mono mb-6">
              {data?.data.data.description}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              Category: <span className="font-semibold">{data?.data.data.category.name}</span>
            </p>
            <div className="flex justify-between items-center text-xl text-gray-800 mb-4">
              <div className="font-bold text-green-600">{data?.data.data.price}</div>
              <div className="flex items-center">
                <i className="fa fa-star text-yellow-500 mr-2"></i>
                <span>{data?.data.data.ratingsAverage}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => specificaddtocart(id)}
              className="w-full py-3 px-6 bg-green-600 rounded-2xl text-white font-semibold hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg mt-6"
            >
              {check ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
