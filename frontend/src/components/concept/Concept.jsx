/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import "./Concept.css";
import { TiArrowRightThick } from "react-icons/Ti";

function Concept() {
  const [deleteModal, setDeleteModale] = useState(false);
  const handleClick = () => {
    setDeleteModale(true);
  };

  return (
    <div
      className={deleteModal ? "concept_container-hide" : "concept_container"}
    >
      <div className="concept_column">
        <p className="concept_content">
          Bienvenue sur notre générateur de portfolio ! Crée ton profil et
          ajoute tes projets en quelques étapes simples. Notre plateforme
          s'occupera de la mise en page pour toi, te permettant ainsi de te
          concentrer sur ton contenu. Lance-toi dès maintenant et donne vie à
          ton portfolio en un rien de temps !
        </p>
        <TiArrowRightThick
          size={25}
          onClick={handleClick}
          className="delete-modal_btn"
        />
      </div>
    </div>
  );
}

export default Concept;
