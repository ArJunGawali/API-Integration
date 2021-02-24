import React, { useEffect, useState } from "react";
import { ToggleButton } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./App.css";
import MobileView from "./MobileView";

function App() {
  const [url, seturl] = useState(
    "https://api.spaceXdata.com/v3/launches?limit=100"
  );
  const [data, setdata] = useState([]);
  const [launchYr, setlaunchYr] = useState();
  const [successLaunch, setsuccessLaunch] = useState(false);
  const [successLand, setsuccessLand] = useState(false);

  const createDiv = (row) => {
    return (
      <TableRow key={row.flight_number}>
        <TableCell>{row.flight_number}</TableCell>
        <TableCell>
          <img
            style={{ height: 80 }}
            src={row.links.mission_patch_small}
            alt="NO"
          ></img>
        </TableCell>
        <TableCell>{row.launch_year}</TableCell>
        <TableCell>
          <a href={row.links.wikipedia} style={{ textDecoration: "none" }}>
            {row.mission_name}
          </a>
        </TableCell>
        <TableCell>{row.rocket.rocket_name}</TableCell>

        <TableCell>{row.details}</TableCell>
      </TableRow>
    );
  };
  useEffect(() => {
    // console.log(url);
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setdata(data);
      });
  }, [url]);

  const formControlYear = (e) => {
    e.preventDefault();
    // console.log(launchYr);

    if (launchYr) {
      // console.log(launchYr);

      seturl(
        `https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${launchYr}`
      );
    } else {
      seturl("https://api.spaceXdata.com/v3/launches?limit=100");
    }
  };

  useEffect(() => {
    if (successLand) {
      // setsuccessLaunch(false);
      seturl(
        "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true"
      );
    } else if (successLaunch) {
      seturl(
        "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true"
      );
    } else if (!successLaunch && !successLand) {
      seturl("https://api.spacexdata.com/v3/launches?limit=100");
    }
  }, [successLaunch, successLand]);

  return (
    <div className="App">
      <div className="top">
        <form
          onSubmit={formControlYear}
          style={{
            marginRight: "10px",
          }}
        >
          <TextField
            className="year"
            id="outlined-basic"
            label="Launch Year"
            variant="outlined"
            onChange={(e) => {
              setlaunchYr(e.target.value);
            }}
          />
        </form>
        <ToggleButton
          style={{
            marginRight: "10px",
            backgroundColor: "white",
            height: "60px",
            fontWeight: "bolder",
          }}
          value="Success Land"
          selected={successLand}
          onChange={() => {
            setsuccessLand(!successLand);
          }}
        >
          {" "}
          Success Land{" "}
        </ToggleButton>
        <ToggleButton
          style={{
            backgroundColor: "white",
            height: "60px",
            textAlign: "center",
            fontWeight: "bolder",
          }}
          value="Success Launch"
          selected={successLaunch}
          onChange={() => {
            setsuccessLaunch(!successLaunch);
          }}
        >
          Success Launch
        </ToggleButton>
      </div>
      <div className="mobile">
        <MobileView data={data} setdata={setdata} />
      </div>

      <div className="desktop">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#042570" }}>
              <TableCell style={{ color: "white" }}>FLIGHT NO</TableCell>
              <TableCell style={{ color: "white" }}>MISSION PATCH</TableCell>
              <TableCell style={{ color: "white" }}>LAUNCH YEAR</TableCell>
              <TableCell style={{ color: "white" }}>MISSION NAME</TableCell>
              <TableCell style={{ color: "white" }}>ROCKET NAME</TableCell>
              <TableCell style={{ color: "white" }}>MISSION DETAILS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="rowDetails">
            {data.map(createDiv)}
            {!data.length &&
              setdata([
                {
                  flight_number: "no items",
                  launch_year: "no items",
                  links: { mission_patch_small: "no items" },
                  rocket: { rocket_name: "no items" },
                  launch_date_utc: "no items",
                },
              ])}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
