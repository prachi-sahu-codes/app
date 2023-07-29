import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdExplore, MdPlaylistAdd, MdWatchLater } from "react-icons/md";

export const Header = () => {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "#2dbcd9" : "#000814",
  });

  return (
    <nav className="sidebar">
      <NavLink to="/" style={activeStyle} className="navLink flex items-center">
        <AiFillHome className="mr-1 mb-1" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/explore"
        style={activeStyle}
        className="navLink flex items-center"
      >
        <MdExplore className="mr-1 mb-1" />
        <span>Explore</span>
      </NavLink>
      <NavLink
        to="/playlist"
        style={activeStyle}
        className="navLink flex items-center"
      >
        <MdPlaylistAdd className="mr-1 mb-1 text-xl" />
        <span>Playlist</span>
      </NavLink>
      <NavLink
        to="/watchLater"
        style={activeStyle}
        className="navLink flex items-center"
      >
        <MdWatchLater className="mr-1 mb-1" />
        <span>Watch Later</span>
      </NavLink>
    </nav>
  );
};
