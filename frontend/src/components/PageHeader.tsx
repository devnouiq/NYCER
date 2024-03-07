import { useContext, useEffect, useState } from "react";
import logo from "../assets/NYCERIconOnly-01.png";
import { AccountContext } from "./Account";
// import { CognitoUserSession } from "amazon-cognito-identity-js";

export const PageHeader = ({signInoverlay,signUpoverlay, setSignInoverlay, setSignUpoverlay }: any) => {
  const handleSignIn = () => {
    console.log("SignIn");
    setSignInoverlay(true);
  };

  const handleSignUp = () => {
    console.log("Signup");
    setSignUpoverlay(true);
  };
  const { getSession, logout } = useContext(AccountContext);
  const [currentUser,setCurrentUser]=useState<any>()
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session: ", session);
        setCurrentUser(session);
      })
      .catch((err) => {
        console.error(err);
        
        console.log("Please Login !");
      });
  }, [signInoverlay,signUpoverlay]);
  // let currentUser
  // console.log(currentUser);
  // if(currentUser) console.log(currentUser.idToken.payload.email);
  
  
  // currentUser??console.log(currentUser.idToken.payload.email);
  

  return (
    <nav className="bg-transparent p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={logo} alt="Logo" className="h-20 w-full md:mr-2" />
      </div>

      <div className="flex flex-col md:flex-row space-y-4 my-2 md:space-y-0 md:space-x-4">
        <button className="text-white">Products</button>
        <button className="text-white">Ingredients</button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {currentUser && (
          <>
            <div className="text-white absolute right-36 z-10">{currentUser.idToken.payload.email}</div>
            <button
              onClick={() => {
                logout();
                
              }}
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
            >
              Sign out
            </button>
          </>
        )}
        {!currentUser && (
          <>
            <button
              onClick={handleSignIn}
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
            >
              Log In
            </button>
            <button
              onClick={handleSignUp}
              className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
