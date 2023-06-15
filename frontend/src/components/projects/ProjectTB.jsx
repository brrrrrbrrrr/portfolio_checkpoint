/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import "./ProjectTB.css";
import { BiEdit } from "react-icons/Bi";
import { AiFillDelete } from "react-icons/Ai";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/useApi";

function ProjectTB({ project }) {
  const api = useApi();
  const { setRefresh, setProjectData } = useUser();
  const [deleted, setDeleted] = useState(false);

  const handleClick = () => {
    setProjectData(project);
  };

  const handleDelete = () => {
    setDeleted(!deleted);
  };

  const handleNo = () => {
    setDeleted(!deleted);
  };

  const handleYes = () => {
    api
      .delete(`/project/${project.id}`)
      .then(() => {
        setRefresh(true);
        console.log("supprimé");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="project-tb_container">
      <div className="project-tb_column">
        <h1>Nom :{project.name}</h1>
        <h2>Thème : {project.theme}</h2>
        <Link to="/project/edit">
          <BiEdit className="project-tb_icon" onClick={handleClick} />
        </Link>
        <AiFillDelete className="project-tb_delete" onClick={handleDelete} />
        {deleted && (
          <div className="modal-delete">
            Voulez vous vraiment supprimer ce projet ?
            <div className="modal-delete_btn">
              <button type="button" className="btn-delete" onClick={handleYes}>
                Oui
              </button>
              <button type="button" className="btn-delete" onClick={handleNo}>
                Non
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectTB;
