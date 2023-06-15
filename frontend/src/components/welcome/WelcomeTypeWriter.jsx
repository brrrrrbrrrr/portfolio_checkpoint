/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import "./WelcomeTypeWriter.css";
import Typewriter from "typewriter-effect";
import { useUser } from "../../context/UserContext";

function WelcomeTypeWriter() {
  const { userLog, visitUserData } = useUser();

  return (
    <div className="intro-container">
      <div className="intro">
        {userLog && (
          <Typewriter
            options={{
              delay: 100,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  `Bonjour, je suis ${userLog.firstname}, bienvenue sur mon portfolio.`
                )

                .callFunction(() => {})
                .pauseFor(2500)

                .callFunction(() => {})
                .start();
            }}
          />
        )}
        {visitUserData && (
          <Typewriter
            options={{
              delay: 100,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  `Bonjour, je suis ${visitUserData.firstname}, bienvenue sur mon portfolio.`
                )

                .callFunction(() => {})
                .pauseFor(2500)

                .callFunction(() => {})
                .start();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default WelcomeTypeWriter;
