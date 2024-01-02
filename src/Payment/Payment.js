import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreditCard from "./CreditCard.jpg";
import Paypal from "./Paypal.jpg";
import PopUpSuccess from "../PopUp/PopUpSuccess";
import axios from "axios";

const Payment = ({setPaymentValid}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      cardNo: "",
      cvv: "",
      month: "",
      year: "",
      headingPayment: "Payment Information",
      nameS: "CardHolderName: ",
      cardNoS: "Card No: ", 
      cvvS: "CVV: ",
      monthS: "Month: ",
      yearS: "Year: ",
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
    setPaymentValid(true);
    handleSnackbarOpen("Save successful!");
    const {name, cardNo, cvv, month, year, headingPayment, nameS, cardNoS, cvvS, monthS, yearS} = data;
    let payload = {name, cardNo, cvv, month, year, headingPayment, nameS, cardNoS, cvvS, monthS, yearS};
    axios.post("http://localhost:3000/data", payload)
      .then(() => {
        console.log("Got the Data");
      })
      .catch(() => {
        console.log("Something Wrong");
      });
  };
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  const years = [
    { label: "2023", value: 1 },
    { label: "2024", value: 2 },
    { label: "2025", value: 3 },
    { label: "2026", value: 4 },
    { label: "2027", value: 5 },
    { label: "2028", value: 6 },
    { label: "2029", value: 7 },
    { label: "2030", value: 8 },
  ];
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleChange = (event, value) => {
    setSelectedMonth(value);
    setSelectedYear(value);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <div id="homepage">
      <Grid container>
        <Paper
          elevation={5}
          style={{
            height: "70vh",
            width: "75%",
            margin: "15px auto",
            padding: "20px 40px 30px 40px",
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "0px 0px 10px 0px" }}
          >
            Payment Information
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <img
                src={CreditCard}
                alt="Credit Card"
                style={{
                  width: "70%",
                  height: "auto",
                  cursor: "pointer",
                  boxShadow:
                    selectedImage === "creditCard"
                      ? "2px 2px 5px black"
                      : "1px 1px 3px gray",
                }}
                onClick={() => handleImageClick("creditCard")}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={Paypal}
                alt="Paypal"
                style={{
                  width: "70%",
                  height: "90px",
                  cursor: "pointer",
                  boxShadow:
                    selectedImage === "paypal"
                      ? "2px 2px 5px black"
                      : "1px 1px 3px gray",
                }}
                onClick={() => handleImageClick("paypal")}
              />
            </Grid>
          </Grid>
          <form
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormControl>
              <TextField
                id="name"
                label="Card Holder Name"
                variant="standard"
                fullWidth
                required
                {...register("name", {
                  required: "Please enter your name",
                })}
                // onBlur={handleSubmit(onSubmit)}
                helperText={errors.name ? errors.name.message : ""}
                error={!!errors.name}
              />
            </FormControl>

            <Grid container spacing={3}>
              <Grid item xs={9} style={{ display: "flex" }}>
                <TextField
                  id="cardNo"
                  label="Card Number"
                  variant="standard"
                  type="number"
                  fullWidth
                  required
                  {...register("cardNo", {
                    required: "Please enter card number",
                    validate: (value) =>
                      value.length === 12 || "Invalid card number",
                  })}
                  // onBlur={handleSubmit(onSubmit)}
                  helperText={errors.cardNo ? errors.cardNo.message : ""}
                  error={!!errors.cardNo}
                />
              </Grid>
              <Grid item xs={3} style={{ display: "flex" }}>
                <TextField
                  id="cvv"
                  label="CVV"
                  type="password"
                  variant="standard"
                  fullWidth
                  required
                  {...register("cvv", {
                    required: "Please enter your cvv",
                    validate: (value) => value.length === 3 || "Invalid cvv",
                  })}
                  // onBlur={handleSubmit(onSubmit)}
                  helperText={errors.cvv ? errors.cvv.message : ""}
                  error={!!errors.cvv}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ alignItems: "flex-end" }}>
              <Grid item xs={2.5}>
                <Typography variant="body1">Expiry Date</Typography>
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  //   sx={{ width: "120px" }}
                  fullWidth
                  options={months}
                  getOptionLabel={(option) => option.label}
                  onChange={handleChange}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="month"
                      label="Month"
                      variant="standard"
                      required
                      {...register("month", {
                        required: "Please select month",
                      })}
                      helperText={
                        !selectedMonth && errors.month
                          ? errors.month.message
                          : ""
                      }
                      error={!!errors.month && !selectedMonth}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  //   sx={{ width: "80px" }}
                  fullWidth
                  options={years}
                  getOptionLabel={(option) => option.label}
                  onChange={handleChange}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Year"
                      variant="standard"
                      required
                      {...register("year", { required: "Please select year" })}
                      helperText={!selectedYear && errors.year? errors.year.message: ""}
                      error={!!errors.year && !selectedYear}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid style={{ display: "flex", justifyContent: "center" }}>
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

export default Payment;
