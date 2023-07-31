import React, { useContext } from "react";
import "./NavProfile.css";
import {Link} from "react-router-dom"
import { auth } from "../../../Configs/firebase";
import { signOut } from 'firebase/auth';
import UserContext from '../../../UserContext';
import useEth from "../../../contexts/EthContext/useEth";


const NavProfile = ({ web3auth, isProfileClicked, src, userInfo = null }) => {
  const { setLoggedInUser } = useContext(UserContext);
  const {
    setWeb3authProvider,
  } = useEth();

  const handleSignOut = async() => {
    setWeb3authProvider(null)
    signOut(auth)
      .then(() => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
      })
      .catch((error) => {
        console.log(error);
      });
      if(!web3auth) return;
    await web3auth.logout();
  };

  return (
    <div className="navbar-navprofile-container" >
      <div className="navbar-navprofile" href="/my-profile">
        <img id="navbar-user-profile-img" src={src} alt={`${src.split("/").pop().split(".")[0]} image`} />
      </div>
      {isProfileClicked && <div className="navbar-dropdown">
        <Link to={userInfo.account_type !== 'free' ? `/athleteprofile/${userInfo.id}` : `/userprofile/${userInfo.id}`}>Voir profil</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/legals">Mentions<br />légales</Link>
        <Link onClick={handleSignOut} 
        // to="/"
        >Déconnecter</Link>
      </div>}
    </div>
  );
};

export default NavProfile;
