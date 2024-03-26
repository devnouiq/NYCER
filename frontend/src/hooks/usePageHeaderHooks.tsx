import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
import { PageHeaderProps } from "../types/PageHeaderTypes";

export const usePageHeaderHooks = ({
  signInOverlay,
  signUpOverlay,
  setSignInOverlay,
  setSignUpOverlay,
}: PageHeaderProps) => {
  const { getSession, logout } = useContext(AccountContext);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session: ", session);
        setCurrentUser(session);
      })
      .catch((err: Error) => {
        console.error(err);
        console.log("Please Login !");
      });
  }, [signInOverlay, signUpOverlay]);

  const handleSignIn = () => {
    console.log("SignIn");
    setSignInOverlay(true);
  };

  const handleSignUp = () => {
    console.log("Signup");
    setSignUpOverlay(true);
  };

  const handleLogout = () => {
    logout();
  };

  return { currentUser, handleSignIn, handleSignUp, handleLogout };
};
