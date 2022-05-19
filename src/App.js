import axios from "axios";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav";
import Search from "./components/Search";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const renderTopNav = () => <TopNav />;
  const renderSidNav = () => <SideNav />;
  const renderRoutes = () => (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Navigate replace to="/search" />} />
    </Routes>
  );
  const renderBottomNav = () => <BottomNav />;

  return (
    <div>
      {renderTopNav()}
      {renderSidNav()}
      {renderRoutes()}
      {renderBottomNav()}
    </div>
  );
};

export default App;
