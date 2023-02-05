import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import { useState } from "react";
import PostsFeed from "./Components/PostsComponents/PostsFeed/PostsFeed";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
import PollPost from "./Components/PostsComponents/PollPost/PollPost";
import FavAthlete from './Components/FavAthlete/FavAthlete';

function App() {
  // const [waitingPage, setWaitingPage] = useState(true)
  const [isProfileClickcd, setIsProfileClicked] = useState(false);
  const handleProfileOutClick = () => {
    setIsProfileClicked(false);
  };
  return (
    <BrowserRouter>
    {/* {waitingPage ? <></> :  <Navbar /> } */}
      
      {/* <Routes> */}
        {/* <Route index element={<Home waitingPage={waitingPage}/>} /> */}
      <Navbar
        isProfileClickcd={isProfileClickcd}
        setIsProfileClicked={setIsProfileClicked}
      />
      <Routes>
        <Route index element={<Home handleProfileOutClick={handleProfileOutClick}/>} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/publication" element={<PostsFeed />} />
        <Route path="/post938098" element={<FullPagePost />} />
        <Route path="/pollpost" element={<PollPost />} />
        <Route path="/favathlete" element={<FavAthlete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
