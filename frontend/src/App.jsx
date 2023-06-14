/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from "react-router-dom";
import UserProvider from "./context/UserContext";
import PageLoginRegister from "./pages/PageLoginRegister";

import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<PageLoginRegister />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
