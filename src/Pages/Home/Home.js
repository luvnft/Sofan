import React from "react";
import "./Home.css";

function Home({handleProfileOutClick}) {
  return (
    <>
      <h1 onClick={handleProfileOutClick}>Home</h1>
      <h1>
        <ul>
          <li>
            <a href="/signupathlete">Sign up Athlete</a>
          </li>
          <li>
            <a href="/publication">
              Publication component
            </a>
          </li>
        </ul>
      </h1>
    </>
  );
}

export default Home;
