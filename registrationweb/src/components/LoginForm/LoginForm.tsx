import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import styled from "styled-components";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import facebook from "../../assets/facebook.svg";
import google from "../../assets/google.svg";

const StyledLoginForm = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledTitle = styled(Typography)`
  && {
    font-family: "lato";
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    color: #3949ab;
    margin-bottom: 24px;
  }
`;

const FormGroup = styled(Box)`
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
`;

const FormActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const SocialLogin = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    width: 358px;
    font-family: "lato";
    height: 40px;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
  }
`;

const StyledButton = styled(Button)`
  && {
    width: 358px;
    height: 40px;
    border-radius: 40px;
    border: 1px solid #3949ab;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 8px;
    margin-top: 8px;
    text-transform: none;
    font-size: 14px;
    backdrop-filter: blur(24px);
    background-color: #3949ab;
    color: white;
    &:hover {
      background-color: #27368f;
    }
  }
`;
interface LoginFormProps {
  setActiveForm: React.Dispatch<React.SetStateAction<string>>;
}
const LoginForm: React.FC<LoginFormProps> = ({ setActiveForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email !== "" && password !== "";

  const handleLogin = async () => {
    try {
      const loginData = { email, password };

      const loginResponse = await fetch(
        "https://registration-test-1-gkgcayd0d5d3exbp.israelcentral-01.azurewebsites.net/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (loginResponse.ok) {
        const welcomeResponse = await fetch(
          "https://gptregistration-g3gmc6d2gyfkfrfs.israelcentral-01.azurewebsites.net/get-login-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const welcomeData = await welcomeResponse.json();
        toast.success(welcomeData.message || "Login successful!");
      } else {
        const errorData = await loginResponse.json();
        toast.error(errorData.error || "Login failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <StyledLoginForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <FormGroup>
          <StyledTextField
            fullWidth
            id="email"
            placeholder="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
        <FormGroup>
          <StyledTextField
            fullWidth
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
        <FormActions>
          <Link href="#" color="primary">
            Forgot password?
          </Link>
        </FormActions>
        <StyledButton type="submit" disabled={!isFormValid}>
          Log in
        </StyledButton>
      </form>
    </StyledLoginForm>
  );
};

export default LoginForm;
