import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);
import { SearchField } from "./components/Search";
import { NavBar } from "./components/NavBar";
import "./App.css";
// import SignIn from './components/SignIn';

function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
      <NavBar signOut={signOut}/>
      {/* <button onClick={signOut}>Sign out</button> */}
      <div className="flex items-center justify-center min-h-[90vh] w-full">
        <SearchField />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
