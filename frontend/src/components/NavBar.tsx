import React from "react";

export const NavBar = () => {
  return (
    <nav className="bg-transparent p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-white text-lg font-semibold">Your Logo</span>
      </div>

      <div className="flex space-x-4">
        <button className="text-white">Products</button>
        <button className="text-white">Ingredients</button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSignIn}
          className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded">
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
};
