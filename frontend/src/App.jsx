/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProvider from "./context/UserContext";
import PageLoginRegister from "./pages/PageLoginRegister";
import PageEditOneProject from "./pages/PageEditOneProject";

import Project from "./components/projects/Project";
import PageNav from "./pages/PageNav";

import "./App.css";
import PageAdminProject from "./pages/PageAdminProject";
import PageEditProject from "./pages/PageEditProject";

function App() {
  const [homeAnimation, setHomeAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHomeAnimation(true);
    }, 500);
  }, []);
  return (
    <div className="App">
      <UserProvider>
        <PageNav homeAnimation={homeAnimation} />
        <Routes>
          <Route path="/" element={<PageLoginRegister />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/project/admin" element={<PageAdminProject />} />
          <Route path="/projects/edit" element={<PageEditProject />} />
          <Route path="/project/edit" element={<PageEditOneProject />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
