import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Account } from "./hooks/Account";
import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/ProductsPage";
import { PageHeader } from "./components/PageHeader";
import { PageFooter } from "./components/PageFooter";
import { useState } from "react";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

const App = () => {
  const [toggleSignInOverlay, setToggleSignInOverlay] = useState(false);
  const [toggleSignUpOverlay, setToggleSignUpOverlay] = useState(false);

  return (
    <Router>
      <Account>
        <div>
          <PageHeader
            signInOverlay={toggleSignInOverlay}
            signUpOverlay={toggleSignUpOverlay}
            setSignInOverlay={setToggleSignInOverlay}
            setSignUpOverlay={setToggleSignUpOverlay}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
          <PageFooter />
          {toggleSignInOverlay && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
              <SignIn closeModal={setToggleSignInOverlay} />
            </div>
          )}
          {toggleSignUpOverlay && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 items-center z-50">
              <div>
                <button onClick={() => setToggleSignUpOverlay(false)}></button>
              </div>
              <SignUp closeModal={setToggleSignUpOverlay} />
            </div>
          )}
        </div>
      </Account>
    </Router>
  );
};

export default App;
