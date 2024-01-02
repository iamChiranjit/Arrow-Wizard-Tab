import { Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PopUpSuccess from "../PopUp/PopUpSuccess";
import axios from "axios";

const Personal = ({setPersonalValid}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      contact: "",
      alternativeContact: "",
      headingPersonal: "Personal Information",
      FName: "First Name: ",
      LName: "Last Name: ",
      Contact: "Contact: ",
      AlternativeContact: "AlternativeContact: ",
    },
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const onSubmit = (data) => {
    console.log(data);
    setPersonalValid(true)
    handleSnackbarOpen("Save successful!");
    const {fName, lName, contact, alternativeContact, headingPersonal, FName, LName, Contact, AlternativeContact} = data;
    let payload = {fName, lName, contact, alternativeContact, headingPersonal, FName, LName, Contact, AlternativeContact};
    axios.post("http://localhost:3000/data", payload)
      .then(() => {
        console.log("Got the Data");
      })
      .catch(() => {
        console.log("Something Wrong");
      });
  };
  return (
    <div id="homepage">
      <Grid>
        <Paper
          elevation={5}
          style={{
            height: "63vh",
            width: "75%",
            margin: "15px auto",
            padding: "20px 40px 30px 40px",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold", margin: "0px 0px 0px 0px" }}>Personal Information</Typography>
          <form
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormControl>
              <TextField
                id="fName"
                label="First Name"
                variant="standard"
                required
                {...register("fName", {
                  required: "Please enter your first name",
                })}
                helperText={errors.fName ? errors.fName.message : ""}
                error={!!errors.fName}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="lName"
                label="Last Name"
                variant="standard"
                required
                {...register("lName", {
                  required: "Please enter your last name",
                })}
                helperText={errors.lName? errors.lName.message : ""}
                error={!!errors.lName}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="contact"
                label="Contact No."
                type="number"
                variant="standard"
                required
                {...register("contact", {
                  required: "Please enter your contact number",
                  validate: (value)=> value.length === 10 || "Please enter a valid contact number"
                })}
                helperText={errors.contact? errors.contact.message : ""}
                error={!!errors.contact}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="alternativeContact"
                label="Alternate Contact No."
                type="number"
                variant="standard"
                required
                {...register("alternativeContact", {
                  required: "Please enter your alternate number",
                  validate: (value) => value.length === 10 || "Please enter a valid contact number"
                })}
                helperText={errors.alternativeContact? errors.alternativeContact.message : ""}
                error={!!errors.alternativeContact}
              />
            </FormControl>
            <Grid style={{display: "flex", justifyContent: "center"}}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="small"
                style={{
                  marginTop: "20px",
                  width: "30px",
                }}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <PopUpSuccess
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default Personal;