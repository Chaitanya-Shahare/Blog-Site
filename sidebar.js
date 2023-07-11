// import React, { useEffect, useState } from 'react'
// import MenuItem from './MenuItem'
// import { Link } from "react-router-dom";


// export const menuItems = [
//     {
//       name: "Dashboard",
//       exact: true,
//       to: "/",
//       iconClassName: "bi bi-speedometer2",
//     },
//     // {
//     //   name: "Content",
//     //   exact: true,
//     //   to: `/content`,
//     //   iconClassName: "bi bi-speedometer2",
//     //   subMenus: [
//     //     { name: "Courses", to: "/content/courses" },
//     //     { name: "Videos", to: "/content/videos" },
//     //   ],
//     // },
//     { name: "Design", to: `/design`, iconClassName: "bi bi-vector-pen" },
//     // {
//     //   name: "Content 2",
//     //   exact: true,
//     //   to: `/content-2`,
//     //   iconClassName: "bi bi-speedometer2",
//     //   subMenus: [
//     //     { name: "Courses", to: "/content-2/courses" },
//     //     { name: "Videos", to: "/content-2/videos" },
//     //   ],
//     // },
//     { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen" },
//     { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen" },
//     { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
//   ];
// export const Sidebar1 = (props) => {
//     const [inactive, setInactive] = useState(false);

//     useEffect(() => {
//       props.onCollapse(inactive);

//     }, [inactive]);
//   return (
//     <>
//     <div className={`side-menu ${inactive ? "inactive" : ""}`}>
//         <div className='top-section'>
//             <div className='logo'>
//                 <img src='/webscript.png'/>
//             </div>
//             <div onClick={() => setInactive(!inactive)} className='toggle-menu-btn'>
//                 {inactive ? (
//                     <i class="bi bi-arrow-right-square-fill"></i>
//                 ): (
//                     <i class="bi bi-arrow-left-square-fill"></i>
//                 )}
//             </div>
//         </div>
//         <div className="divider"></div>

//       <div className="main-menu">
//         <ul>
//           {/* {menuItems.map((menuItem, index) => (
//             <MenuItem
//               key={index}
//               name={menuItem.name}
//             //   exact={menuItem.exact}
//               to={menuItem.to}
//             //   subMenus={menuItem.subMenus || []}
//               iconClassName={menuItem.iconClassName}
//               onClick={(e) => {
//                 if (inactive) {
//                   setInactive(false);
//                 }
//               }}
//             />
//           ))} */}

//           <li>
//             <a className="menu-item" href='/'>
//               <div className="menu-icon">
//                 <i class="bi bi-speedometer2"></i>
//               </div>
//               <span>Dashboard</span>
//             </a>
//           </li>
//           {/* <MenuItem
//             name={"Content"}
//             subMenus={[{ name: "Courses" }, { name: "Videos" }]}
//           /> */}
//           <li>
//             <a className="menu-item" href='/content'>
//               <div className="menu-icon">
//                 <i class="bi bi-vector-pen"></i>
//               </div>
//               <span>Design</span>
//             </a>
//           </li> 
//         </ul>
//       </div>

//       <div className="side-menu-footer">
//         <div className="avatar">
//           <img src='/user.jpg' alt="user" />
//         </div>
//         <div className="user-info">
//           <h5>Rizwan Khan</h5>
//           <p>rizwankhan@gmail.com</p>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }


import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/test",
    iconClassName: "bi bi-speedometer2",
  },
  { name: "Design", to: `/hiring`, iconClassName: "bi bi-vector-pen" },
  { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen" },
  { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen" },
  { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
];

export const Sidebar1 = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    props.onCollapse(inactive);
  }, [inactive]);

  return (
    <>
      <div className={`side-menu ${inactive ? "inactive" : ""}`}>
        <div className='top-section'>
          <div className='logo'>
            <img src='/webscript.png' />
          </div>
          <div onClick={() => setInactive(!inactive)} className='toggle-menu-btn'>
            {inactive ? (
              <i className="bi bi-arrow-right-square-fill"></i>
            ) : (
              <i className="bi bi-arrow-left-square-fill"></i>
            )}
          </div>
        </div>
        <div className="divider"></div>

        <div className="main-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link className="menu-item" to={item.to}>
                  <div className="menu-icon">
                    <i className={item.iconClassName}></i>
                  </div>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="side-menu-footer">
          <div className="avatar">
            <img src='/user.jpg' alt="user" />
          </div>
          <div className="user-info">
            <h5>Rizwan Khan</h5>
            <p>rizwankhan@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  )
}

