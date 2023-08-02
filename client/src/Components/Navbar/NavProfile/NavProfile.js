import React, { useContext } from "react";
import "./NavProfile.css";
import {Link} from "react-router-dom"
import { auth } from "../../../Configs/firebase";
import { signOut } from 'firebase/auth';
import UserContext from '../../../UserContext';
import useEth from "../../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";

const NavProfile = ({ web3auth, isProfileClicked, src, userInfo = null }) => {
  const { setLoggedInUser, setLocalWeb3authProvider } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    setWeb3authProvider,
  } = useEth();

  const handleSignOut = async() => {
    setWeb3authProvider(null);
    try {
      if (!web3auth) return;
      await web3auth.logout();
    } catch (err) {
      console.error(err);
    }
    signOut(auth)
    .then(() => {
      setLoggedInUser(null);
      setLocalWeb3authProvider(null);
        localStorage.removeItem("loggedInUser");
      navigate('/')
    })
      .catch((error) => {
        console.log(error);
      });
    
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
