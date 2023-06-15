/* eslint-disable react/jsx-no-constructed-context-values */

import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
// Définir mon contexte utilisateur
const UserContext = createContext(null);

// Création du provider
function UserProvider({ children }) {
  const [userLog, setUserLog] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [userData, setUserData] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userLog,
        setUserLog,
        projectData,
        setProjectData,
        refresh,
        setRefresh,
        userData,
        setUserData,
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
