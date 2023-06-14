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
}

Success.propTypes = {
  success: PropTypes.string,
};

Success.defaultProps = {
  success: null,
};

export default Success;
