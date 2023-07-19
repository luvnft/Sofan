import React from "react";
import "./ConnectWallet.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import useEth from "../../../contexts/EthContext/useEth";
import Web3 from "web3";
function ConnectWallet({
  handleConnectWalletClick,
  handlePreviousStepConnectWallet,
  web3auth,
  googleIdToken,
}) {
  const { setProvider } = useEth();

  const handleCreateWallet = async (e) => {
    e.preventDefault();
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }

    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: googleIdToken,
          verifierIdField: "sub",
          domain: "http://localhost:3000",
        },
      }
    );
    setProvider(web3authProvider);
    const web3 = new Web3(web3authProvider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    // construct backend here

    //End backend
  };
  return (
    <div className="signup-user-connect-wallet-wrap">
      <div
        onClick={handlePreviousStepConnectWallet}
        className="signup-user-connect-wallet-previous-step"
      >
        <img src={previousArrow} alt="Etape précédente" />
      </div>
      <div className="signup-user-connect-wallet-title">
        Connectez votre wallet
      </div>
      <div className="signup-user-connect-wallet-list-container">
        <div className="signup-user-connect-wallet-list-wrap">
          <div className="signup-user-connect-wallet-list-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Metamask.png?alt=media&token=2baf71ad-f4a4-48be-826b-1f0a23384ee1"
              alt="Metamask Logo"
            />
          </div>
          <div className="signup-user-connect-wallet-list-wallet-name">
            Metamask
          </div>
        </div>
        <div className="signup-user-connect-wallet-list-wrap">
          <div className="signup-user-connect-wallet-list-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/coinbase-wallet.png?alt=media&token=a73e7567-60ea-40d1-8723-cbdd6dadc00b"
              alt="Coinbase Wallet Logo"
            />
          </div>
          <div className="signup-user-connect-wallet-list-wallet-name">
            Coinbase Wallet
          </div>
        </div>
        <div className="signup-user-connect-wallet-list-wrap">
          <div className="signup-user-connect-wallet-list-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/wallet-connect.png?alt=media&token=bf327435-99d9-443b-94cd-56f8db3d1dbc"
              alt="Wallet Connect Logo"
            />
          </div>
          <div className="signup-user-connect-wallet-list-wallet-name">
            Wallet Connect
          </div>
        </div>
      </div>
      <button
        onClick={handleConnectWalletClick}
        className="signup-user-connect-wallet-next-button"
      >
        Suivant
      </button>
      <div className=" "></div>
      <div className="signup-user-separation-line-container">
        <div className="signup-user-separation-line-left"></div>
        <div className="signup-user-separation-or">OU</div>
        <div className="signup-user-separation-line-right"></div>
      </div>
      <button className="signup-user-connect-wallet-web3auth-button">
        <div className="signup-user-connect-wallet-web3auth-button-img-container">
          <img
            src="https://imgix.cryptojobslist.com/401f8c11-9a3a-4d92-b137-d2743c65d011.jpg?w=100&h=100&auto=format&fit=fill&fill=solid"
            alt=""
          />
        </div>
        <div
          className="signup-user-connect-wallet-button-title"
          onClick={handleCreateWallet}
        >
          Créer mon wallet
        </div>
      </button>
      <div className="signup-user-connect-wallet-progress-bar-container">
        <div
          style={{ width: "65%" }}
          className="signup-user-connect-wallet-progress-bar"
        ></div>
      </div>
    </div>
  );
}

export default ConnectWallet;
