import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "/favicon.png";
import { useNavigate } from "react-router-dom";

export const PageFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#694331] text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="NYCER Logo"
              className="w-8 h-8 mr-2 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="text-xl font-bold text-[#FFFFFF]">NYCER</span>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">
                  <Facebook />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  <Instagram />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  <Twitter />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 pr-14 py-2 outline-none placeholder:font-bold text-black mb-2 sm:mb-0 w-full sm:w-auto"
          />
          <button className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 w-full sm:w-auto">
            Join WaitList
          </button>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="mb-4">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
