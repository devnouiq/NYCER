import { X } from "lucide-react";
import useSignUpForm from "../hooks/useSignUpForm";

export const SignUp = (props: { closeModal: (val: boolean) => void }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    confirmSignUp,
    errorMessage,
    onSubmitHandler,
    confirmationHandler,
  } = useSignUpForm(props.closeModal);
  return (
    <div>
      {!confirmSignUp && (
        <div className="drop-shadow-xl h-96">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <button
              className="ml-[90%] sm:ml-[30%] md:ml-[30%] text-white"
              onClick={() => props.closeModal(false)}>
              <X />
            </button>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#bf8678] dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="w-40 rounded-lg ml-28">
                  <img src="NYCERIconOnly-01.png" alt="logo" />
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an Account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={onSubmitHandler}>
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
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-black font-semibold text-center">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full text-white bg-[#AF7153] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Create Account
                  </button>
                  <p className="text-sm font-light text-white">
                    Already have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign in
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmSignUp && (
        <div className="drop-shadow-xl h-96">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#bf8678] dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={confirmationHandler}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="XXXX"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-[#AF7153] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
