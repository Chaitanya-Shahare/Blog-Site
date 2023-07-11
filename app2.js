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
import Teststatic from "./Components/Teststatic";
import { Dashboard } from "./Components/Dashboard";
import Hiringdrill from "./Components/Hiringdrill";
import { Pagination } from "./Components/Pagination";
import { Sidebar1 } from "./Components/Sidebar1";
import { Homepage1 } from "./Components/Homepage1";
// function App() {
//   const [fileName, setFileName] = useState();
//   const [inactive, setInactive] = useState(false);

//   const options = {
//     bottom: '64px', // default: '32px'
//     right: 'unset', // default: '32px'
//     left: '32px', // default: 'unset'
//     time: '0.5s', // default: '0.3s'
//     mixColor: '#fff', // default: '#fff'
//     backgroundColor: '#fff',  // default: '#fff'
//     buttonColorDark: '#100f2c',  // default: '#100f2c'
//     buttonColorLight: '#fff', // default: '#fff'
//     saveInCookies: true, // default: true,
//     label: '🌓', // default: ''
//     autoMatchOsTheme: true // default: true
//   }

//   const darkmode = new Darkmode(options);
//   darkmode.showWidget();

//   const sidebarRoutes = ['/test', '/hiring', '/dynamicgraph'];

//   const showSidebar = sidebarRoutes.includes(window.location.pathname);

//   const handleSidebarCollapse = (inactive) => {
//     console.log(inactive);
//     setInactive(inactive);
//   };

//   return (
//     <div className="App">
//     <BrowserRouter>

//       <Routes>
//       {/* <Route path='/' element={<LandingPage/>}/> */}
//         <Route path='side' element={<Sidebar1/>}/>
//         <Route path='/h' element={<Homepage1/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/signup' element={<SignUp/>}/>
//         <Route path='/home' element={<Home fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/dyna' element={<DynamicData fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/create' element={<AddUser fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/update' element={<UpdateUser fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/*' element={<Navigate to="/"/>}/>
//         <Route path='/staticgraph' element={<Static fileName={fileName} setFileName={setFileName}/>} />
//         <Route path='/test' element={<Teststatic fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/hiring' element={<Hiringdrill fileName={fileName} setFileName={setFileName}/>}/>
//         <Route path='/dash' element={<Dashboard/>}/>
//         <Route path='/dynamicgraph' element={<Dynamic fileName={fileName} setFileName={setFileName}/>} />
//         <Route path='/changepassword' element={<ChangePassword/>}/>
//         <Route path='/forgotpassword' element={<ForgotPassword/>}/>
//         <Route path='/page' element={<Pagination/>}/>
//       </Routes>
//     </BrowserRouter>

//     {/* <BrowserRouter>
//     <Sidebar1
//           onCollapse={(inactive) => {
//             console.log(inactive);
//             setInactive(inactive);
//           }}
//         />
//     <div className="main-content">
//     <div className={`container ${inactive ? "inactive" : ""}`}>
//     <Routes>
//       <Route path='/' element={<Teststatic/>}/>
//       <Route path='/content' element={<Pagination/>}/>
//     </Routes>
//     </div>
//     </div>

//     </BrowserRouter> */}

//       {showSidebar && (
//         <BrowserRouter>
//           <Sidebar1 onCollapse={handleSidebarCollapse} />
//           alert('sidebar');
//           <div className="main-content">
//             <div className={`container ${inactive ? "inactive" : ""}`}>
//               <Routes>
//                 <Route path='/' element={<Teststatic/>}/>
//                 <Route path='/content' element={<Pagination/>}/>
//               </Routes>
//             </div>
//           </div>
//         </BrowserRouter>
//       )}
//     </div>
//   );
// }
// export default App;

// function App() {
//   const [fileName, setFileName] = useState();
//   const [inactive, setInactive] = useState(false);

//   const sidebarComponents = [
//     { path: '/test', component: <Teststatic fileName={fileName} setFileName={setFileName} /> },
//     { path: '/hiring', component: <Hiringdrill fileName={fileName} setFileName={setFileName} /> },
//   ];

//   const showSidebar = sidebarComponents.some(
//     (component) => component.path === window.location.pathname
//   );

//   const handleSidebarCollapse = (inactive) => {
//     console.log(inactive);
//     setInactive(inactive);
//   };

//   return (
//     <div className="App">
//       <BrowserRouter>
//         {showSidebar && (
//           <Sidebar1 onCollapse={handleSidebarCollapse} />
//         )}
//         <div className={`main-content ${showSidebar && !inactive ? "shifted" : ""}`}>
//           <div className="container">
//             <Routes>
//               {sidebarComponents.map((component) => (
//                 <Route key={component.path} path={component.path} element={component.component} />
//               ))}
//               <Route path='/content' element={<Pagination />} />
//               {/* Add routes for other components without the sidebar */}
//               <Route path='/' element={<Homepage1 />} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/signup' element={<SignUp />} />
//               <Route path='/dash' element={<Dashboard />} />
//               {/* Add more routes for components without the sidebar */}
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Sidebar1 from './Sidebar1';
// import Teststatic from './Teststatic';
// import Hiringdrill from './Hiringdrill';
// import Pagination from './Pagination';
// import Homepage1 from './Homepage1';
// import Dashboard from './Dashboard';

function App() {
  const [fileName, setFileName] = useState("");
  const [inactive, setInactive] = useState(false);

  const handleSidebarCollapse = (inactive) => {
    setInactive(inactive);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={<SidebarWrapper onCollapse={handleSidebarCollapse} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function SidebarWrapper({ onCollapse }) {
  const [expanded, setExpanded] = useState(true);

  const handleSidebarCollapse = (inactive) => {
    setExpanded(!inactive);
    onCollapse(inactive);
  };

  return (
    <>
      <Sidebar1 onCollapse={handleSidebarCollapse} />
      <div className={`container ${expanded ? "" : "inactive"}`}>
        <div className="container">
          <Routes>
            <Route path="/test" element={<Teststatic />} />
            <Route path="/hiring" element={<Hiringdrill />} />
            <Route path="/content" element={<Pagination />} />
            <Route path="/" element={<Homepage1 />} />
            <Route path="/dash" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
