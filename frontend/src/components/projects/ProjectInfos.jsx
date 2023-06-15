/* eslint-disable react/prop-types */
import React from "react";

function ProjectInfos({ showProject }) {
  return (
    <div className="project-container">
      <h2 className="title-theme">Thème : {showProject?.theme}</h2>
      <div className="project-description">{showProject?.description}</div>
      <div className="footer-description">
        {showProject && showProject?.link === "progress" ? (
          <span className="in-progress">En cours</span>
        ) : (
          <a href={showProject?.link} target="blank">
            Visiter
          </a>
        )}
        {/* <h4 className="title-hardskill">
          {showProject?.hardSkillName.join(" ")}
        </h4> */}
      </div>
    </div>
  );
}

export default ProjectInfos;
