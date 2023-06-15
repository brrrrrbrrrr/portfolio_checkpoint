import React, { useState } from "react";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import "./PageLoginRegister.css";
import { useUser } from "../context/UserContext";
import useApi from "../services/useApi";
import User from "../components/user/User";
import Concept from "../components/concept/Concept";

function Home() {
  const api = useApi();
  const { userLog, setVisitData, visitData } = useUser();
  const [connection, setConnection] = useState(false);
  const [register, setRegister] = useState(false);
  const [visit, setVisit] = useState(false);

  const handleConnection = () => {
    setConnection(true);
    setRegister(false);
    setVisit(false);
  };

  const handleRegister = () => {
    setRegister(true);
    setConnection(false);
    setVisit(false);
  };

  const handleVisit = () => {
    setVisit(true);
    setConnection(false);
    setRegister(false);
    api
      .get("/user/visit")
      .then((res) => {
        setVisitData(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Concept />
      {!userLog ? (
        <div className="page-login-register_container">
          <div className="page-login-register_button-container">
            <button
              type="button"
              onClick={handleVisit}
              className={`"page-login-register_button" ${
                visit
                  ? "page-login-register_button-active"
                  : "page-login-register_button"
              }`}
            >
              Visite
            </button>
            <button
              type="button"
              onClick={handleConnection}
              className={`"page-login-register_button" ${
                connection
                  ? "page-login-register_button-active"
                  : "page-login-register_button"
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className={`"page-login-register_button" ${
                register
                  ? "page-login-register_button-active"
                  : "page-login-register_button"
              }`}
            >
              Inscription
            </button>
          </div>
          <div className="page-login-register_content-container">
            {connection && <Login />}
            {register && <Register />}
            {visit &&
              visitData.map((item) => {
                return <User key={item.id} user={item} />;
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
