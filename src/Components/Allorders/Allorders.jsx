import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Adding icons for order status and payment method

export const Allorders = () => {
    const [load, setload] = useState(false);
    const [allorders, setallorders] = useState([]);

    const { id } = jwtDecode(localStorage.getItem('usertoken'));

    async function getAllorders() {
        setload(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            setallorders(data);
            setload(false);
        } catch (error) {
            console.log(error);
            setload(false);
        }
    }

    useEffect(function () {
        getAllorders();
    }, []);

    if (load) {
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

    if (allorders.length <= 0) {
        return <div className='text-2xl text-center h-screen text-green-800 p-4'>No orders found</div>;
    }

    return (
        <section className='py-9 bg-gray-50'>
            <div className='w-full md:w-[80%] mx-auto'>
                {allorders && allorders.map((order, idx) => (
                    <div key={idx} className='p-5 mb-5 bg-white shadow-lg rounded-lg'>
                        {/* Order Cart Items */}
                        <div className='flex justify-start items-center flex-wrap gap-4'>
                            {order.cartItems.map((item, idx) => (
                                <div key={idx} className='w-full sm:w-1/4 md:w-1/6'>
                                    <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className='w-full h-40 object-cover rounded-lg shadow-md transform transition-all duration-300 hover:scale-105'
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Order Details */}
                        <div className='mt-4'>
                            <h2 className='text-2xl font-semibold text-green-600'>
                                Order Price: {order.totalOrderPrice} EGP
                            </h2>
                            <div className='flex items-center mt-2 text-xl'>
                                <span className='text-gray-600 mr-2'>
                                    <FaCreditCard className='inline text-lg text-gray-600' /> Payment Method:
                                </span>
                                <span className='font-medium'>
                                    {order.paymentMethodType === 'COD' ? (
                                        <span className='text-blue-600'>Cash On Delivery</span>
                                    ) : (
                                        <span className='text-green-600'>Online Payment</span>
                                    )}
                                </span>
                            </div>

                            {/* Order Status */}
                            <div className='mt-2'>
                                <h3 className='text-lg font-medium text-gray-800'>
                                    Order Status: 
                                    <span className={`ml-2 text-lg font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                                        {order.status === 'completed' ? (
                                            <FaCheckCircle className='inline text-2xl text-green-600' />
                                        ) : (
                                            <FaTimesCircle className='inline text-2xl text-red-600' />
                                        )}
                                        {order.status === 'completed' ? 'Completed' : 'Pending'}
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
