/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import useApi from "../../services/useApi";

function ProjectInfos({ showProject }) {
  const [type, setType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const api = useApi();

  useEffect(() => {
    api
      .get("/type")
      .then((res) => {
        setTypeOptions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    const foundType = typeOptions.find(
      (option) => option.id === showProject?.typeId
    );
    if (foundType) {
      setType(foundType.name);
    }
  }, [showProject, typeOptions]);

  return (
    <div className="project-container">
      <h2 className="title-theme">Thème : {showProject?.theme}</h2>
      <h2 className="title-theme">Type : {type}</h2>

      <div className="project-description">{showProject?.description}</div>
      <div className="footer-description">
        {showProject && showProject?.link === "progress" ? (
          <span className="in-progress">En cours</span>
        ) : (
          <a href={showProject?.link} target="blank">
            Visiter
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectInfos;
