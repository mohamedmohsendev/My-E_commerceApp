import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { productToCart } from './../../context/AddProductToCartContext';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'; // استيراد الأيقونات من مكتبة react-icons

export const Payment = () => {
  const { cartid, settotalprice, setproducts, setnumofitems } = useContext(productToCart);
  const [details, setdetails] = useState('');
  const [phone, setphone] = useState('');
  const [city, setcity] = useState('');
  const [errors, seterrors] = useState({ details: '', phone: '', city: '' });

  function validatae() {
    let valid = true;
    let newErrors = { details: '', phone: '', city: '' };

    if (details === '') {
      newErrors.details = 'Details are required';
      valid = false;
    }

    const phonereg = /^01[0125][0-9]{8}$/;
    if (!phonereg.test(phone)) {
      newErrors.phone = 'Invalid Egyptian phone number';
      valid = false;
    }

    if (city === '') {
      newErrors.city = 'City is required';
      valid = false;
    }

    seterrors(newErrors);
    return valid;
  }


  async function onlinepayment() {
    if (!validatae()) return;

    let CartData = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,
        CartData,
        {
          headers: {
            token: localStorage.getItem('usertoken'),
          },
        }
      );

      toast.success(data.status);
      setnumofitems(0);
      setproducts([]);
      settotalprice(0);
      window.open(data.session.url);
    } catch (error) {
      toast.error('Error creating order');
    }
  }


  async function cashpayment() {
    if (!validatae()) return;

    let CartData = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,
        CartData,
        {
          headers: {
            token: localStorage.getItem('usertoken'),
          },
        }
      );

      toast.success(data.status);
      setnumofitems(0);
      setproducts([]);
      settotalprice(0);
    } catch (error) {
      toast.error('Error creating order');
    }
  }

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">Secure <span className="text-green-600">Checkout</span></h2>
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
    
        <div className="mb-5">
          <label htmlFor="city" className="block text-sm text-gray-600 font-medium mb-2">
            Your City
          </label>
          <input
            onChange={(e) => setcity(e.target.value)}
            type="text"
            id="city"
            value={city}
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all outline-none"
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        
        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm text-gray-600 font-medium mb-2">
            Your Phone
          </label>
          <input
            onChange={(e) => setphone(e.target.value)}
            type="tel"
            id="phone"
            value={phone}
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all outline-none"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

      
        <div className="mb-5">
          <label htmlFor="details" className="block text-sm text-gray-600 font-medium mb-2">
            Delivery Details
          </label>
          <input
            onChange={(e) => setdetails(e.target.value)}
            type="text"
            id="details"
            value={details}
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all outline-none"
            placeholder="Enter delivery details"
          />
          {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
        </div>

       
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={cashpayment}
            className="w-full sm:w-1/2 py-3 bg-gray-100 text-gray-800 font-bold rounded-2xl hover:bg-gray-200 transition duration-300 flex items-center justify-center border border-gray-200 hover:-translate-y-1"
          >
            <FaMoneyBillWave className="mr-2 text-xl" /> Cash Payment
          </button>

          <button
            onClick={onlinepayment}
            className="w-full sm:w-1/2 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center hover:-translate-y-1"
          >
            <FaCreditCard className="mr-2 text-xl" /> Online Payment
          </button>
        </div>
      </div>
    </section>
  );
};
