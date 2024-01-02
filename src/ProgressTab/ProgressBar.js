import React, { useState } from "react";
import "./progressbar.css";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button, Typography } from "@mui/material";
import Account from "../Account/Account";
import Personal from "../Personal/Personal";
import Payment from "../Payment/Payment";
import Finish from "../Finish/Finish";
import Succes from "../Success/Succes";
import { Link } from "react-router-dom";


const ProgressBar = () => {
  let [firstTab, setFirstTab] = useState(true);
  let [secondTab, setSecondTab] = useState(false);
  let [thirdTab, setThirdTab] = useState(false);
  let [fourthTab, setFourthTab] = useState(false);
  let [bgcolor1, setBgcolor1] = useState("blue");
  let [bgcolor2, setBgcolor2] = useState("white");
  let [bgcolor3, setBgcolor3] = useState("white");
  let [bgcolor4, setBgcolor4] = useState("white");
  let [bcolor1, setBcolor1] = useState("darkblue");
  let [bcolor2, setBcolor2] = useState("gray");
  let [bcolor3, setBcolor3] = useState("gray");
  let [bcolor4, setBcolor4] = useState("gray");

  const [accountValid, setAccountValid] = useState(false);
  const [personalValid, setPersonalValid] = useState(false);
  const [paymentValid, setPaymentValid] = useState(false);

  const [isChecked, setChecked] = useState(false);
  // console.log(checkSubmit)

  const click1 = () => {
    // setFirstTab(true);
    if (bgcolor1 === "green" && bgcolor2 === "blue") {
      setBgcolor1("blue");
      setBgcolor2("white");
      setBcolor1("darkblue");
      setBcolor2("gray");
    }
  };
  const click2 = () => {
    if (firstTab && accountValid) {
      if (bgcolor1 === "blue") {
        setSecondTab(true);
        setBgcolor1("green");
        setBgcolor2("blue");
        setBcolor1("darkgreen");
        setBcolor2("darkblue");
      }
      if (bgcolor2 === "green" && bgcolor3 === "blue") {
        setBgcolor2("blue");
        setBgcolor3("white");
        setBcolor2("darkblue");
        setBcolor3("gray");
      }
    }
  };
  const click3 = () => {
    if (secondTab && personalValid) {
      if (bgcolor2 === "blue") {
        setThirdTab(true);
        setBgcolor2("green");
        setBgcolor3("blue");
        setBcolor2("darkgreen");
        setBcolor3("darkblue");
      }
      if (bgcolor3 === "green" && bgcolor4 === "blue") {
        setBgcolor3("blue");
        setBgcolor4("white");
        setBcolor3("darkblue");
        setBcolor4("gray");
      }
    }
  };
  const click4 = () => {
    if (thirdTab && paymentValid) {
      if (bgcolor3 === "blue") {
        setFourthTab(true);
        setBgcolor3("green");
        setBgcolor4("blue");
        setBcolor3("darkgreen");
        setBcolor4("darkblue");
      }
      if (bgcolor4 === "blue") {
        setFourthTab(true);
        setBgcolor4("green");
        setBcolor4("darkgreen");
      }
    }
  };
  const nextStep = () => {
    if (bgcolor1 === "blue") {
      click2();
    } else if (bgcolor2 === "blue") {
      click3();
    } else if (bgcolor3 === "blue") {
      click4();
    }
  };
  const prevStep = () => {
    if (bgcolor1 === "green" && bgcolor2 === "blue") {
      click1();
    } else if (bgcolor2 === "green" && bgcolor3 === "blue") {
      click2();
    } else if (bgcolor3 === "green" && bgcolor4 === "blue") {
      click3();
    }
  };
  const submit = () => {
    if (bgcolor3 === "green" && bgcolor4 === "blue") {
      click4();
    }
  };

  return (
    <div id="background">
      <div id="wrapper">
        <Typography
          variant="h4"
          textAlign="center"
          style={{ fontWeight: "bold" }}
        >
          Sign Up Your User Account
        </Typography>
        <Typography variant="body2" textAlign="center">
          Fill all form field and save to go to next step
        </Typography>
        <div id="homePage">
          <div id="adjust">
            <div className="firstOuter" style={{ backgroundColor: bcolor1 }}>
              <div
                className="firstInner"
                onClick={click1}
                style={{
                  backgroundColor: bgcolor1,
                  color: bgcolor1 === "blue" ? "white" : "white",
                }}
              >
                {bgcolor1 === "green" ? (
                  <TaskAltIcon />
                ) : (
                  <PendingOutlinedIcon />
                )}{" "}
                &nbsp; Account
              </div>
            </div>
            <div className="secondOuter" style={{ backgroundColor: bcolor2 }}>
              <div
                className="secondInner"
                onClick={click2}
                style={{
                  backgroundColor: bgcolor2,
                  color: bgcolor1 === "green" ? "white" : "",
                }}
              >
                {bgcolor2 === "green" ? (
                  <TaskAltIcon />
                ) : (
                  <PendingOutlinedIcon />
                )}{" "}
                &nbsp; Personal
              </div>
            </div>
            <div className="thirdOuter" style={{ backgroundColor: bcolor3 }}>
              <div
                className="thirdInner"
                onClick={click3}
                style={{
                  backgroundColor: bgcolor3,
                  color: bgcolor2 === "green" ? "white" : "",
                }}
              >
                {bgcolor3 === "green" ? (
                  <TaskAltIcon />
                ) : (
                  <PendingOutlinedIcon />
                )}{" "}
                &nbsp; Payment
              </div>
            </div>
            <div className="fourthOuter" style={{ backgroundColor: bcolor4 }}>
              <div
                className="fourthInner"
                onClick={click4}
                style={{
                  backgroundColor: bgcolor4,
                  color: bgcolor3 === "green" ? "white" : "",
                }}
              >
                {bgcolor4 === "green" ? (
                  <TaskAltIcon />
                ) : (
                  <PendingOutlinedIcon />
                )}{" "}
                &nbsp; Finish
              </div>
            </div>
          </div>
        </div>
        <div>{bgcolor1 === "blue" && <Account setAccountValid={setAccountValid} />}</div>
        <div>{secondTab && bgcolor2 === "blue" && <Personal setPersonalValid={setPersonalValid} />}</div>
        <div>{thirdTab && bgcolor3 === "blue" && <Payment setPaymentValid={setPaymentValid}/>}</div>
        <div>{fourthTab && bgcolor4 === "blue" && <Finish isChecked={isChecked} setChecked={setChecked}/>}</div>
        <div>{fourthTab && bgcolor4 === "green" && <Succes />}</div>
        <div className="button">
          {bgcolor4 !== "green" && (
            <Button
              variant="contained"
              size="medium"
              color="warning"
              onClick={prevStep}
              disabled={bgcolor1 === "blue"}
            >
              Previous
            </Button>
          )}
          {(bgcolor1 === "blue" ||
            bgcolor2 === "blue" ||
            bgcolor3 === "blue") && (
            <Button
              variant="contained"
              size="medium"
              onClick={nextStep}
              disabled={(firstTab && !accountValid) || (secondTab && !personalValid) || (thirdTab && !paymentValid)}
            >
              Next Step
            </Button>
          )}
          {bgcolor4 === "blue" && (
            <Button
              variant="contained"
              size="medium"
              onClick={submit}
              disabled={!isChecked}
            >
              Submit
            </Button>
          )}
          {bgcolor4 === "green" && (
            <Button
              color="primary"
              variant="contained"
            >
              <Link to={`/see-my-data`} style={{textDecoration:"none", color:"white"}}>Click here to see your form details</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;