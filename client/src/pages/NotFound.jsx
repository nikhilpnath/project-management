import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center not-found"
      style={{ height: "28.3rem" }}
    >
      <h1>404</h1>
      <p className="lead">Sorry, this page does not exist</p>
      <Link to="/" className="btn btn-light">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
