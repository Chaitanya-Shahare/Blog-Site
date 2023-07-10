import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dash = () => {
  const menus = [
    // { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    // { name: "Cart", link: "/", icon: FiShoppingCart },
    // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    // { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  let defaultProfileImage =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
  const [open, setOpen] = useState(true);
  return (
    <section className="flex">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-0"
        } duration-500 text-gray-100`}
      >
        <div class={`mt-4 mb-5 px-8 ${!open && "scale-0"}`}>
          <h2 class="font-semibold text-xl">
            <span>Always</span>First{" "}
          </h2>
        </div>
        <div class="p-2 text-center">
          <img
            class={`rounded-full h-[150px] w-[150px] ${!open && "scale-0"}`}
            src={defaultProfileImage}
          />
        </div>
        <div
          className={`font-medium text-xl text-center ${!open && "scale-0"}`}
        >
          <p class="font-semibold text-lg">Prabha</p>
          <p>prabha@gmail.com</p>
        </div>
        <div
          className={`mt-4 flex flex-col gap-4 relative px-8 ${
            !open && "scale-0"
          }`}
        >
          <Link to="/login">Dashboard</Link>
          <Link to="/login">Data Management</Link>
          <Link to="/login">Theme</Link>
          <Link to="/login">Change Password</Link>
          <Link to="/login">Logout</Link>
        </div>
      </div>
      <div className="flex flex-col flex-grow text-xl text-gray-900 font-semibold overflow-x-hidden">
        <div className="flex justify-between shadow-xl">
          <div className="flex p-3 ml-6">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex p-3 mr-6">
            <p className="mr-4">Hi, Prabha</p>
            <img
              src={defaultProfileImage}
              className="h-[30px] w-[30px] rounded-full"
            />
          </div>
        </div>
        REACT TAILWIND
        {/* <div className=" bg-gray-500 p-4">
          <StaticData/>
        </div> */}
      </div>
    </section>
  );
};

export default Dash;
