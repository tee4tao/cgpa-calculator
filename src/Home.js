import { FaBars, FaTimes } from "react-icons/fa";
import { Modal } from "./Modal";
import { useGlobalContext } from "./context";
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
    </section>
  );
};
