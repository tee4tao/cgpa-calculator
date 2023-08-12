import {
  FaBars,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { Outlet, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
export let Sidebar = () => {
  let year = new Date().getFullYear();
  let { openToggle, closeToggle, toggle } = useGlobalContext();
  return (
    <>
      <aside className={toggle ? " side-bar show-aside" : "side-bar"}>
        <div className="aside-header">
          <Link to={"/"} className="heading_home-link">
            <h1>educational</h1>
          </Link>

          <FaTimes className="close-aside_btn" onClick={closeToggle} />
        </div>
        <div className="links">
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/four-points"} className="link" onClick={closeToggle}>
              grade point calculator (4.0)
            </Link>
          </div>
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/five-points"} className="link" onClick={closeToggle}>
              grade point calculator (5.0)
            </Link>
          </div>
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/free-resources"} className="link" onClick={closeToggle}>
              free sites to get useful resources as a student
            </Link>
          </div>
        </div>
        <div className="aside-footer">
          <div className="footer-info">
            <h3>
              &copy;
              <span id="date">{year}</span>
              Calculator Built by TEE4TAO
            </h3>
          </div>
          <div className="social-contacts">
            <a
              href="https://twitter.com/tee4tao"
              className="twitter social-link"
            >
              <FaTwitter />
            </a>
            <a
              href="https://twitter.com/tee4tao"
              className="twitter social-link"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B2348165013325&text&type=phone_number&app_absent=0"
              className="whatsapp social-link"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </aside>
      <Outlet />
    </>
  );
};
