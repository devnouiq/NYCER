import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const SignIn = (props: { closeModal: (val: boolean) => void }) => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <button
        className="ml-[90%] sm:ml-[30%] md:ml-[34%] text-white"
        onClick={() => props.closeModal(false)}>
        <X />
      </button>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#bf8678] dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="w-40 rounded-lg ml-28">
            <img src="NYCERIconOnly-01.png" alt="logo" />
          </div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleSubmit(e, props.closeModal)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <ToastContainer />

            <button
              type="submit"
              className="w-full text-white bg-[#AF7153] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign in
            </button>
            <p className="text-sm font-light text-white">
              Don’t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
