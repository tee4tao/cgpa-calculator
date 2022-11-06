import React, { useContext } from "react";
import { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  let [toggle, setToggle] = useState(false);
  let [modal, setModal] = useState(false);
  let [resultModal, setResultModal] = useState(false);
  let [calcGP, setCalcGP] = useState("");
  let [classOfDegree, setClassOfDegree] = useState("");
  let openToggle = () => {
    setToggle(true);
  };
  let closeToggle = () => {
    setToggle(false);
  };
  let openModal = () => {
    setModal(true);
  };
  let closeModal = () => {
    setModal(false);
  };
  let openResultModal = () => {
    setResultModal(true);
  };
  let closeResultModal = () => {
    setResultModal(false);
  };
  return (
    <AppContext.Provider
      value={{
        openToggle,
        closeToggle,
        toggle,
        openModal,
        closeModal,
        modal,
        resultModal,
        openResultModal,
        closeResultModal,
        calcGP,
        setCalcGP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
