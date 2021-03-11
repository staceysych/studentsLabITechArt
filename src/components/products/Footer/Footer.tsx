import React from "react";

import "./Footer.scss";

import valve from "images/Valve_Logo_Since_2018.png";
import rockStar from "images/rockstar-games-555376.png";
import EA from "images/EA_logo_logotype.png";
import activision from "images/Activision_Blizzard.svg.png";
import sony from "images/PlayStation_black_logo.png";

const Footer: React.FC = () => (
  <div className="Footer">
    <h2>Incredible convenient</h2>
    <ul>
      <li>
        <a href="https://www.valvesoftware.com/ru/" target="_blank" rel="noopener noreferrer">
          <img src={valve} alt="Nintendo" className="love" />
        </a>
      </li>
      <li>
        <a href="https://www.rockstargames.com/" target="_blank" rel="noopener noreferrer">
          <img src={rockStar} alt="rockStar" />
        </a>
      </li>
      <li>
        <a href="https://www.ea.com/ru-ru" target="_blank" rel="noopener noreferrer">
          <img src={EA} alt="EA" />
        </a>
      </li>
      <li>
        <a href="https://www.activisionblizzard.com/" target="_blank" rel="noopener noreferrer">
          <img src={activision} alt="activision" />
        </a>
      </li>
      <li>
        <a href="https://www.playstation.com/ru-ru/" target="_blank" rel="noopener noreferrer">
          <img src={sony} alt="sony" />
        </a>
      </li>
    </ul>
  </div>
);

export default Footer;
