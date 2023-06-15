import React, { useState } from "react";
import "./PageAdminProject.css";
import "../components/register/Register.css";

import useApi from "../services/useApi";
import Success from "../components/success/Success";

function PageAdminProject() {
  const api = useApi();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");
  const successAddProject = "successAddProject";

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      theme,
      typeId: type,
      description,
    };

    api
      .post("/project", values)
      .then(() => {
        setSuccess(successAddProject);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {success ? (
        <Success success={success} />
      ) : (
        <div className="page-admin-project_container">
          <h1 className="page-admin-project_h1">Nouveau projet :</h1>

          <form className="form-signup" onSubmit={handleSubmit}>
            <label className="form-label">
              Nom :
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-label">
              Thème
              <input
                type="text"
                className="form-input"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </label>

            <label className="form-label">
              Type :
              <input
                type="text"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>
            <label className="form-label_data">
              Description de ton projet :
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input_textearea"
                maxLength={2000}
                style={{ resize: "none" }}
              />
            </label>
            <button type="submit" className="form-btn">
              Valider
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PageAdminProject;
