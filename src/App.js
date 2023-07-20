import Login from "./components/Login"
import './App.css';
import ShowLogin from "./components/ShowLogin";
import AdminLogin from "./components/AdminLogin";
import DashBoard from "./components/DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
      <Route element={<Login />} path={"/login"} />
      <Route element={<AdminLogin />} path={"/adminlogin"} />
      {/* <Route element={<ShowLogin />} path={"/showlogin"} /> */}
      <Route element={<DashBoard />} path={"/dashboard/*"} />

      </Routes>
    </Router>
  
  );
}

export default App;
