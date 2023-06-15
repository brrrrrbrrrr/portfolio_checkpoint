import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/useApi";

function AboutEdit() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const api = useApi();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(userData.description);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentValues = {
      description: userData.description,
    };

    const updatedValues = {
      description,
    };
    const updatedData = {};
    Object.keys(updatedValues).forEach((key) => {
      if (updatedValues[key] !== currentValues[key]) {
        updatedData[key] = updatedValues[key];
      }
    });
    api
      .put("/user", updatedData)
      .then(() => {
        navigate("/about");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="form-label_data">
          Description de ton profil
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
  );
}

export default AboutEdit;
