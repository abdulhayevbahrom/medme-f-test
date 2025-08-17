import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { menuItems } from "../../utils/SidebarMenu";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const getInitialOpenMenus = () => {
    try {
      const stored = localStorage.getItem("openMenus");
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      return {};
    }
  };
  const [openMenus, setOpenMenus] = useState(getInitialOpenMenus);
  const [activeMenu, setActiveMenu] = useState(localStorage.getItem("activeMenu") || "");
  const [activeSubPath, setActiveSubPath] = useState(localStorage.getItem("activeSubPath") || "");

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) setActiveMenu(storedActiveMenu);

    const storedSubPath = localStorage.getItem("activeSubPath");
    if (storedSubPath) setActiveSubPath(storedSubPath);
  }, []);
  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  useEffect(() => {
    localStorage.setItem("activeSubPath", activeSubPath);
  }, [activeSubPath]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    setActiveMenu(label);
  };
  const BaxodirShifoLogo = ({
    width = 300,
    height = 120,
    color = '#fff',
    className = ''
  }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Medical Cross Background */}
        <rect
          x="20"
          y="20"
          width="25"
          height="10"
          fill={color}
          rx="2"
        />
        <rect
          x="27.5"
          y="12.5"
          width="10"
          height="25"
          fill={color}
          rx="2"
        />

        {/* Heartbeat Line - next to CLINIC */}
        <path
          d="M45 62 L55 62 L58 55 L62 68 L65 52 L68 72 L72 62 L97 62"

          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main Text - BAXODIR-SHIFO */}
        <text
          x="150"
          y="35"
          fill={color}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          BAXODIR-SHIFO
        </text>

        {/* Subtitle - CLINIC */}
        <text
          x="130"
          y="65"
          fill={color}
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          letterSpacing="2px"
        >
          CLINIC
        </text>

        <path
          d="M163 62 L195 62 L198 55 L202 68 L205 52 L208 72 L212 62 L222 62"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return (
    <aside>
      <div className="sidebar_logo">
        {/* Different sizes */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <BaxodirShifoLogo className="svgLogo" width={300} height={90} color="#fff" />
        </div>
        {/* <i>Avtomatlashtirish - kelajak bugun</i> */}
      </div>
      <div className="sidebar_links">
        {menuItems[role]?.map((item) =>
          item.children ? (
            <div key={item.label} className="sidebar_menu">
              <button
                onClick={() => toggleMenu(item.label)}
                className={`sidebar_menu_button ${activeMenu === item.label ? "active" : ""}`}
              >
                <span>{item.icon} {item.label}</span>
                {openMenus[item.label] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </button>
              {openMenus[item.label] && (
                <div className="sidebar_submenu">
                  {item.children.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={`sidebar_submenu_item ${activeSubPath === subItem.path ? "active" : ""}`}
                      onClick={() => {
                        setActiveMenu(item.label); // ota menu-ni ham ochiq qilib qolish
                        setActiveSubPath(subItem.path); // active sub-path ni belgilash
                      }}
                    >
                      {subItem.icon} <span>{subItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar_menu_item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveMenu(item.label); // menyu eslab qolsin
                localStorage.setItem("activeMenu", item.label); // localStorage ga yozish
                setActiveSubPath(""); // submenu bo'lmasa
              }}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>

          )
        )}
      </div>
    </aside>
  );
}

export default Sidebar;