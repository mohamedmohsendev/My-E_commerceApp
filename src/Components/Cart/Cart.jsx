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
       
        <h2 className="p-4 text-green-600 text-2xl font-mono text-center">
          Total Price: {totalprice} EGP
        </h2>

       
        <button
          onClick={deleteAll}
          className="p-3 mb-4 rounded-lg text-white text-2xl font-bold text-center mx-auto block w-full bg-red-500 hover:bg-red-600 transition duration-300 flex items-center justify-center"
        >
          <FaTrashAlt className="mr-2" /> Delete All
        </button>

      
        <Link
          to="/Payment"
          className="p-3 mb-4 rounded-lg text-white text-2xl font-bold text-center mx-auto block bg-green-500 hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          Proceed to Payment
        </Link>

       
        {products?.map((item, idx) => {
          return (
            <div key={idx} className="border-2 border-b-green-400 flex p-4 bg-slate-200 flex-wrap justify-center items-center mb-5 rounded-lg shadow-lg">
              
              <div className="md:w-1/6 w-full mb-4 md:mb-0">
                <img src={item.product.imageCover} className="w-full rounded-lg" alt={item.product.title} />
              </div>

         
              <div className="md:w-4/6 w-full">
                <h2 className="p-3 text-green-600 text-xl font-semibold">
                  {item.product.title.split(" ").slice(0, 3).join(" ")}...
                </h2>
                <p className="p-3 text-xl">Price: {item.price} EGP</p>

              
                <button
                  onClick={() => deleteproduct(item.product.id)}
                  className="py-3 mb-5 md:mb-0 px-4 w-[50%] mx-auto block bg-red-600 rounded-2xl text-white flex items-center justify-center hover:bg-red-700 transition duration-300"
                >
                  {load2[item.product.id] ? <i className="fa-solid fa-spinner fa-spin"></i> : <FaTrashAlt />}
                  <span className="ml-2">{load2[item.product.id] ? "Removing..." : "Remove"}</span>
                </button>
              </div>

            
              <div className="md:w-1/6 w-full flex md:justify-between justify-center items-center mt-4 md:mt-0">
               
                <button
                  className="p-2 text-xl text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                  onClick={() => updataProduct(item.product.id, item.count + 1)}
                >
                  <FaPlus />
                </button>

              
                <p className="p-2 text-xl text-white bg-green-600 rounded-lg mx-2 flex items-center justify-center">
                  {load[item.product.id] ? <i className="fa-solid fa-spinner fa-spin"></i> : item.count}
                </p>

               
                <button
                  className={`${item.count === 0 ? "opacity-25" : ""} p-2 text-xl text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center`}
                  onClick={() => updataProduct(item.product.id, item.count - 1)}
                  disabled={item.count === 0}
                >
                  <FaMinus />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
