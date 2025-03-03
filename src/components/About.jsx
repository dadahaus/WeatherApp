import React from "react";

const About = () => {
  const lastUpdate = "2023-10-25"; // Replace with the actual submission date
  const buildDate = "2023-10-25"; // Same as last update
  const developerName = "Agustin Sanchez"; // Replace with your name
  const studentNumber = "12345678"; // Replace with your student number

  return (
    <div className="about-page">
      <h1><strong>Weather Time</strong></h1>
      <p>Copyright © 2023 Weather Time. All rights reserved.</p>
      <p>Version: 1.0</p>
      <p>Last Update: {lastUpdate}</p>
      <p>Build Date: {buildDate}</p>
      <p>Developer: {developerName}</p>
      <p>Student Number: {studentNumber}</p>
    </div>
  );
};

export default About;