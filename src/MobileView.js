import React from "react";
import "./MobileView.css";
function Mobileview({ data, setdata }) {
  const Card = (row) => {
    return (
      <div className="card">
        <div className="top-m">
          <div className="img-card">
            <img src={row.links.mission_patch} width="100" height="100" />
          </div>
          <div className="data">
            <span>Flight No : </span>
            {row.flight_number}
            <br />
            <span>Mission Name : </span>
            {row.mission_name}
            <br />
            <span>Launch Year : </span>
            {row.launch_year}
            <br />
            <span>Rocket Name : </span>
            {row.rocket.rocket_name}
            <br />
          </div>
        </div>
        <div className="details">{row.details}</div>
      </div>
    );
  };

  return (
    <div className="mobileview">
      {data.map(Card)}
      {!data.length &&
        setdata([
          {
            flight_number: "no items",
            launch_year: "no items",
            links: {
              mission_patch: "no item",
            },
            details: "no items",
            mission_name: "no items",
          },
        ])}
    </div>
  );
}

export default Mobileview;
