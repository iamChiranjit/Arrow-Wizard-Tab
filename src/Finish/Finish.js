import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Finish = ({isChecked, setChecked}) => {
  // const [isChecked, setChecked] = useState(false);
  // console.log("Checkbox", isChecked)

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

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
            style={{ fontWeight: "bold", margin: "0px 0px 5px 0px" }}
          >
            Final Submit
          </Typography>
          <Typography variant="body1">
            Thank you for completing the signup process with our bank! You have
            successfully filled out the Account Information, Personal
            Information, and Payment Information tabs.
          </Typography>
          <Typography variant="body1" style={{fontWeight: "bold"}}>
            Please review the information below before submitting. Once you
            submit, the form will become non-editable.
          </Typography>
          <FormControlLabel
            style={{color: "red"}}
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                color="warning"
                required
              />
            }
            label="I confirm that the information provided is accurate."
          />
          <Typography variant="body1">
            By checking the box above, you acknowledge that the information you
            have provided is accurate and complete. Any discrepancies may affect
            your account setup process.
          </Typography>
          <Typography variant="body1" style={{color: "red"}}>
            Click the "Submit" button below to complete the signup process.
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Finish;
