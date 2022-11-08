import { Link } from "react-router-dom";
export let FreeResources = () => {
  let progress = "Work In Progress";
  return (
    <section className="resouces-page">
      {alert(progress)}
      <h1>Free Resources</h1>
      <Link to="/">
        <button className="back-btn home-btn">Home Page</button>
      </Link>
    </section>
  );
};
