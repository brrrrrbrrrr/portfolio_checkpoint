import React, { useRef, useState } from "react";
import useApi from "../../services/useApi";
import { useUser } from "../../context/UserContext";
import "./Login.css";

function Login() {
  const api = useApi();
  const refMail = useRef();
  const refPass = useRef();
  const [succes, setSucces] = useState(null);
  // const [loginUser, setLoginUser] = useState(null);
  const [msgErr, setMsgErr] = useState("");
  const { setUserLog } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = refMail.current.value;
    const password = refPass.current.value;
    const userLogin = {
      mail,
      password,
    };
    api
      .post("/user/login", userLogin)
      .then((res) => {
        const { token, user } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        const userObject = user;
        setUserLog(userObject);
        setSucces(true);
      })
      .catch((err) => {
        // Je traite et renvoi les erreurs
        let errorMsg = "";
        switch (err.response.status) {
          case 401:
            errorMsg = "Vous n'êtes pas autorisé à vous connecter";
            break;

          case 422:
            errorMsg = "Erreur dans les données fournies";
            break;
          default:
            errorMsg = "Erreur serveur";
        }
        setMsgErr(errorMsg);
      });
  };
  return (
    <div>
      {succes ? (
        <p className="connexion-done">Vous êtes connecté</p>
      ) : (
        <div className="form-login_container">
          <form onSubmit={handleSubmit} className="form-login">
            <label htmlFor="login" className="login-label">
              Adresse e-mail
              <input type="text" className="input-login-form" ref={refMail} />
            </label>
            <label htmlFor="password" className="login-label">
              Mot de passe
              <input
                type="password"
                className="input-login-form"
                ref={refPass}
              />
            </label>

            <div className="connexion-btn-container">
              <button className="connexion-btn" type="submit">
                Valider
              </button>
              <p>{msgErr}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
