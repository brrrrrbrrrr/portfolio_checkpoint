import React, { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

function Home() {
  const [connection, setConnection] = useState(false);
  const [register, setRegister] = useState(false);

  const handleConnection = () => {
    setConnection(true);
    setRegister(false);
  };

  const handleRegister = () => {
    setRegister(true);
    setConnection(false);
  };

  return (
    <div className="page-login-register_container">
      <div className="page-login-register_button-container">
        <button type="button" onClick={handleConnection}>
          Connexion
        </button>
        <button type="button" onClick={handleRegister}>
          Inscription
        </button>
      </div>
      <div className="page-login-register_content-container">
        {connection && <Login />}
        {register && <Register />}
      </div>
    </div>
  );
}

export default Home;
