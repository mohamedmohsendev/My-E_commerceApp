import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../context/UserContext";

export default function Register() {
  let { setusertoken } = useContext(Usercontext);
  const navigate = useNavigate();
  const [change, setchange] = useState(false);

  const validation = YUP.object().shape({
    name: YUP.string()
      .required("You must enter the name")
      .min(3, "Min is 3 characters")
      .max(15, "Max is 10 characters"),
    email: YUP.string()
      .required("You must enter an email")
      .email("Enter a valid email"),
    phone: YUP.string()
      .required("You must enter a phone number")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    password: YUP.string()
      .required("You must enter a password")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long")
      .matches(/^[A-Za-z0-9@!#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]+$/, "Password must be a valid format"),
    rePassword: YUP.string()
      .required("You must confirm the password")
      .oneOf([YUP.ref("password")], "Passwords must match"),
  });

  async function registerNow(values) {
    setchange(true);
    try {
      let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      toast.success(res.data.message);
      localStorage.setItem("usertoken", res.data.token);
      setusertoken(res.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setchange(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: registerNow,
    validationSchema: validation,
  });

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:max-w-3xl lg:px-8">
      <h2 className="mb-6 font-bold text-center text-4xl text-green-700">Register Now</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="relative z-0 w-full group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
            className="block w-full py-2.5 px-4 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 peer-focus:scale-75 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-focus:-translate-y-6">Full Name</label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.name}
          </div>
        )}

        {/* Phone */}
        <div className="relative z-0 w-full group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            className="block w-full py-2.5 px-4 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 peer-focus:scale-75 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-focus:-translate-y-6">Your Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.phone}
          </div>
        )}

        {/* Email */}
        <div className="relative z-0 w-full group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block w-full py-2.5 px-4 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 peer-focus:scale-75 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-focus:-translate-y-6">Email Address</label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.email}
          </div>
        )}

        {/* Password */}
        <div className="relative z-0 w-full group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block w-full py-2.5 px-4 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 peer-focus:scale-75 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.password}
          </div>
        )}

        {/* Repassword */}
        <div className="relative z-0 w-full group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block w-full py-2.5 px-4 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="rePassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 peer-focus:scale-75 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-focus:-translate-y-6">Repassword</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.rePassword}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-3 px-6 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 focus:outline-none transition-all duration-200"
        >
          {change ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <>
              <i className="fa-solid fa-user-plus"></i>
              <span>Register</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
