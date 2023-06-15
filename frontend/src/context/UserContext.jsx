/* eslint-disable react/jsx-no-constructed-context-values */

import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
// Définir mon contexte utilisateur
const UserContext = createContext(null);

// Création du provider
function UserProvider({ children }) {
  const [userLog, setUserLog] = useState(null);
  const [projectData, setProjectData] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userLog,
        setUserLog,
        projectData,
        setProjectData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// Création de mon hook personnalisé
export const useUser = () => useContext(UserContext);
// Export du provider
export default UserProvider;
