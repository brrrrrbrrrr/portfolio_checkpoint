/* eslint-disable react/prop-types */
import React from "react";
import "./User.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function User({ user }) {
  const { setUserVisitData } = useUser();

  const handleClick = () => {
    setUserVisitData(user);
  };

  return (
    <Link to="/home" onClick={handleClick}>
      <div className="user_container">
        <div className="user_column">
          <h1>{user.firstname}</h1>
          <h2>{user.name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default User;
