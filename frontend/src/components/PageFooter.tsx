import React, { useState } from "react";
import { Instagram } from "lucide-react";
import logo from "/favicon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePageHeaderHooks } from "../hooks/usePageHeaderHooks";
import { PageHeaderProps } from "../types/PageHeaderTypes";

export const PageFooter: React.FC<PageHeaderProps> = ({
  signInOverlay,
  signUpOverlay,
  setSignInOverlay,
  setSignUpOverlay,
}) => {
  const { handleSignIn } = usePageHeaderHooks({
    signInOverlay,
    signUpOverlay,
    setSignInOverlay,
    setSignUpOverlay,
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const BASE_URL: string = import.meta.env.VITE_BASE_URL;

  const adminEmail = import.meta.env.VITE_ADMIN;

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleJoinWaitlist();
    }
  };

  const handleJoinWaitlist = async () => {
    if (adminEmail === email) {
      handleSignIn();
    }
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
                <a
                  href="https://www.instagram.com/nycer.thebrand/"
                  className="hover:text-gray-300 ">
                  <Instagram className="mt-[2px]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@nycer.thebrand"
                  className="hover:text-gray-300">
                  <svg
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="pb-1 w-8 h-8">
                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                  </svg>
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
          <div className="mb-4">
            <p>
              Contact us at{" "}
              <a href="mailto:hello@wearenycer.com" className="font-bold">
                hello@wearenycer.com
              </a>
            </p>
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
