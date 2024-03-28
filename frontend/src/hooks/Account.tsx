import { createContext, useState } from "react";
import UserPool from "./UserPool";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

interface AccountContextType {
  authenticate: (email: string, password: string) => Promise<unknown>;
  getSession: () => Promise<void>;
  logout: () => void;
  currentUser: CognitoUserSession | null | undefined;
}

const AccountContext = createContext<AccountContextType>({
  authenticate: async () => {},
  getSession: async () => {},
  logout: () => {},
  currentUser: undefined,
});

const Account = (props: any) => {
  const [currentUser, setCurrentUser] = useState<CognitoUserSession | null>();
  const getSession = async (): Promise<void> => {
    return await new Promise<void>((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err: Error, session: any) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };
  const authenticate = async (email: string, password: string) => {
    return await new Promise((resolve, reject) => {
      const User = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      User.authenticateUser(authDetails, {
        onSuccess: (data) => {
          setCurrentUser(data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      location.reload();
    }
  };
  return (
    <AccountContext.Provider
      value={{ authenticate, getSession, logout, currentUser }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
