import React, { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "/favicon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const PageFooter: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleJoinWaitlist();
    }
  };

  const handleJoinWaitlist = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setErrorModalVisible(true);
      return;
    }
    try {
      await axios.post(`${BASE_URL}/emails`, { email });
      setSuccessModalVisible(true);
      setEmail("");
      setError("");
    } catch (error) {
      setError("Failed to add email to waitlist. Please try again later.");
      setErrorModalVisible(true);
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 pr-14 py-2 outline-none placeholder:font-bold text-black mb-2 sm:mb-0 w-full sm:w-auto"
          />
          <button
            className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 w-full sm:w-auto"
            onClick={handleJoinWaitlist}>
            Join WaitList
          </button>
          {errorModalVisible && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center"
              role="dialog"
              aria-modal="true">
              <div
                className="bg-white p-8 rounded shadow-md max-w-md mx-auto"
                role="document">
                <p className="text-red-500">{error}</p>
                <button
                  className="bg-black text-white font-bold py-2 px-4 mt-4"
                  onClick={() => setErrorModalVisible(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
          {successModalVisible && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-8 rounded shadow-md">
                <p className="text-green-500">
                  Email successfully added to waitlist!
                </p>
                <button
                  className="bg-black text-white font-bold py-2 px-4 mt-4"
                  onClick={() => setSuccessModalVisible(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
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
