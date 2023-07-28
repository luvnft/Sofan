import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

// mathéo
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
// fin mathéo
import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import "./PopUpSignIn.css";
import Button from "../Button/Button";

const PopUpSignIn = ({ web3auth, setWeb3auth, handlePopoUpSignInSignUpClick }) => {
  const googleImage =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f";

  const { setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    state: {accounts},
    setProvider,
  } = useEth();

  useEffect(() => {
    const init = async () => {
      try {
        let clientId = process.env.REACT_APP_WEB3AUTH_TOKEN_ID;
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5", // Please use 0x1 for Mainnet
          rpcTarget: "https://rpc.ankr.com/eth_goerli",
          displayName: "Goerli Testnet",
          blockExplorer: "https://goerli.etherscan.io/",
          ticker: "ETH",
          tickerName: "Ethereum",
        };
        const web3auth = new Web3AuthNoModal({
          clientId,
          chainConfig,
          web3AuthNetwork: "cyan",
          useCoreKitKey: false,
        });

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
          adapterSettings: {
            uxMode: "popup",
            loginConfig: {
              jwt: {
                verifier: "sofantest2",
                typeOfLogin: "jwt",
                clientId,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.init();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userInfo = doc.data();

            const AllUserInfo = {
              ...user,
              ...userInfo,
            };
            setLoggedInUser(AllUserInfo);
            // Do something with the user info
          });
        } else {
          // Handle case when no user is found with the given ID
          console.log("No user found");
        }
        setError(false);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setError(true);
        // ..
      });
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    console.log("Google Logged");
    try {
      const res = await signInWithPopup(auth, googleProvider);

      const q = query(collection(db, "users"), where("id", "==", res.user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userInfo = doc.data();
          const AllUserInfo = {
            ...res.user,
            ...userInfo,
          };
          setLoggedInUser(AllUserInfo);
        });
        return res;
      } else {
        // Handle case when no user is found with the given ID
        const createdAt = new Date();
        const user = res.user;
        const usersRef = collection(db, "users");
        const newUser = {
          id: user.uid,
          email: user.email,
          account_created: Timestamp.fromMillis(createdAt.getTime()), // Replace 'user.metadata.creationTime' with appropriate field
          account_type: "free",
          name: user.displayName,
          username: user.displayName.split(" ")[0], // Assuming first name as username
          display_name: user.displayName,
          phone: user.phoneNumber,
          emailVerified: user.emailVerified,
          news: false,
          premium: false,
          profile_profile: "",
          profile_banner: "https://i.imgur.com/sJTNEVk.png",
          status: true,
        };

        await addDoc(usersRef, newUser);

        console.log("No user found");
        return res;
      }
      // navigate("/");
      // console.log(res);
      // console.log(res.user.getIdToken(true));
      // idToken = res.user.getIdToken(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    // switch case pour chaque Signin
    const loginRes = await handleGoogleSignIn(e);
    // console.log("login details", loginRes);
    const idToken = await loginRes.user.getIdToken(true);
    // console.log("idToken", idToken);

    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "sub",
          domain: "http://localhost:3000",
        },
      }
    );
    setProvider(web3authProvider);
    const account = accounts;
    // rajouter backend pour ajouter le wallet
    navigate("/");
  };

  const handleAppleSignIn = async (e) => {
    e.preventDefault();
    console.log("Apple Logged");
  };

  return (
    <>
      <div className="popupsignin-component">
        <span>Sign In</span>
        <span>
          Sign up now to connect with athletes and explore exclusive NFT content
          within a vibrant community of sports enthusiasts!
        </span>
        <div className="popupsignin-input-container">
          <span>E-mail</span>
          <input type="text" placeholder={"Enter your e-mail"} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="popupsignin-input-container">
          <span>Password</span>
          <input type="text" placeholder={"Confirm you password"} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button
          style={popUpSignInForgotPasswordButton}
          isLink={true}
          to={"/forgetpassword"}
          text={"Mot de passe oublié"}
        />
        <Button onClick={handleLogin} style={popUpSignInButton} text={"Sign In"} />
        <div className="popupsignin-style-container">
          <div></div>
          <span>OU</span>
          <div></div>
        </div>
        <div className="popupsignin-socials-container">
          <img src={googleImage} alt="google sign in" />
          <Button
            style={popUpSignInGoogleButton}
            text={"Sign In with Google"}
            onClick={googleLogin}
          />
        </div>
        <div className="popupsignin-signup-container">
          <span>You don't have an account ? </span>
          <Button onClick={handlePopoUpSignInSignUpClick} text={"Sign up"} style={popUpSignInSignUpRedirectButton} />
        </div>
      </div>
    </>
  );
};

export default PopUpSignIn;

const popUpSignInForgotPasswordButton = {
  color: "#3C4045",
  fontFamily: "britanica-heavy",
  lineHeight: "normal",
  textDecorationLine: "underline",
  outline: "none",
  border: "transparent",
  backgroundColor: "transparent",
  marginBottom: "40px",
};

const popUpSignInButton = {
  color: "#3C4045",
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
  outline: "none",
  border: "transparent",
  backgroundColor: "#F6D463",
  marginBottom: "20px",
  borderRadius: "10px",
  width: "460px",
  height: "56px"
};

const popUpSignInGoogleButton = {
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
  backgroundColor: "white",
  marginBottom: "20px",
  borderRadius:"10px",
  border: "1px solid rgba(60, 64, 69, 0.40)",
  width: "425px",
  height: "56px",
  paddingLeft: "35px",
};

const popUpSignInSignUpRedirectButton = {
  color: "#F6D463",
  fontFamily: "britanica-heavy",
  lineHeight: "normal",
  outline: "none",
  border: "transparent",
  backgroundColor: "transparent",
}