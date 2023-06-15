/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import "./ProjectTB.css";
import { BiEdit } from "react-icons/Bi";
import { AiFillDelete } from "react-icons/Ai";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function ProjectTB({ project }) {
  const { setProjectData } = useUser();

  const handleClick = () => {
    setProjectData(project);
  };

  return (
    <div className="project-tb_container">
      <div className="project-tb_column">
        <h1>Nom :{project.name}</h1>
        <h2>Thème : {project.theme}</h2>
        <Link to="/project/edit">
          <BiEdit className="project-tb_icon" onClick={handleClick} />
        </Link>
        <AiFillDelete className="project-tb_delete" />
      </div>
    </div>
  );
}

export default ProjectTB;
