import React from "react";
import { useNavigate } from "react-router-dom";
import "./error.css";

export default function Error() {
  const navigate = useNavigate();

  const redirectToDesktop = () => {
    // Replace "/desktop" with the route for your desktop version
    navigate("/login");
  };

  return (
    <div className="container">
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>Something is wrong!</h2>
          <p>Please open the site on desktop version</p>
          <button onClick={redirectToDesktop}>Go To Desktop</button>
        </div>
      </div>
    </div>
  );
}
