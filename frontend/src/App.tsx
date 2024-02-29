import { SearchField } from "./components/Search";
import { NavBar } from "./components/NavBar";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import {Amplify} from "aws-amplify";
import '@aws-amplify/ui-react/styles.css';

const user_pool_id=import.meta.env.VITE_USER_POOL_ID
const USERPOOLCLIENTID=import.meta.env.VITE_WEB_CLIENT_ID
const DOMAIN=import.meta.env.VITE_DOMAIN

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
      signUpVerificationMethod: 'code', // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: DOMAIN,
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    }
  },
});

const currentConfig = Amplify.getConfig();

function App() {
  return (
    <Authenticator>
      <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
        <NavBar />
        <div className="flex items-center justify-center min-h-[90vh] w-full">
          <SearchField />
        </div>
      </div>
    </Authenticator>
  );
}

export default App;
