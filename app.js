import logo from "./logo.svg";
import "./App.css";
import { Home } from "./datacontrol_components/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { DynamicData } from "./datacontrol_components/DynamicData";
import { useState } from "react";
import { AddUser } from "./datacontrol_components/AddUser";
import { UpdateUser } from "./datacontrol_components/UpdateUser";
import Darkmode from "darkmode-js";
import { LandingPage } from "./datacontrol_components/LandingPage";
import { SignUp } from "./datacontrol_components/SignUp";
import { Login } from "./datacontrol_components/Login";
import Static from "./Components/Static";
import Dynamic from "./Components/Dynamic";
import ForgotPassword from "./datacontrol_components/ForgotPassword";
import ChangePassword from "./datacontrol_components/ChangePassword";
import Sidebar from "./datacontrol_components/Sidebar";
import { Navbar } from "./Components/Navbar";
import { Dashboard } from "./Components/Dashboard";
function App() {
  const [fileName, setFileName] = useState();

  const options = {
    bottom: "750px", // default: '32px'
    // right: "200px",
    // default: '32px'
    right: "150px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: false, // default: true,
    label: "🌓", // default: ''
    autoMatchOsTheme: false, // default: true
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar/> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={<Home fileName={fileName} setFileName={setFileName} />}
          />
          <Route
            path="/dyna"
            element={
              <DynamicData fileName={fileName} setFileName={setFileName} />
            }
          />
          <Route
            path="/create"
            element={<AddUser fileName={fileName} setFileName={setFileName} />}
          />
          <Route
            path="/update"
            element={
              <UpdateUser fileName={fileName} setFileName={setFileName} />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route
            path="/staticgraph"
            element={<Static fileName={fileName} setFileName={setFileName} />}
          />
          <Route
            path="/dynamicgraph"
            element={<Dynamic fileName={fileName} setFileName={setFileName} />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
