import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../lib/hooks";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { fetchProjects } from "../actions/project-service";
import { Project } from "../types/Project";
import { RiExpandLeftLine } from "react-icons/ri";
import { LockIcon } from "./Icons";

interface SideBarProps {
  onProjectSelect?: (project: Project) => void;
  onSelectedVisibility: (visibility: string) => void;
}

const SideBar = ({ onSelectedVisibility }: SideBarProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  // const { projects } = useSelector((state: RootState) => state.projectList);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleNewEvent = () => {
    navigate("/add/event");
  };
  const handleUsers = () => {
    navigate("/users");
  };

  // const logoutUser = () => {
  //   dispatch({ type: "AUTH_RESET" });

  //   navigate("/login");
  // };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    setOpen(true);
  };

  const Menus = [
    {
      title: "Projects",
      icon: <FaProjectDiagram className="text-3xl" size={24} />,
      handleClick: handleNewEvent,
    },

    // {
    //   title: "Received Invites",
    //   icon: (
    //     <RiLoginBoxLine className="w-8 h-8 text-lightergray rounded-full hover:bg-gray-100 text-3xl" />
    //   ),
    //   handleClick: handleReceiveInvitations,
    // },
    // {
    //   title: "Sent Invitations",
    //   icon: (
    //     <RiMailSendFill className="w-8 h-8 text-lightergray rounded-full  text-3xl" />
    //   ),
    //   handleClick: handleSentInvitations,
    // },

    {
      title: "Collaborators",
      icon: (
        <FaUsers
          size={24}
          className="rounded-full hover:bg-gray-100 text-3xl"
        />
      ),
      handleClick: handleUsers,
    },
    // {
    //   title: "Notifications",
    //   icon: (
    //     <MdNotificationsActive
    //       size={24}
    //       className="text-3xl animate-ping text-sky-500"
    //     />
    //   ),
    //   handleClick: handleNotifications,
    // },

    // {
    //   title: "LogOut",
    //   icon: (
    //     <AiOutlineLogout className="w-8 h-8   text-red-500 rounded-full  hover:bg-gray-100 text-3xl" />
    //   ),
    //   handleClick: logoutUser,
    // },
  ];
  const handleSelectedType = (visibility: string) => {
    onSelectedVisibility(visibility);
  };

  const visibilities = [
    {
      type: "public",
      icon: <LockIcon className="w-4 h-4" />,
    },
    {
      type: "private",
      icon: <LockIcon className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`sticky z-50 flex flex-col top-0 ${open ? "w-44" : "w-16 "}
            h-full gap-y-3 fixed   justify-evenly duration-300 `}
      style={{ minHeight: "100vh" }}
    >
      <RiExpandLeftLine
        className={`absolute cursor-pointer -right-3 top-9 w-7 h-7
             border-1 rounded-full  text-primary  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div
        className={`flex gap-x-4 -mt-32 ${!open && "-mb-auto"} items-center`}
      >
        <MdDashboard className="cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400 text-2xl text-lightergray duration-500" />
        <h1
          className={`text-white  origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Artbid connect
        </h1>
      </div>
      <ul className="flex flex-col justify-between -mt-72 bg-base-200 ">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
              ${""} ${index === 0 && "bg-light-white"} `}
          >
            {Menu.title === "Projects" ? (
              <div onClick={toggleMenu} className="collapse hover:bg-gray-800 ">
                <input type="checkbox" className="peer" />
                <div className=" collapse-title primary-content    items-center  w-full p-1.5 rounded-md flex ">
                  {Menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    <p className={`text-white font-medium mx-2  text-sm`}>
                      {Menu.title}
                    </p>
                  </span>
                  <span className="">
                    {openMenu && open ? (
                      <BiChevronUp className="w-6 h-6 collapse" />
                    ) : open ? (
                      <BiChevronDown className="w-6 h-6 collapse" />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div
                  className={`collapse-content pt-2   peer-checked:bg-secondary 
                  
                  ${!open ? "hidden" : "visible"}
                  `}
                >
                  <ul
                    className={`flex flex-col justify-between  gap-y-4 w-full p-1.5 rounded-md bg-base-200 `}
                  >
                    {/* {projects.map((project, i) => (
                      <li
                        className="rounded-md  flex items-center text-primary  pt-1 bg-base-200 hover:bg-gray-800 "
                        key={i}
                        onClick={() => handleSelectProject(project)}
                      >
                        {" "}
                        {project.title}
                        <span className="badge badge-accent ml-2 text-xs">
                          {project.active ? "active" : ""}
                        </span>
                      </li>
                    ))} */}

                    {visibilities.map((visibility, i) => (
                      <li
                        className="rounded-md p-2  flex items-center  text-primary  pt-1 bg-base-200 hover:bg-gray-800 "
                        key={i}
                        onClick={() => handleSelectedType(visibility.type)}
                      >
                        <p className="flex items-center justify-around gap-x-10">
                          {visibility.type}
                          <span className="text-gray-500">
                            {visibility.icon}
                          </span>
                        </p>
                        {/* <span className="badge badge-accent ml-2 text-xs">
                          {project.active ? "active" : ""}
                        </span> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Render normal list item for other menu items
              <div
                className="hover:bg-gray-800   items-center  w-full p-1.5 rounded-md flex "
                onClick={Menu.handleClick}
              >
                {Menu.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  <h1 className="text-white font-medium ml-2 mr-2 text-sm">
                    {Menu.title}
                  </h1>
                </span>
                {/* <span>hello</span> */}
                {Menu.title === "Received Invites" ? (
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute object-cover inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>

    // <div className="drawer lg:drawer-open">
    //   <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content flex flex-col items-center justify-center">
    //     {/* Page content here */}

    //     <h1>geeeeyeydh</h1>
    //     <label
    //       htmlFor="my-drawer-2"
    //       className="btn btn-primary drawer-button lg:hidden"
    //     >
    //       Open drawer
    //     </label>
    //   </div>
    //   <div className="drawer-side">
    //     <label
    //       htmlFor="my-drawer-2"
    //       aria-label="close sidebar"
    //       className="drawer-overlay"
    //     ></label>
    //     <ul className="menu p-4  min-h-full bg-base-200 ">
    //       {/* Sidebar content here */}
    //       <li>
    //         <a>Sidebar Item 1</a>
    //       </li>
    //       <li>
    //         <a>Sidebar Item 2</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default SideBar;
