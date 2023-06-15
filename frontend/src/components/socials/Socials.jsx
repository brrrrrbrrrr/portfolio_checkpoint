import React, { useEffect } from "react";
import "./Socials.css";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/useApi";

function Socials() {
  const api = useApi();
  const { userLog, userData, setUserData, visitUserData } = useUser();
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
    <div className="socials-container">
      <div className="social-column">
        <div className="email-container">
          <p className="email-content">{userData.mail}</p>
        </div>
      </div>
    </div>
  );
}

export default Socials;
