import React from "react";
import "./Home.css";
import WaitingPage from "../WaitingPage/WaitingPage";
import { Link } from  "react-router-dom"
function Home({ waitingPage }) {
  return (
    <>
      {waitingPage ? (
        <>
          <WaitingPage />
        </>
      ) : (
        <>
          <section className="sofan-webapp-container">
            <h1>Home</h1>
            <h1>
              <ul>
                <li>
                  <Link to="/signupathlete">
                    Sign-up Athlete
                  </Link>
                </li>
                <li>
                  <Link to="/publication">
                    Publication component
                  </Link>
                </li>
                <li>
                  <Link to="/post938098">Full Page Post</Link>
                </li>
                <li>
                  <Link to="/pollpost">
                  PollPost
                  </Link>
                </li>
                <li>
                  <Link to="/favathlete">
                  Fav Athlete
                  </Link>
                </li>
                <li>
                  <Link to="/sidenavlink">
                  Side Nav Link
                  </Link>
                </li>
                <li>
                  <Link to="/dropdown">
                  DropDonwMenu
                  </Link>
                </li>
              </ul>
            </h1>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
