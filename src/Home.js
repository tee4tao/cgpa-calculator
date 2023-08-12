// import { FaBars, FaTimes } from "react-icons/fa";
import { Modal } from "./Modal";
import { useGlobalContext } from "./context";
import {
  FaBars,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
export let Home = () => {
  let { openToggle, openModal } = useGlobalContext();
  return (
    <section className="hero">
      <button className="toggle-btn">
        <FaBars onClick={openToggle} />
      </button>
      <h1 className="hero-heading">welcome!</h1>
      <h3 className="hero-text">
        to get started click{" "}
        <button className="start-btn" onClick={openModal}>
          here
        </button>
      </h3>
      <Modal />
      <div className="home-footer">
        <div className="footer-info">
          <h3>
            &copy;
            <span id="date"> {new Date().getFullYear()} </span>
            Calculator Built by TEE4TAO
          </h3>
        </div>
        <div className="social-contacts">
          <a href="https://linkedin.com/in/tee4tao" className="social-link">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/tee4tao" className="social-link">
            <FaGithub />
          </a>
          <a href="https://twitter.com/tee4tao" className="social-link">
            <FaTwitter />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B2348165013325&text&type=phone_number&app_absent=0"
            className="social-link"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
};
