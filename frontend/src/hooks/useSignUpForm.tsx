import { FormEvent, useState } from "react";
import UserPool from "./UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";

const useSignUpForm = (closeModal: (val: boolean) => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [confirmSignUp, setConfirmSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!/\d/.test(password)) {
      setErrorMessage("Password must contain at least 1 number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("Password must contain at least 1 special character.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least 1 uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must contain at least 1 lowercase letter.");
      return;
    }
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.log(err);
      } else console.log(data);
    });
    setConfirmSignUp(true);
  };

  const confirmationHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    user.confirmRegistration(code, true, (err, data) => {
      if (data) {
        closeModal(false);
      }
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  return {
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
  };
};

export default useSignUpForm;
