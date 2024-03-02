import logo from "../assets/NYCERIconOnly-01.png";

export const PageHeader = () => {
  const handleSignIn = () => {
    console.log("SignIn");
    signInoverlay(true)
  };

  const handleSignUp = () => {
    console.log("Signup");
    signUpoverlay(true)
  };

  return (
    <nav className="bg-transparent p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={logo} alt="Logo" className="h-10 w-full md:mr-2" />
      </div>

      <div className="flex flex-col md:flex-row space-y-4 my-2 md:space-y-0 md:space-x-4">
        <button className="text-white">Products</button>
        <button className="text-white">Ingredients</button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* <button
          onClick={signOut}
          className="bg-[#AF7153] text-white font-bold px-4 py-2 rounded">
          Sign out
        </button> */}
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
