import React, { useEffect, useState } from "react";
import "./PageEditProject.css";
import useApi from "../services/useApi";
import ProjectTB from "../components/projects/ProjectTB";
import { useUser } from "../context/UserContext";

function PageEditProject() {
  const { refresh } = useUser();
  const api = useApi();
  const [projectData, setProjectData] = useState([]);
  useEffect(() => {
    api
      .get("/project")
      .then((res) => {
        setProjectData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <div className="page-edit-project_container">
      <div className="page-edit-project_column">
        <h1>Editer un projet </h1>
        <div className="page-edit-project_data">
          {projectData.map((item) => {
            return <ProjectTB key={item.id} project={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PageEditProject;
