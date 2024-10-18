import "./index.css";
import { Regions } from "../../utils/regions";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import { useDaemonContext } from "../../providers/DaemonProvider";

const Home = () => {
  const { sRegion, setSRegion } = useDaemonContext();
  const [power, setPower] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>
        Silent Pass <span>Proxy</span>
      </h1>
      {power ? (
        <p className="connection">
          Your connection is <span>protected!</span>
        </p>
      ) : (
        <p className="connection">Your connection is not protected!</p>
      )}
      <button
        className="power"
        onClick={() => {
          if (sRegion !== -1) setPower(true);
          if (power) setPower(false);
        }}
      >
        {power ? (
          <img src="/assets/power.png" width={83} height={85} alt="" />
        ) : (
          <img src="/assets/not-power.png" width={83} height={85} alt="" />
        )}
      </button>
      {power ? (
        <p className="connected">Connected</p>
      ) : (
        <p className="not-connected">Not Connected</p>
      )}
      {!power && (
        <>
          <button
            className="auto-btn"
            onClick={() => {
              if (sRegion === -1)
                setSRegion(Math.floor(Math.random() * Regions.length));
            }}
          >
            {sRegion === -1 ? (
              <>
                <img src="/assets/auto.png" width={24} height={24} alt="" />
                Auto Select
              </>
            ) : (
              <>
                <ReactCountryFlag
                  countryCode={Regions[sRegion].code}
                  svg
                  aria-label="United States"
                  style={{
                    fontSize: "2em",
                    lineHeight: "2em",
                  }}
                />
                {Regions[sRegion].country}
              </>
            )}
          </button>
          <p className="home-location">Selected Location</p>
        </>
      )}
      {power ? (
        <div>
          <ReactCountryFlag
            countryCode={Regions[sRegion].code}
            svg
            aria-label="United States"
            style={{
              fontSize: "2em",
              lineHeight: "2em",
              marginRight: ".5em",
            }}
          />
          {Regions[sRegion].country}
        </div>
      ) : (
        <button className="region-btn" onClick={() => navigate("/regions")}>
          <div>
            <img src="/assets/global.png" width={22} height={22} alt="" />
            <p>Select Region</p>
          </div>
          <img src="/assets/right.png" width={4} height={8} alt="" />
        </button>
      )}
    </div>
  );
};

export default Home;
