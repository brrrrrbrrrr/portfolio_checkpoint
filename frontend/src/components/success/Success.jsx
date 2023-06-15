import React from "react";
import PropTypes from "prop-types";
import "./Success.css";

function Success({ success }) {
  if (success === "successAccount")
    return (
      <div>
        <section className="registration-succes_msg">
          Merci, vous pouvez vous connecter
        </section>
      </div>
    );
  if (success === "successAddProject") {
    return (
      <div>
        <section className="registration-succes_msg">
          Projet créer avec succès !
        </section>
      </div>
    );
  }
  if (success === "successEditProject") {
    return (
      <div>
        <section className="registration-succes_msg">
          Projet edité avec succès !
        </section>
      </div>
    );
  }
}

Success.propTypes = {
  success: PropTypes.string,
};

Success.defaultProps = {
  success: null,
};

export default Success;
