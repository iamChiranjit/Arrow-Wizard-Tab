import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PopUpSuccess from "../PopUp/PopUpSuccess";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import jsonData from '../Backend/db.json';
const Account = ({ setAccountValid }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      headingAccount: "Account Information",
      Email: "Email: ",
      UserName: "UserName: ",
      Password: "Password: ",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCPassword = () => {
    setShowCPassword(!showCPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  };

  const [json, setJson] = useState();
  useEffect(() => {
    setJson(jsonData);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    const { email, userName, password, headingAccount, Email, UserName, Password } = data;
    const isUserNameTaken = json.data.some((user) => user.userName === userName);
    const isPasswordTaken = json.data.some((pass) => pass.password === password);
    if (!isUserNameTaken && !isPasswordTaken) {
      setAccountValid(true);
      handleSnackbarOpen("Save successful!", "success");
      let payload = { email, userName, password, headingAccount, Email, UserName, Password };
      axios.post("http://localhost:3000/data", payload)
        .then(() => {
          console.log("Got the Data");
        })
        .catch(() => {
          console.log("Something Wrong");
        });
    }else{
      if(isUserNameTaken){
        handleSnackbarOpen("Username is not available. Please choose another one", "error");
      }
      else if(isPasswordTaken){
        handleSnackbarOpen("Password is not available. Please choose another one", "error");
      }
    }

  };

  return (
    <div>
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
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "0px 0px 0px 0px" }}
          >
            Account Information
          </Typography>
          <form
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormControl>
              <TextField
                id="email"
                label="Email Id"
                variant="standard"
                required
                {...register("email", {
                  required: "Please fill email",
                  pattern: {
                    value:
                      /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    message: "Please enter valid email",
                  },
                })}
                helperText={errors.email ? errors.email.message : ""}
                error={!!errors.email}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="userName"
                label="UserName"
                variant="standard"
                required
                {...register("userName", {
                  required: "Please fill your UserName",
                  minLength: {
                    value: 8,
                    message: "Username must be at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must not be exceed 20 characters",
                  },
                  validate: (value) =>
                    !value.includes(" ") ||
                    "Username should not contain spaces",
                })}
                helperText={errors.userName ? errors.userName.message : ""}
                error={!!errors.userName}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                required
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message:
                      "Password must contain 8-12 characters with One Upper, Lower, Digit and Special character",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Password must contain 8-12 characters with One Upper, Lower, Digit and Special character",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain 8-12 characters with One Upper, Lower, Digit and Special character",
                  }
                })}
                helperText={errors.password ? errors.password.message : ""}
                error={!!errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type={showCPassword ? "text" : "password"}
                variant="standard"
                required
                {...register("confirmPassword", {
                  required: "Please enter your confirm password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                error={!!errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowCPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
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
        severity={snackbSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default Account;
