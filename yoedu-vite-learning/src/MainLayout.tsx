// MainLayout.tsx
import { NavLink, Outlet } from "react-router-dom";
import "./styles/index.css";


const MainLayout = () => {
  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <nav className="top-nav">
        {/* <NavLink
          to="/counter"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Counter
        </NavLink>
        <NavLink
          to="/toggle"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Toggle
        </NavLink>
        <NavLink
          to="/input"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Input Preview
        </NavLink>
        <NavLink
          to="/student"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Student CRUD
        </NavLink>

        <NavLink
          to="/todo"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          To-Do List
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Shopping Cart
        </NavLink> */}

        <NavLink
          to="/UserPage"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          UserPage
        </NavLink>

        <NavLink
          to="/StudentFromPage"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          StudentForm
        </NavLink>
        <NavLink
          to="/lesson4"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          StudentAntDesign
        </NavLink>
        <NavLink
          to="/lesson5"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Mini Shop
        </NavLink>
      </nav>


      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-card">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
