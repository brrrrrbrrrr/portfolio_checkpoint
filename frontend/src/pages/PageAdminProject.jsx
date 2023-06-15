import React, { useEffect, useState } from "react";
import "./PageAdminProject.css";
import "../components/register/Register.css";

import useApi from "../services/useApi";
import Success from "../components/success/Success";

function PageAdminProject() {
  const api = useApi();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [devType, setDevType] = useState("");
  const [link, setLink] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [success, setSuccess] = useState("");
  const [techOptions, setTechOptions] = useState([]);
  const [tech, setTech] = useState([]);
  const successAddProject = "successAddProject";

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      theme,
      typeId: devType,
      description,
      link,
      techId: tech,
    };

    api
      .post("/project", values)
      .then(() => {
        setSuccess(successAddProject);
      })
      .catch((err) => console.error(err));
  };

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
    api
      .get("/tech")
      .then((res) => {
        setTechOptions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleTechChange = (e, techId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Ajouter l'ID de la technologie au tableau tech
      setTech((prevTech) => [...prevTech, techId]);
    } else {
      // Supprimer l'ID de la technologie du tableau tech
      setTech((prevTech) => prevTech.filter((id) => id !== techId));
    }
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
              <select
                value={devType}
                onChange={(e) => setDevType(e.target.value)}
                className="select-dev-type"
              >
                <option value="">Projet</option>
                {typeOptions.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="tech-checkbox_container">
              <div className="tech-checkbox_column">
                {techOptions.map((item) => (
                  <label key={item.id} className="tech-checkbox_label">
                    <input
                      type="checkbox"
                      value={item.id}
                      className="tech-checkbox_input"
                      checked={tech.includes(item.id)}
                      onChange={(e) => handleTechChange(e, item.id)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
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
            <label className="form-label">
              Lien
              <input
                type="text"
                className="form-input"
                value={link}
                onChange={(e) => setLink(e.target.value)}
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
