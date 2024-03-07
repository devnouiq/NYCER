import { SearchField } from "./components/Search";
import { PageHeader } from "./components/PageHeader";
import htu from "./assets/how_to_use.png";
import abu from "./assets/about_us.png";
import { SloganPage } from "./components/SloganPage";
import { ToolDescription } from "./components/ToolDescription";
import { VIPPage } from "./components/VIPPage";
import { InfoCard, InfoCardProps } from "./components/InfoCard";
import "./App.css";
// import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Account } from "./components/Account";
// import Status from "./components/Status";

const user_pool_id = import.meta.env.VITE_USER_POOL_ID;
const USERPOOLCLIENTID = import.meta.env.VITE_WEB_CLIENT_ID;
const DOMAIN = import.meta.env.VITE_DOMAIN;

// mandatorySignIn: true,
//     region: "eu-north-1",
//     userPoolId: "eu-north-1_zbeIQOBe7",
//     userPoolWebClientId: "3sb6k6mmorp8r200f5m8tmhpdq",
Amplify.configure({
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: user_pool_id,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: USERPOOLCLIENTID,

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: "code", // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: DOMAIN,
          scopes: [
            "phone",
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: ["http://localhost:3000/"],
          redirectSignOut: ["http://localhost:3000/"],
          responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    },
  },
});

// const currentConfig = Amplify.getConfig();
import { PageFooter } from "./components/PageFooter";
// import { Product } from "./components/Product";
// import { signOut } from "@aws-amplify/auth";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useState } from "react";

function App() {
  const howtouseProps: InfoCardProps = {
    imageSrc: htu,
    title: "HOW TO USE",
    content: [
      "1.Use the search fields to find any ingredients, products, brands and you’ll be directed to the right tool",
      "2.Sign up for a free account to get newsletters, updates and skincare routine",
      "That’s it!",
    ],
    backgroundColor: "#AF7153",
  };

  const aboutusProps: InfoCardProps = {
    imageSrc: abu,
    title: "ABOUT US",
    subtitle: "KNOWLEDGE IS BEAUTY",
    content: [
      "NYCER Lifestyle advocates for the balance of aesthetic and wellness for your Self and your Space",
      "We believe in holistic development and are in constant pursuit of providing the best for our community be in the form of products, services or knowledge.",
      "NYCER Search Tool was born out of the demand that women all over the world are becoming more aware of the ingredients they want to consume or apply on their bodies. The platform serves to make this search for active ingredients, products comparison, routine builder and many more, to be at your fingertips.",
    ],
    backgroundColor: "#E1CEC3",
    textcolor: "black",
    tilecolor: "#fff",
    titlecolor: "#D1BAB5",
  };

  const [toggleSignInOverlay, setToggleSignInOverlay] = useState(false);
  const [toggleSignUpOverlay, setToggleSignUpOverlay] = useState(false);

  // const closeOvarlayHandler = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (event.target.id === "parent-container") {
  //     console.log("here");

  //     setToggleSignInOverlay(false);
  //     setToggleSignUpOverlay(false);
  //   }
  // };
  // onClick={closeOvarlayHandler}

  return (
    <Account>
      <div id="parent-container" >
        {/* <button>signOut</button> */}

        <div className="px-4 py-4 min-h-screen input_wrapper bg-[url('./assets/1.png')] bg-cover bg-center">
          <PageHeader
            signInoverlay={toggleSignInOverlay}
            signUpoverlay={toggleSignUpOverlay}
            setSignInoverlay={setToggleSignInOverlay}
            setSignUpoverlay={setToggleSignUpOverlay}
          />
          <div className="flex items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full mt-12 md:mt-20">
            <SearchField placeholder="*find active ingredients" setOpenModal={setToggleSignInOverlay} openModal={toggleSignInOverlay} />
          </div>
          {/* <div className="text-white text-4xl md:text-7xl font-bold text-center mt-4 md:mt-8">
            Skincare At A Deeper Level
          </div> */}
        </div>

        <SloganPage
          bg_color="#AF7153"
          line1="YOU DESERVE THE"
          line2="NYCER"
          line3="THINGS IN LIFE"
          line4="AND WE ARE HERE TO HELP YOU FIND THEM"
        />
        <ToolDescription />
        <InfoCard {...howtouseProps} />
        <InfoCard {...aboutusProps} />
        <SloganPage
          bg_color="#E1CEC3"
          line1="Live a NYCER life,"
          line3="Care for NYCER skin"
          line4="WE BELIEVE IN HELPING YOU ACHIEVE BETTER"
        />
        <VIPPage />
        <PageFooter />
      </div>

      {/* <Status /> */}
      {toggleSignInOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
          <SignIn closeModal={setToggleSignInOverlay} />
        </div>
      )}
      {toggleSignUpOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
          <div>
            <button onClick={() => setToggleSignUpOverlay(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f2eeee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <SignUp closeModal={setToggleSignUpOverlay} />
        </div>
      )}
    </Account>
    // <SignIn/>
  );
}

export default App;
// shx rm -rf dist/ &&
