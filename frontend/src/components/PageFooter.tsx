import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "/favicon.png";
import { useNavigate } from "react-router-dom";

// TODO: fix the alignment

export const PageFooter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#694331] text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="ml-10">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="NYCER Logo"
              className="w-8 h-8 mr-2"
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
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 pr-36 py-2 outline-none placeholder:font-bold text-black"
          />
          <button className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4">
            Join WaitList
          </button>
        </div>

        <div>
          <div className="flex items-center">
            <div className="mr-4">
              <p>
                Have questions or need support? Contact us at +1 (234) 567-890
                or
              </p>
              <a href="mailto:info@example.com" className="hover:text-gray-300">
                info@example.com
              </a>
            </div>
            <div>
              <p>123 Street Name, City, Country, 12345</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="mr-4">
              <p>&copy; 2023 Acme Inc. All rights reserved.</p>
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
      </div>
    </footer>
  );
};
