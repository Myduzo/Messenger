import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./Pages/Chat";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Box>
        <Navbar user={user} />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/Chat" element={<Chat />} />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/Chat" /> : <Login />}
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
