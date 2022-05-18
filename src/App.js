import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav";
import Search from "./components/Search";
import TopNav from "./components/TopNav";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Navigate replace to="/search" />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

export default App;
