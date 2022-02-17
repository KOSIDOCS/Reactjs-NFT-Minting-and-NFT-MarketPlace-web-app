import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';

import logo from "../../images/logo.png";

import { CustomBtn } from ".";

const NavBarItem = ({ title, classprops }) => {
  
  const navTitle = title.split(" ").join("");
  return (<li className={`mx-4 cursor-pointer ${classprops}`}>
    <Link to={`/${navTitle}`}>{title}</Link>
  </li>
);
}

const Navbar = ({ navLinks }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const mainLinks = navLinks ?? ["Marketplace", "Dashbord", "Community"];

  return (
    <nav className="w-full flex justify-around items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/"><img src={logo} alt="logo" className="w-32 cursor-pointer" /></Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[...mainLinks].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li>
         <CustomBtn title="Register" />
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
