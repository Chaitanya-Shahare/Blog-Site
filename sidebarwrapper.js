import React from 'react';
import { Sidebar1 } from './Sidebar1';


const SidebarWrapper = ({ children }) => {
  return (
    <div className="App">
      <Sidebar1 />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
