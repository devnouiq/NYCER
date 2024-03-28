import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { toast } from "react-toastify";

interface AuthError extends Error {
  message: string;
}

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    closeModal: (val: boolean) => void
  ) => {
    event.preventDefault();
    try {
      await authenticate(email, password);
      closeModal(false);
    } catch (err) {
      console.error("Failed to login ! ", err);
      const authError = err as AuthError;
      toast.error(authError.message, { position: "top-center" });
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};
