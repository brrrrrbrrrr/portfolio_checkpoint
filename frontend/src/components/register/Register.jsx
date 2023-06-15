/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../services/useApi";
import Success from "../success/Success";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [devType, setDevType] = useState("");
  const [age, setAge] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const successAccount = "successAccount";

  const [picture, setPicture] = useState(null);
  // const [validePictureType, setValidPictureType] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();

  const PWD_REDEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

  const MAIL_REDEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  // function handlePictureSelect(event) {
  //   const filePicture = event.target.files[0];
  //   // Vérifie que le fichier est un jpeg ou jpg
  //   if (
  //     (filePicture && filePicture.type === "image/jpeg") ||
  //     filePicture.type === "image/jpg" ||
  //     filePicture.type === "image/png"
  //   ) {
  //     setPicture(filePicture);
  //     setValidPictureType(true);
  //   } else {
  //     setPicture(null);
  //     setValidPictureType(false);
  //   }
  // }

  useEffect(() => {
    api
      .get("/type")
      .then((res) => {
        setTypeOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const result = MAIL_REDEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    const result = PWD_REDEX.test(pass1);
    setValidPwd(result);
    const match = pass1 === pass2;
    setValidMatch(match);
  }, [pass1, pass2]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append("city", city);
    formData.append("age", age);
    formData.append("picture", picture);
    formData.append("mail", mail);
    formData.append("password", pass1);
    formData.append("description", description);
    formData.append("typeId", devType);

    api
      .post("/user", formData)

      .then((res) => {
        console.warn(res);
        setSuccess(successAccount);
      })
      .catch((err) => {
        toast.error("Une erreur s'est produite", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (err) {
          setError(err.response.data);
        }
      });
  };

  return (
    <div>
      {success ? (
        <Success success={success} />
      ) : (
        <div className="form-container">
          {" "}
          <form onSubmit={handleSubmit} className="form-signup">
            <label className="form-label">
              Nom :
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Prénom :
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Age :
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Ville :
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              <select
                value={devType}
                onChange={(e) => setDevType(e.target.value)}
                className="select-dev-type"
              >
                <option value="">Développeur</option>
                {typeOptions.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="form-label">
              Picture :
              <input
                type="text"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="form-input"
              />
            </label>
            {/* <label className="form-label">
          Photo :
          <input
            type="file"
            onChange={handlePictureSelect}
            className="form-input"
          />
          <span
            className={validePictureType ? "signup-hide" : "signup-invalid"}
          >
            Merci de choisir un fichier .JPEG/JPG/PNG
          </span>
        </label> */}
            <label className="form-label_data">
              Description de ton profil
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input_textearea"
                maxLength={2000}
                style={{ resize: "none" }}
              />
            </label>
            <label className="form-label">
              Email :
              <input
                type="text"
                autoComplete="off"
                id="mail"
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="form-input"
              />
            </label>
            <span
              className={validMail || !mail ? "signup-hide" : "signup-invalid"}
            >
              Email invalide
            </span>
            <label htmlFor="pass1" className="form-label">
              Mot de passe :
              <input
                type="password"
                id="pass1"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                className="form-input"
              />
              <span
                className={
                  validPwd || !pass1 ? "signup-hide" : "signup-invalid"
                }
              >
                Doit contenir 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère
                spécial, 8-24 caractères
              </span>
            </label>
            <label htmlFor="pass2" className="form-label">
              Confirmer le mot de passe :
              <input
                type="password"
                id="pass2"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                className="form-input"
              />
              <span
                className={
                  validMatch || !pass2 ? "signup-hide" : "signup-invalid"
                }
              >
                Les mots de passe ne correspondent pas
              </span>
            </label>
            <div className="connexion-btn-container">
              <button
                type="submit"
                disabled={
                  !validMail || !validPwd || !validMatch
                  // || !validePictureType
                }
                className="form-btn"
              >
                Valider
              </button>
            </div>
            <p className="form-signup_errorMsg">{error || ""}</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
