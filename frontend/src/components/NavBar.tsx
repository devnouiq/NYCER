import React, { useState } from "react";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
// import Components from './SignIn'

export const NavBar = ({ onLogin, user }) => {
  console.log(user);

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
        {!user && (
          <button
            onClick={() => {
              onLogin(true);
            }}
            className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
          >
            Sign In
          </button>
        )}
        {user && (
          <>
            <h4 className="text-white">{user.signInDetails.loginId}</h4>
            <button
              onClick={onLogin}
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
