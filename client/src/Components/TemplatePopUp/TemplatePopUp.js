import React, { useState, useEffect } from "react";
import "./TemplatePopUp.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
function TemplatePopUp({
  handleClick,
  athleteSuggestPopUp,
  athleteFollowingSupportingPopUp,
  athleteFollowingSupportingPopUpStyle,
  dataAthleteProfilePageConcat,
  isAthleteSupportingClicked
}) {
  const [
    isNotificationPopUpSubMenuReadClicked,
    setIsNotificationPopUpSubMenuReadClicked,
  ] = useState(false);

  const handleNotificationPopUpSubMenuClicked = (e) => {
    if (athleteFollowingSupportingPopUp === true) {
      if (e.target.innerHTML === "Athlètes supportés") {
        setIsNotificationPopUpSubMenuReadClicked(true)  
      } else {
        setIsNotificationPopUpSubMenuReadClicked(false)
      }
    } 
    // ======================================
    if (e.target.innerHTML === "Lus") {
      setIsNotificationPopUpSubMenuReadClicked(true);
    } else if (e.target.innerHTML === "Non lus") {
      setIsNotificationPopUpSubMenuReadClicked(false);
    }
  };
  useEffect(() => {
    isAthleteSupportingClicked && setIsNotificationPopUpSubMenuReadClicked(true)
  }, [])
  
  return (
    <>
      <div className="notificationpopup-component">
        <span>
          {athleteSuggestPopUp ? (
            <>Suggestion d'athlètes</>
          ) : athleteFollowingSupportingPopUp ? (
            <>Athlètes suivis / supportés</>
          ) : (
            <>Notifications</>
          )}
        </span>
        <div className="notificationpopup-container">
          {athleteSuggestPopUp ? (
            <></>
          ) : (
            <>
              <div className="notificationpopup-container-submenu-wrap">
                <div
                  className={
                    isNotificationPopUpSubMenuReadClicked
                      ? "notificationpopup-container-submenu-subwrap"
                      : "notificationpopup-container-submenu-subwrap notificationpopup-container-submenu-subwrap-clicked"
                  }
                >
                  <Button
                    onClick={handleNotificationPopUpSubMenuClicked}
                    text={athleteFollowingSupportingPopUp ? "Athlètes suivis" : "Non lus"}
                  />
                </div>
                <div
                  className={
                    isNotificationPopUpSubMenuReadClicked
                      ? "notificationpopup-container-submenu-subwrap notificationpopup-container-submenu-subwrap-clicked"
                      : "notificationpopup-container-submenu-subwrap"
                  }
                >
                  <Button
                    onClick={handleNotificationPopUpSubMenuClicked}
                    text={athleteFollowingSupportingPopUp ? "Athlètes supportés" : "Lus"}
                  />
                </div>
              </div>
            </>
          )}

          {isNotificationPopUpSubMenuReadClicked ? (
            <div className={`notificationpopup-container-mapping-wrap ${athleteFollowingSupportingPopUpStyle}`}>
              {dataAthleteProfilePageConcat?.notifications.read.map(
                (notification) => (
                  <Link
                    to={`/user/${notification.userId}`}
                    className="notificationpopup-container-notification-wrap"
                  >
                    <img
                      src={notification.profilePicture}
                      alt="Sender notification profile"
                    />
                    <div className="notificationpopup-container-notification-wrap-content-wrap">
                      <div className="notificationpopup-container-notification-wrap-content-subwrap">
                        <span>{notification.username} </span>
                        <span>{notification.textTypeOffer} </span>
                        <span>{notification.nftTitle}</span>
                      </div>
                      <span>{notification.sport} </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className={`notificationpopup-container-mapping-wrap ${athleteFollowingSupportingPopUpStyle}`}>
              {dataAthleteProfilePageConcat?.notifications.unread.map(
                (notification) => (
                  <Link
                    to={`/user/${notification.userId}`}
                    className="notificationpopup-container-notification-wrap"
                  >
                    <img
                      src={notification.profilePicture}
                      alt="Sender notification profile"
                    />
                    <div className="notificationpopup-container-notification-wrap-content-wrap">
                      <div className="notificationpopup-container-notification-wrap-content-subwrap">
                        <span>{notification.username} </span>
                        {/* <span>{notification.sport} </span> */}
                        <span>{notification.nftTitle}</span>
                      </div>
                      <span>{notification.sport} </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
        <div className="template-pop-up-line-separation"></div>
        <Button text="Fermer" id="custom-close-button" onClick={handleClick} hover="button-hover-props" />
      </div>
      {(dataAthleteProfilePageConcat?.notifications.unread.length > 5 ||
        dataAthleteProfilePageConcat?.notifications.unread.length > 5) && (
        <style>
          {`
        .notificationpopup-container > div > a:nth-last-child(1){
             border: none !important;
            }
        `}
        </style>
      )}
    </>
  );
}

export default TemplatePopUp;
