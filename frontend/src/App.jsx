// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Div } from "atomize";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Div bg="gray100" minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Div>
  );
}

export default App;
