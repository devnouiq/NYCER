import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);
import { SearchField } from "./components/Search";
import { NavBar } from "./components/NavBar";
// import "./App.css";
// // import SignIn from './components/SignIn';
// // { signOut, user }: WithAuthenticatorProps
// function App() {
//   return (
//     <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
//       {/* <NavBar signOut={signOut}/>
//       {/* <button onClick={signOut}>Sign out</button> */}
//       {/* <div className="flex items-center justify-center min-h-[90vh] w-full">
//         <SearchField />
//       </div> */}
//     </div>
//   );
// }

// export default withAuthenticator(App);

import {
  Authenticator,
  Button,
  Heading,
  Image,
  Text,
  useAuthenticator,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { useState } from "react";

import { Components } from "./components/SignIn";

export default function App() {
  const [showAuthentication, setShowAuthentication] = useState(false);
  const [user,setUser]=useState();

  const onLoginHandler = (flag: boolean) => {
    setShowAuthentication(flag);
  };
  return (
    <>
      {!showAuthentication && !user && (
        <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
          <NavBar onLogin={onLoginHandler} user={user}/>
          <div className="flex items-center justify-center min-h-[90vh] w-full">
            <SearchField />
          </div>
        </div>
      )}
      {showAuthentication && (
        <>
          {/* <button onClick={() => setShowAuthentication(!showAuthentication)}>
            Close dialog
          </button> */}
          <Authenticator components={Components}>
            {({ signOut, user }: WithAuthenticatorProps) => {
              setUser(user);
              return (
                <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
                  <NavBar onLogin={signOut} user={user}/>
                  {/* <button onClick={signOut}>Sign out</button> */}
                  <div className="flex items-center justify-center min-h-[90vh] w-full">
                    <SearchField />
                  </div>
                </div>
              );
            }}
          </Authenticator>{" "}
        </>
      )}
    </>
  );
}
