import React, { useEffect, useState } from "react";
import "../../pages/PageAdminProject.css";
import "../register/Register.css";

import useApi from "../../services/useApi";
import Success from "../success/Success";
import { useUser } from "../../context/UserContext";

function PageAdminProject() {
  const api = useApi();
  const { projectData } = useUser();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");
  const [reload, setReload] = useState(0);
  const [projectInfos, setProjectInfos] = useState([]);
  const successAddProject = "successEditProject";

  useEffect(() => {
    api.get(`/project/${projectData.id}`).then((res) => {
      setProjectInfos(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
      setTheme(res.data.theme);
      setType(res.data.typeId);
    });
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentValues = {
      name: projectInfos.name,
      theme: projectInfos.theme,
      typeId: projectInfos.typeId,
      description: projectInfos.description,
    };

    const updatedValues = {
      name,
      theme,
      description,
      typeId: type,
    };
    const updatedData = {};
    Object.keys(updatedValues).forEach((key) => {
      if (updatedValues[key] !== currentValues[key]) {
        updatedData[key] = updatedValues[key];
      }
    });

    if (Object.keys(updatedData).length !== 0) {
      api
        .put(`/project/${projectData.id}`, updatedData)
        .then(() => {
          setSuccess(successAddProject);
          setReload(reload + 1);

          setTimeout(() => {
            setReload(0);
          }, 2000);
        })

        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      {reload ? (
        <Success success={success} />
      ) : (
        <div className="page-admin-project_container">
          <h1 className="page-admin-project_h1">Edition project :</h1>

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
