import amazonPay from "./../../assets/images/amazon-pay.png";
import americanExpress from "./../../assets/images/american-express.png";
import masterCard from "./../../assets/images/mastercard.png";
import payPal from "./../../assets/images/paypal.png";
import appleIcon from "./../../assets/images/apple-logo.png";
import googlePlay from "./../../assets/images/google-play-icon.png";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] text-gray-800 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">
            Get the FreshCart app
          </h2>
          <p className="text-gray-600">
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="w-full md:w-[75%] lg:w-[80%] mb-4 md:mb-0">
            <div className="relative">
              <input
                type="email"
                id="email-address-icon"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@mail.com"
              />
              <button
                type="button"
                className="absolute right-0 top-0 px-4 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none"
              >
                Share Link
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between py-6 border-t border-gray-200">
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <p className="font-semibold text-sm text-gray-700 mb-3">
              Payment Partners
            </p>
            <div className="flex items-center gap-4">
              <img src={amazonPay} className="w-12" alt="Amazon Pay" />
              <img
                src={americanExpress}
                className="w-12"
                alt="American Express"
              />
              <img src={masterCard} className="w-12" alt="MasterCard" />
              <img src={payPal} className="w-12" alt="PayPal" />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <p className="font-semibold text-sm text-gray-700 mb-3">
              Get deliver with FreshCart
            </p>
            <div className="flex gap-4">
              <button className="flex items-center text-white bg-[#050708] px-4 py-2 rounded-lg hover:bg-[#050708]/90 focus:outline-none text-xs">
                <img src={appleIcon} className="w-6 mr-2" alt="Apple Store" />
                <span className="text-xs">Apple Store</span>
              </button>
              <button className="flex items-center text-white bg-[#050708] px-4 py-2 rounded-lg hover:bg-[#050708]/90 focus:outline-none text-xs">
                <img src={googlePlay} className="w-6 mr-2" alt="Google Play" />
                <span className="text-xs">Google Play</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 py-4">
          <a
            href="https://www.facebook.com/mohamedmohsenmadbouly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 text-lg"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/mohamedmohsendev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-500 text-lg"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 text-lg"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="text-center text-gray-600 text-xs">
          <p>
            © 2025 All Rights Reserved | Built by{" "}
            <span className="font-semibold text-green-600">Mohamed Mohsen</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
