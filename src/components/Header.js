import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export const Header = () => {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "#2dbcd9" : "#000814",
  });

  return (
    <nav className="sidebar">
      <NavLink to="/" style={activeStyle} className="navLink underline">
        <AiFillHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/explore" style={activeStyle} className="navLink">
        <span>Explore</span>
      </NavLink>
      <NavLink to="/playlist" style={activeStyle} className="navLink">
        <span>Playlist</span>
      </NavLink>
      <NavLink to="/watchLater" style={activeStyle} className="navLink">
        <span>Watch Later</span>
      </NavLink>
    </nav>
  );
};
