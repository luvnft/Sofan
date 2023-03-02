import React from "react";
import "./AthleteProfileEventTemplate.css";
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
import { Link } from "react-router-dom";
const AthleteProfileEventTemplate = ({ eventData, isTransparent }) => {
  return (
    <Link className="athleteprofileeventtemplate-component" style={isTransparent && {visibility: "hidden"}}>
      <img
        className="athleteprofileeventtemplate-background"
        src={eventData?.background}
        alt="background"
      />
      <div className="athleteprofileeventtemplate-container-content">
        <div className="athleteprofileeventtemplate-wrap-content">
          <span>{eventData?.title}</span>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Location} alt="location" />
            <span>{eventData?.location}</span>
          </div>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Calendar} alt="calendar" />
            <span>{eventData?.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileEventTemplate;
