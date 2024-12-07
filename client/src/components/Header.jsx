import Logo from "../assets/logo.png";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };


  return (
    <nav className="navbar bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="d-flex brand">
            <img src={Logo} alt="logo" />
            <div>Project Management</div>
          </div>
        </Link>
        {theme ? (
          <CiLight
            className="theme-icons"
            style={{ color: "#efdaea" }}
            onClick={toggleTheme}
          />
        ) : (
          <MdDarkMode className="theme-icons" onClick={toggleTheme} />
        )}
      </div>
    </nav>
  );
};

export default Header;
