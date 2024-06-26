import React from "react";
import logo from "../assets/NYCERIconOnly-01.png";
import { useNavigate } from "react-router-dom";
import { usePageHeaderHooks } from "../hooks/usePageHeaderHooks";
import { PageHeaderProps } from "../types/PageHeaderTypes";

export const PageHeader: React.FC<PageHeaderProps> = ({
  signInOverlay,
  signUpOverlay,
  setSignInOverlay,
  setSignUpOverlay,
}) => {
  const { currentUser, handleLogout } = usePageHeaderHooks({
    signInOverlay,
    signUpOverlay,
    setSignInOverlay,
    setSignUpOverlay,
  });
  const navigate = useNavigate();
  const adminEmail = import.meta.env.VITE_ADMIN;

  return (
    <nav className="bg-[#694331] px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-2 md:mt-2">
        <img
          src={logo}
          alt="Logo"
          className="h-14 md:h-14 pt-2 md:pt-0 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {currentUser && currentUser.idToken.payload.email === adminEmail && (
          <button
            className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
            onClick={() => navigate("/admin")}>
            Admin
          </button>
        )}
        <button className="text-white" onClick={() => navigate("/products")}>
          Products
        </button>
        <button className="text-white" onClick={() => navigate("/ingredients")}>
          Ingredients
        </button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 py-4 md:space-y-0 md:space-x-4">
        {currentUser ? (
          <>
            <div className="text-white py-2">
              {currentUser.idToken.payload.email.split("@")[0]}
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded">
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
