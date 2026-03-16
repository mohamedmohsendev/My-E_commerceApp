import { Formik } from 'formik';
import React, { useState } from 'react';
import * as YUP from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Forgetpass() {
  const [change, setChange] = useState(false);

  const validation = YUP.object().shape({
    email: YUP.string().required("You must enter email").email("Enter a valid email"),
  });

  const user = {
    email: "",
  };

  async function forget(values) {
    setChange(true);
    
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
    
    setChange(false);
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: forget,
    validationSchema: validation
  });

  return (
    <section className="w-[90%] md:w-[80%] mx-auto p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="relative z-0 w-full group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            type="email" 
            name="email" 
            id="email" 
            className="peer block w-full py-3 px-4 text-sm text-gray-900 bg-white border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-green-500 placeholder-transparent" 
            placeholder=" " 
          />
          <label 
            htmlFor="email" 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 origin-[0] peer-focus:scale-75 peer-focus:translate-y-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            Email Address
          </label>
        </div>

        {/* Error Message */}
        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.email}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-2 px-4 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-200 focus:outline-none flex justify-center items-center"
        >
          {change ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </section>
  );
}
