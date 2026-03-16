import { useContext } from "react";
import { productToCart } from './../../context/AddProductToCartContext';
import { FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'; // إضافة الأيقونات من مكتبة FontAwesome

export default function Cart() {
  let { products, totalprice, updataProduct, load, deleteproduct, load2, deleteAll } = useContext(productToCart);

 
  if (products?.length === 0) {
    return (
      <div className="pt-20 text-center text-2xl text-green-600 h-screen">
        No Products in the Cart
      </div>
    );
  }

  return (
    <section>
      <div className="w-[90%] md:w-[80%] mx-auto py-9">
       
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">
            Total: <span className="text-green-600">{totalprice}</span> <span className="text-xl text-gray-500 font-medium">EGP</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={deleteAll}
              className="py-3 px-6 rounded-2xl text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 font-bold transition duration-300 flex items-center justify-center border border-red-100"
            >
              <FaTrashAlt className="mr-2" /> Clear Cart
            </button>
            <Link
              to="/Payment"
              className="py-3 px-8 rounded-2xl text-white bg-green-600 hover:bg-green-700 font-bold transition duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>



       
        {products?.map((item, idx) => {
          return (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center mb-5 gap-6">
              
              <div className="md:w-1/6 w-full">
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-2">
                  <img src={item.product.imageCover} className="w-full h-auto object-contain rounded-xl mix-blend-multiply" alt={item.product.title} />
                </div>
              </div>

              <div className="md:w-3/6 w-full text-center md:text-left flex flex-col items-center md:items-start">
                <h2 className="text-xl md:text-2xl text-gray-900 font-bold mb-2">
                  {item.product.title}
                </h2>
                <div className="text-2xl font-black text-green-600 mb-4">
                  {item.price} <span className="text-sm text-gray-500 font-medium">EGP</span>
                </div>

                <button
                  onClick={() => deleteproduct(item.product.id)}
                  className="py-2 px-6 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition duration-300 font-medium border border-transparent hover:border-red-100"
                >
                  {load2[item.product.id] ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <FaTrashAlt className="mr-2" />}
                  <span>{load2[item.product.id] ? "Removing..." : "Remove"}</span>
                </button>
              </div>

              <div className="md:w-2/6 w-full flex justify-center md:justify-end items-center">
                <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                  <button
                    className={`${item.count === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-red-500 shadow-sm"} w-10 h-10 flex items-center justify-center text-gray-600 rounded-xl transition duration-300`}
                    onClick={() => updataProduct(item.product.id, item.count - 1)}
                    disabled={item.count === 0}
                  >
                    <FaMinus />
                  </button>
                  
                  <div className="w-14 text-center text-xl font-bold text-gray-900">
                    {load[item.product.id] ? <i className="fa-solid fa-spinner fa-spin text-green-500 text-lg"></i> : item.count}
                  </div>

                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:text-green-600 shadow-sm rounded-xl transition duration-300"
                    onClick={() => updataProduct(item.product.id, item.count + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
