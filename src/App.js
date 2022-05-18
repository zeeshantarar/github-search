import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav";
import Search from "./components/Search";
import TopNav from "./components/TopNav";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const App = () => (
  <div className="App">
    <TopNav />
    <Routes>{/* <Route path="/" element={<Search />} /> */}</Routes>
    <BottomNav />
  </div>
);

export default App;
