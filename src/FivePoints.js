import { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
export let FivePoints = () => {
  let [classOfDegree, setClassOfDegree] = useState("");
  let {
    openResultModal,
    closeResultModal,
    resultModal,
    calcGP,
    setCalcGP,
    prevCGPA,
    setPrevCGPA,
    prevUnits,
    setPrevUnits,
  } = useGlobalContext();
  let handleSubmit = () => {
    if (
      document.getElementsByClassName("units-select").length > 0 &&
      document.getElementsByClassName("points-select").length > 0
    ) {
      let unitArr = [...document.getElementsByClassName("units-select")];
      let pointsArr = [...document.getElementsByClassName("points-select")];
      let testUnit = unitArr.map((items) => {
        return items.options.selectedIndex;
      });
      let testPoint = pointsArr.map((items) => {
        return items.options.selectedIndex;
      });
      let sum = [];
      for (var i = 0; i < testUnit.length; i++) {
        sum.push(testUnit[i] * testPoint[i]);
      }
      let totalSum = sum.reduce((curr, acc) => {
        acc += curr;
        return acc;
      }, 0);
      let currentUnit = parseInt(
        testUnit.reduce((curr, acc) => {
          acc += curr;
          return acc;
        }, 0)
      );
      let gpValue = (totalSum / currentUnit).toFixed(2);
      if (prevUnits > 0) {
        let previousCalc = prevCGPA * prevUnits;
        let currentCalc = gpValue * currentUnit;
        let totalUnits = parseInt(prevUnits) + currentUnit;
        let totalCGPA = ((previousCalc + currentCalc) / totalUnits).toFixed(2);
        setCalcGP(totalCGPA);
        if (prevCGPA > 5) {
          setCalcGP(`error`);
          setClassOfDegree("");
        } else if (prevCGPA == 0 && currentUnit == 0) {
          setCalcGP(0);
          setClassOfDegree("no degree!");
        } else if (prevCGPA > 0 && currentUnit == 0) {
          setCalcGP(prevCGPA);
          if (prevCGPA >= 4.5) {
            setClassOfDegree("first class");
          } else if (prevCGPA >= 3.5) {
            setClassOfDegree("second class upper");
          } else if (prevCGPA >= 2.4) {
            setClassOfDegree("second class lower");
          } else if (prevCGPA >= 1.5) {
            setClassOfDegree("third class");
          } else if (prevCGPA >= 1.0) {
            setClassOfDegree("pass");
          } else {
            setClassOfDegree("no degree!");
          }
        }
      } else {
        setCalcGP(gpValue);
      }
      openResultModal();
    }
  };
  useEffect(() => {
    if (calcGP >= 4.5) {
      setClassOfDegree("first class");
    } else if (calcGP >= 3.5) {
      setClassOfDegree("second class upper");
    } else if (calcGP >= 2.4) {
      setClassOfDegree("second class lower");
    } else if (calcGP >= 1.5) {
      setClassOfDegree("third class");
    } else if (prevCGPA >= 1.0) {
      setClassOfDegree("pass");
    } else if (calcGP < 1) {
      setClassOfDegree("no degree!");
    } else if (calcGP === "NaN") {
      setCalcGP(0);
      setClassOfDegree("no degree!");
    }
  }, [calcGP]);
  return (
    <>
      <section
        className={
          resultModal ? "result-overlay show-overlay" : "result-overlay"
        }
      >
        <div className="container">
          <div className="modal-overlay show-modal"></div>
          <div className="calculated-grade">
            <h3>CGPA: {calcGP}</h3>
            <h3>{classOfDegree}</h3>
            <button className="back-btn" onClick={closeResultModal}>
              okay!
            </button>
          </div>
        </div>
      </section>
      <section className="four-points_container">
        <Link to="/">
          <button className="back-btn home-btn">Home Page</button>
        </Link>

        <h1 className="four-point_header">GP calculator (5 points)</h1>
        <h3 className="returning-students">for returning students:</h3>
        <form className="previous-records">
          <label htmlFor="previous-cgpa" className="previous-cgpa_label">
            previous CGPA (2 d.p or more)
          </label>
          <input
            type="number"
            id="previous-cgpa"
            placeholder="0"
            value={prevCGPA}
            onChange={(e) => setPrevCGPA(e.target.value)}
          />
          <label
            htmlFor="previous_total-unit"
            className="previous_total-unit-label"
          >
            total units for previous sessions
          </label>
          <input
            type="number"
            id="previous_total-unit"
            placeholder="0"
            value={prevUnits}
            onChange={(e) => setPrevUnits(e.target.value)}
          />
        </form>
        <article className="table">
          <table>
            <tbody>
              <tr className="table-head">
                <th>Courses</th>
                <th className="units">Units</th>
                <th className="points">Points</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 1"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 2"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 3"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 4"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 5"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 6"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 7"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 8"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 9"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 10"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 11"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 12"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 13"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 14"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 15"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 16"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 17"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 18"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 19"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 20"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 21"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 22"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 23"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 24"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 25"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="course 26"
                    className="courses"
                  />
                </td>
                <td>
                  <select name="units" className="units-select">
                    <option value="">empty</option>
                    <option value="1-unit">1-unit</option>
                    <option value="2-unit">2-unit</option>
                    <option value="3-unit">3-unit</option>
                    <option value="4-unit">4-unit</option>
                    <option value="5-unit">5-unit</option>
                    <option value="6-unit">6-unit</option>
                  </select>
                </td>

                <td>
                  <select name="points" className="points-select">
                    <option value="">empty</option>
                    <option value="1-point">1-point</option>
                    <option value="2-point">2-point</option>
                    <option value="3-point">3-point</option>
                    <option value="4-point">4-point</option>
                    <option value="5-point">5-point</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="compute-btn" onClick={handleSubmit}>
            compute
          </button>
        </article>
      </section>
    </>
  );
};
