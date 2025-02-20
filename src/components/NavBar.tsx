import React, { useState, useEffect } from "react";
import { divider, logo } from "../../public/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import { BiChevronUp } from "react-icons/bi";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { logOut } from "../features/login/loginSlice";
import { getUser, logoutUser } from "../actions/userActions";

const NavBar = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { pathname } = location;
  /* */

  // const currentPathname = window.location.pathname;

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("night");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toggleTheme = () => {
    setTheme(theme === "night" ? "coffee" : "night");
  };

  useEffect(() => {
    dispatch(getUser());
    if (document) {
      if (document) {
        document.querySelector("html")!.setAttribute("data-theme", theme);
      }
    }
  }, [theme]);

  const handleClickAway = () => {
    setMenuOpen(false);
  };

  console.log("USER  ==> ", user);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(logOut());

    await dispatch(getUser());
    navigate("/");
  };

  const closeMenu = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
  };

  // const renderSearch = pathname === "/home" && <Search />;
  console.log("PATH", pathname);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <nav className="w-full fixed z-50 top-0  border-gray-200 mb-20">
        <div className="max-w-screen-xl flex flex-wrap items-center overflow-z-0 justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="absolute h-16 w-16 mr-3"
              alt="Artbid Connect"
            />
            <span className="self-center md:ml-28 xs:ml-20 md:text-2xl xs:text-1xl xs:text-sm  font-semibold whitespace-nowrap text-white">
              Artbid connect
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 xs:ml-1 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <BiChevronUp className="w-6 h-6" />
            ) : (
              <RiMenuLine className="w-6 h-6" />
            )}
          </button>

          <div
            className={`w-full overflow-hidden  md:block md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium  flex items-center flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-greenish md:dark:bg-greenish border-gray-700">
              {/* <li>{renderSearch}</li> */}
              <li onClick={closeMenu}>
                <Link
                  to="/home"
                  className="block py-2 pl-3 pr-4 text-white rounded  sm:hover:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li onClick={closeMenu}>
                <Link
                  to="/about"
                  className="block py-2 pl-3 pr-4 text-white rounded  sm:hover:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  About
                </Link>
              </li>

              {/* Admin */}
              {/* <li onClick={closeMenu}>
                <Link
                  to="/admin"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700  sm:hover:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Admin
                </Link>
              </li> */}

              {/* Contacts */}
              {/* <li onClick={closeMenu}>
                <Link
                  to="/contacts"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700  sm:hover:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contacts
                </Link>
              </li> */}

              <li className="py-2 pl-3 pr-4  font-normal hover:text-blue-500  text-white mr-10  text-[16px]">
                <div>
                  <img className="divider" src={divider} />
                </div>
              </li>

              {Object.keys(user).length === 0 && (
                <li onClick={closeMenu}>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700  sm:hover:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              )}

              {Object.keys(user).length === 0 && (
                <li onClick={closeMenu}>
                  <Link
                    to="/Register"
                    className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700  sm:hover:text-blue-700 md:hover:text-blue-700 md:p-0 dark:text-white-mode md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              )}

              <li>
                <label className="flex cursor-pointer gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    onChange={toggleTheme}
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>

              {Object.keys(user).length > 0.0 && (
                <li>
                  <Link to="/profile">
                    <Avatar />
                  </Link>
                </li>
              )}

              {Object.keys(user).length > 0 && (
                <Link to="">
                  <div
                    className="badge badge-accent badge-outline pointer"
                    onClick={handleLogout}
                  >
                    logout
                  </div>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </ClickAwayListener>
  );
};

export default NavBar;
