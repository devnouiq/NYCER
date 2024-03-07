import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session: ", session);
        setStatus(true);
      })
      .catch((err) => {
        console.error(err);

        console.log("Please Login !");
      });
  }, []);
  return (
    <div>
      {status ? (
        <button
          onClick={() => {
            setStatus(false);
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        "Please login"
      )}
    </div>
  );
};

export default Status;
