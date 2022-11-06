import { FaTimes } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
export let Modal = () => {
  let { openModal, closeModal, modal } = useGlobalContext();
  return (
    <>
      <div
        className={modal ? "modal-overlay show-modal" : "modal-overlay"}
      ></div>
      <article
        className={modal ? "modal-container show-modal" : "modal-container"}
      >
        <FaTimes className="close-aside_btn modal-btn" onClick={closeModal} />
        <div className="links modal-links">
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/four-points"} className="link">
              grade point calculator (4.0)
            </Link>
          </div>
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/five-points"} className="link">
              grade point calculator (5.0)
            </Link>
          </div>
          <div className="link-container">
            <BsDot className="dot" />
            <Link to={"/free-resources"} className="link">
              free sites to get useful resources as a student
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};
