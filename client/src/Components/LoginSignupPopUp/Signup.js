import React, { useState, useEffect } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./Signup.css";
import ConfirmationCode from "./ConfirmationCode/ConfirmationCode";
import SetupProfile from "./SetupProfile/SetupProfile";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import ConfirmWallet from "./ConfirmWallet/ConfirmWallet";
import ValidationSignup from "./ValidationSignup/ValidationSignup";
import VerificationCodeEmail from "../Emails/VerificationCodeEmail";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db, ref, googleProvider } from "../../Configs/firebase";
import { signInWithPopup } from "firebase/auth";


// mathéo
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
// fin mathéo


function Signup({ setIsModalSignupUserCropImageClicked, preview }) {
  //
  const [isFormValid, setIsFormValid] = useState(true); // à changer
  const [displayConfirmationCode, setDisplayConfirmationCode] = useState(false);
  const [isConfirmCodeValid, setIsConfirmCodeValid] = useState(false);
  const [displaySetupProfile, setDisplaySetupProfile] = useState(false);
  const [isSetupProfileValid, setIsSetupProfileValid] = useState(false);
  const [displayConnectWallet, setDisplayConnectWallet] = useState(false);
  const [isConnectWalletValid, setConnectWalletValid] = useState(false);
  const [displayConfirmWallet, setDisplayConfirmWallet] = useState(false);
  const [displayValidationSignup, setDisplayValidationSignup] = useState(false);
  //
  const [isDisplayPasswordButtonClicked, setIsDisplayPasswordButtonClicked] =
    useState(false);
  const [
    isDisplayConfirmationPasswordButtonClicked,
    setIsDisplayConfirmationPasswordButtonClicked,
  ] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null); // backend
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailRegexError, setEmailRegexError] = useState(false);
  const [usernameRegexError, setUsernameRegexError] = useState(false);
  const [passwordRegexError, setPasswordRegexError] = useState(false);
  const [passwordConfirmRegexError, setPasswordConfirmRegexError] =
    useState(false);
  const [phoneRegexError, setPhoneRegexError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [opacityInputPhone, setOpacityInputPhone] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false); // a changer
  const [isGoogleSignUpClicked, setIsGoogleSignUpClicked] = useState(false);

  const [web3auth, setWeb3auth] = useState();

  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailRegexError(!emailRegex.test(emailValue));
  }

  function handleDisplayPasswordButtonClick() {
    setIsDisplayPasswordButtonClicked(!isDisplayPasswordButtonClicked);
  }

  function handleDisplayConfirmationPasswordButtonClick() {
    setIsDisplayConfirmationPasswordButtonClicked(
      !isDisplayConfirmationPasswordButtonClicked
    );
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setShowError(false);
  }

  function handleConfirmPasswordChange(e) {
    setPasswordConfirmation(e.target.value);
    setShowError(password !== e.target.value);
  }

  function handlePasswordBlur() {
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;

    return regex.test(password);
  }

  function handlePasswordChange(event) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
    setPasswordRegexError(!passwordRegex.test(passwordValue));
    setPasswordConfirmRegexError(
      passwordConfirmation !== "" && passwordConfirmation !== passwordValue
    );
  }
  function handleConfirmPasswordChange(event) {
    const passwordConfirmValue = event.target.value;
    setPasswordConfirmation(passwordConfirmValue);
    setPasswordConfirmRegexError(
      password !== "" && password !== passwordConfirmValue
    );
  }
  function handlePasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleConfirmPasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(passwordConfirmation)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleMailInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  //
  function handleUsernameChange(event) {
    const usernameValue = event.target.value;
    setUsername(usernameValue);
    const usernameRegex = /^[a-zA-Z0-9_]{1,14}$/;
    setUsernameRegexError(!usernameRegex.test(usernameValue));
  }

  //
  function handlePhoneInput(value) {
    setPhone(value);
    setPhoneRegexError(value && !isValidPhoneNumber(value));
  }
  function handleClickPhoneInput(e) {
    var element = document.querySelector("#signup-user-phone-input-id");
    element.classList.add("PhoneInputInputOpacity");
  }

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setIsGoogleSignUpClicked(true);
    let idToken;
    try {
      const createdAt = new Date();
      // Sign-in process using a popup
      const result = await signInWithPopup(auth, googleProvider);

      console.log(result.user.getIdToken(true));
      idToken = result.user.getIdToken(true);
      

      // start matheo
      const web3auth = new Web3AuthNoModal({
      clientId: "BJqBp0LJfmTafSfMeXtyOcKXLdZhsOl_94wb-C8dFKiB3BJAFQq8LgmAqhj9HTT_bPaWq_FOA5mwFljJ6QUzcRU",
      web3AuthNetwork: "cyan",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
        chainId: "0x5",
      },
    });
  
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        uxMode: "redirect",
        loginConfig: {
          jwt: {
            name: "test",
            verifier: "sofantest",
            typeOfLogin: "jwt",
            clientId: "640702967010-1us0pbfalm4lo039sv4ghjum3fsesalv.apps.googleusercontent.com",
          },
        },
      },
    });
    
    web3auth.configureAdapter(openloginAdapter);
    await web3auth.init();
    try {
      await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "640702967010-1us0pbfalm4lo039sv4ghjum3fsesalv.apps.googleusercontent.com", // same as your JWT Verifier ID
          domain: "https://YOUR-APPLICATION-DOMAIN" || "http://localhost:3000",
        },
      });
    } catch (error) {
      console.error(error);
    }
    console.log("1");
    const userr = await web3auth.getUserInfo();
    console.log("2");
    console.log("User info", userr);
    const web3 = new Web3(web3auth.provider);
    const userAccounts = await web3.eth.getAccounts();
    console.log(userAccounts);
    setWeb3auth(web3auth);
      // end matheo



      const user = result.user;
      const usersRef = collection(db, "users");

      // Here you can manage and use the returned user object
      // You could return it, log it, or do something else
      console.log(user);

      // Create a new user object using Google sign in details
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
        profile_banner: "https://placehold.co/600x400",
        status: true,
        wallet: {
          0: userAccounts[0],
        },
      };

      console.log(newUser);
      await addDoc(usersRef, newUser);
      setDisplaySetupProfile(true);
      setIsSubmitClicked(true);
      setDisplayConfirmationCode(false);
      setIsFormValid(true);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      console.log(`Error Code: ${errorCode}`);
      console.error(`Error Message: ${errorMessage}`);
    }
  };

  const signOut = async () => {
    await web3auth.logout();
  }

  const generateVerificationCode = () => {
    // Generate a random 6-digit number
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  };

  const handleCloseClick = () => {
    console.log('sign innnnnnnnnn');
  }

  function verifyFormIsValid(e) {
    e.preventDefault();
    setIsSubmitClicked(true);
    if (!emailError && !usernameRegexError) {
      if (
        password !== "" &&
        passwordConfirmation !== "" &&
        validatePassword(password) &&
        password === passwordConfirmation
      ) {
        console.log("tout est rempli");
        setIsFormValid(true);
        const createdAt = new Date();
        const auth = getAuth();
        try {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // User signed up successfully
              const user = userCredential.user;
              const usersRef = collection(db, "users");
              const newUser = {
                id: user.uid,
                email,
                account_created: Timestamp.fromMillis(createdAt.getTime()),
                account_type: "free",
                name: username,
                username,
                display_name: username,
                phone,
                emailVerified: false,
                news: false,
                premium: false,
                profile_banner: "https://placehold.co/600x400",
                status: true,
              };
              const emailValidRef = collection(db, "email_validations");
              const validationData = {
                userId: user.uid,
                email,
                code: generateVerificationCode(),
                created_At: Timestamp.fromMillis(createdAt.getTime()),
              };
              await addDoc(usersRef, newUser);
              await addDoc(emailValidRef, validationData);
            })
            .catch((error) => {
              // Handle errors here
              setError(error.message);
              console.error(error);
            });
        } catch (error) {
          console.error("Error adding post: ", error);
          // Display an error message to the user
        }
      } else {
        console.log("la deuxième condition n'est pas remplie");
        setIsFormValid(false);
      }
    } else {
      console.log("la première condition n'est pas remplie");
      setIsFormValid(false);
    }
    console.log("oui");
  }

  useEffect(() => {
    if (isFormValid && isSubmitClicked) {
      setTimeout(() => {
        if (!isGoogleSignUpClicked) {
          setDisplayConfirmationCode(true);
        }
      }, 2000);
    }
  }, [isFormValid, isSubmitClicked]);

  function handleSubmitConfirmationCodeClick() {
    console.log("click");
    if (isConfirmCodeValid) {
      setDisplayConfirmationCode(false);
      // setDisplaySetupProfile(true);
      setTimeout(() => {
        setDisplaySetupProfile(true);
      }, 2000);
    }
  }
  // Setup Profile step
  function handleSetupProfileNextButtonClick() {
    // passer à l'étape suivante
    setDisplaySetupProfile(false);
    setTimeout(() => {
      setDisplayConnectWallet(true);
    }, 2000);
    // console.log("oui");
  }
  function handleSetupProfileAddLaterClick() {
    // passer à l'étape suivante
    setIsSetupProfileValid(true);
    setDisplaySetupProfile(false);
    setTimeout(() => {
      setDisplayConnectWallet(true);
    }, 2000);
  }
  function handleConnectWalletClick() {
    setDisplayConnectWallet(false);
    setTimeout(() => {
      setDisplayConfirmWallet(true);
    }, 2000);
  }
  function handleConfirmWalletClick() {
    setDisplayConfirmWallet(false);
    setTimeout(() => {
      setDisplayValidationSignup(true);
    }, 2000);
  }
  function handleConfirmationCodePreviousStep() {
    setDisplayConfirmationCode(false);
    setIsFormValid(false);
    setIsSubmitClicked(false);
  }
  function handleSetupProfilePreviousStep(e) {
    setDisplaySetupProfile(false);
    setDisplayConfirmationCode(true);
  }
  function handlePreviousStepConnectWallet(e) {
    setDisplayConnectWallet(false);
    setDisplaySetupProfile(true);
  }
  function handlePreviousStepConfirmWallet(e) {
    setDisplayConfirmWallet(false);
    setDisplayConnectWallet(true);
  }
  return (
    <>
      {isFormValid && isSubmitClicked ? (
        <>
          <div
            className={
              displayConfirmationCode
                ? "signup-user-confirmation-code-container"
                : displaySetupProfile
                ? "signup-user-setup-profile-container"
                : displayConnectWallet
                ? "signup-user-connect-wallet-container"
                : displayConfirmWallet
                ? "signup-user-confirm-wallet-container"
                : displayValidationSignup
                ? "signup-user-validation-signup-container"
                : "signup-user-container"
            }
          >
            {displayConfirmationCode ? (
              <>
                <ConfirmationCode
                  setIsConfirmCodeValid={setIsConfirmCodeValid}
                  isConfirmCodeValid={isConfirmCodeValid}
                  handleSubmitConfirmationCodeClick={
                    handleSubmitConfirmationCodeClick
                  }
                  handleConfirmationCodePreviousStep={
                    handleConfirmationCodePreviousStep
                  }
                  UserEmail={email}
                />
              </>
            ) : displaySetupProfile ? (
              <>
                <SetupProfile
                  setIsModalSignupUserCropImageClicked={
                    setIsModalSignupUserCropImageClicked
                  }
                  preview={preview}
                  handleSetupProfileNextButtonClick={
                    handleSetupProfileNextButtonClick
                  }
                  handleSetupProfileAddLaterClick={
                    handleSetupProfileAddLaterClick
                  }
                  handleSetupProfilePreviousStep={
                    handleSetupProfilePreviousStep
                  }
                />
              </>
            ) : displayConnectWallet ? (
              <>
                <ConnectWallet
                  handleConnectWalletClick={handleConnectWalletClick}
                  handlePreviousStepConnectWallet={
                    handlePreviousStepConnectWallet
                  }
                />
              </>
            ) : displayConfirmWallet ? (
              <>
                <ConfirmWallet
                  handleConfirmWalletClick={handleConfirmWalletClick}
                  handlePreviousStepConfirmWallet={
                    handlePreviousStepConfirmWallet
                  }
                />
              </>
            ) : displayValidationSignup ? (
              <>
                <ValidationSignup handleCloseClick={handleCloseClick} />
              </>
            ) : (
              <>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="signup-user-container">
            <form action="#" className="signup-user-wrap-form">
              <div className="signup-user-title">S'inscrire</div>
              <div className="signup-user-title-description">
                Sign up now to connect with athletes and explore exclusive NFT
                content within a vibrant community of sports enthusiasts!
              </div>
              <div className="signup-user-mail-title">
                E-mail <span style={{ color: "red" }}>*</span>
              </div>
              <input
                className="signup-user-mail-input"
                type="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleMailInput}
                placeholder="Entrez votre mail"
                name=""
                id=""
              />
              {emailError && (
                <p className="signup-user-error-mail">
                  Veuillez entrer une adresse e-mail valide.
                </p>
              )}

              <div className="signup-user-username-title">
                Pseudo <span style={{ color: "red" }}>*</span>
              </div>
              <input
                className="signup-user-username-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Choisissez votre pseudo"
              />
              {usernameRegexError && (
                <p className="signup-user-error-username">
                  Veuillez entrer un pseudo valide. Il doit comporter 1 à 14
                  caractères alphanumériques ou des underscores.
                </p>
              )}
              <div className="signup-user-phone-title">Numéro de téléphone</div>
              <PhoneInput
                id="signup-user-phone-input-id"
                onClick={handleClickPhoneInput}
                international
                defaultCountry="FR"
                value={phone}
                onChange={handlePhoneInput}
                className="signup-user-phone-input"
                placeholder="Entrez votre numéro de téléphone"
              />
              {phoneRegexError && (
                <p className="signup-user-error-phone">
                  Veuillez entrer un numéro de téléphone valide.
                </p>
              )}
              <div className="signup-user-password-title">
                Mot de passe <span style={{ color: "red" }}>*</span>
              </div>
              <div className="signup-user-password-input-container">
                <input
                  className="signup-user-password-input"
                  type={isDisplayPasswordButtonClicked ? "text" : "password"}
                  placeholder="Mot de passe"
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  name=""
                  id=""
                />
                {password !== "" && !validatePassword(password) && (
                  <p className="signup-user-error-password">
                    Le mot de passe doit contenir au moins une majuscule, un
                    chiffre et un caractère spécial et 8 caractères minimum.
                  </p>
                )}

                <div className="signup-user-input-display-button">
                  {isDisplayPasswordButtonClicked ? (
                    <>
                      <svg
                        onClick={handleDisplayPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        onClick={handleDisplayPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
              <div className="signup-user-confirmation-password-title">
                Confirmer mot de passe <span style={{ color: "red" }}>*</span>
              </div>
              <div className="signup-user-confirm-password-input-container">
                <input
                  className="signup-user-confirmation-password-input"
                  type={
                    isDisplayConfirmationPasswordButtonClicked
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirmez votre mot de passe"
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  name=""
                  id=""
                />
                <div className="signup-user-input-display-button">
                  {isDisplayConfirmationPasswordButtonClicked ? (
                    <>
                      <svg
                        onClick={handleDisplayConfirmationPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        onClick={handleDisplayConfirmationPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    </>
                  )}
                </div>
                {showError && (
                  <div className="password-error-message-signup">
                    Les mots de passes ne correspondent pas.
                  </div>
                )}
              </div>
              <button
                onClick={verifyFormIsValid}
                className="signup-user-create-account-button"
              >
                Créer mon compte
              </button>
              {!isFormValid && isSubmitClicked && (
                <>
                  <p className="signup-user-error-fill-form">
                    Veuillez remplir tout les champs obligatoires. Ils
                    contiennent une astérisque (*)
                  </p>
                </>
              )}
              <div className="signup-page-confirmation-accept-cgu">
                En cliquant sur "S'inscrire", vous acceptez nos 
                <a target="blank" href="cgu">
                  Conditions générales d'utilisation
                </a>
                .
              </div>
              <div className="signup-user-separation-line-container">
                <div className="signup-user-separation-line-left"></div>
                <div className="signup-user-separation-or">OU</div>
                <div className="signup-user-separation-line-right"></div>
              </div>
              <button
                onClick={(e) => signUpWithGoogle(e)}
                className="signup-user-google-signup"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f"
                  alt="google logo"
                />
                <div className="signup-user-google-signup-text">
                  S'inscrire avec Google
                </div>
              </button>
              <div className="signup-user-already-an-account">
                Vous avez déjà un compte ? <span>Se connecter</span>
              </div>
              <br /><button onClick={signOut}>Sign out</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
