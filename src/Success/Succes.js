import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Tick from "./Tick.png";

const Succes = () => {
  return (
    <div>
      <Grid>
        <Paper
          elevation={5}
          style={{
            height: "60vh",
            width: "75%",
            margin: "15px auto",
            padding: "20px 40px 30px 40px",
          }}
        >
          <Typography
            variant="h5"
            style={{
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Success !
          </Typography>
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="All Right"
              src={Tick}
              style={{
                width: "15%",
                height: "auto",
                margin: "60px 0px 60px 0px ",
              }}
            />
          </Grid>
          <Typography
            variant="h6"
            style={{textAlign: "center", color: "gray"}}
          >
            You Have Successfully <br /> Signed Up
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Succes;
