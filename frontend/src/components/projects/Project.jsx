/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import "./Project.css";
import { AiFillFileAdd } from "react-icons/Ai";
import { BiEdit } from "react-icons/Bi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swiper.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper";
import useApi from "../../services/useApi";

import ProjectInfos from "./ProjectInfos";

function Project() {
  const [showProject, setShowProject] = useState();
  const [projectsArray, setProjectsArray] = useState([]);
  const api = useApi();

  useEffect(() => {
    api
      .get("/project")
      .then((res) => {
        setProjectsArray(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setShowProject(projectsArray[0]);
  }, [projectsArray]);

  const handleSlideChange = (swiper) => {
    if (projectsArray) {
      const currentItem = projectsArray[swiper.realIndex];
      setShowProject(currentItem);
    }
  };

  return (
    <div className="project-full">
      <div className="project-composant-container">
        <Swiper
          zoom
          key=""
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          cssMode
          navigation
          mousewheel
          keyboard
          modules={[Navigation, Mousewheel, Keyboard]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          {projectsArray.map((item) => (
            <SwiperSlide key={item.id}>
              <h1 className="project-name">{item.name}</h1>
            </SwiperSlide>
          ))}
        </Swiper>

        <ProjectInfos showProject={showProject} />
        <Link to="/project/admin">
          <AiFillFileAdd size={25} className="add-project_icon" />
        </Link>
        <Link to="/projects/edit">
          <BiEdit size={25} className="edit-project_icon" />
        </Link>
      </div>
    </div>
  );
}

export default Project;
