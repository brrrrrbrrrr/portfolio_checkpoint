/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import "./About.css";
import { BiEdit } from "react-icons/Bi";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import { useUser } from "../../context/UserContext";

function About() {
  const { userLog, userData, setUserData, visitUserData } = useUser();

  const api = useApi();
  if (userLog) {
    useEffect(() => {
      api
        .get("/user")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  } else setUserData(visitUserData);

  return (
    <div>
      <article className="description-about-container">
        <div className="description-column">
          <div className="texte-container">
            <p className="p-content p-content-1">{userData.description}</p>
            {userLog && (
              <Link to="/about/edit">
                <BiEdit size={25} className="project-tb_icon-edit" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default About;
