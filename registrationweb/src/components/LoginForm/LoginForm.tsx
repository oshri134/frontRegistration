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

    &:disabled {
      background-color: rgb(179, 179, 217);
      border-color: rgb(179, 179, 217);
      color: white;
    }
  }
`;
const StyledAccountPrompt = styled(Typography)`
  && {
    font-family: "Lato";
    font-size: 14px;
    font-weight: 600;
    line-height: 16.8px;
    color: #828282;
    margin-bottom: 10px;
  }
`;
const StyledDivider = styled(Divider)`
  && {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    color: #828282;
    font-size: 14px;
    justify-content: center;

    &::before,
    &::after {
      content: "";
      height: 0.4px;
      background: #e6e9fa;

      width: 93.5px;
    }
  }
`;
const SocialButton = styled(Button)`
  && {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    margin: 0 0.5rem;
    text-transform: none;
    font-size: 14px;
    border: 1px solid #3949ab;
    color: #3949ab;

    &:hover {
      background-color: rgba(57, 73, 171, 0.1);
    }

    .MuiButton-startIcon {
      margin-right: 8px;
    }
    img {
      width: 24px;
      height: 24px;
    }
    &.Mui-disabled {
      background-color: #b0b7db;
      color: #ffffff;
      border: 1px solid #b0b7db;
    }
  }
`;
const SocialLogin = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
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

        <StyledDivider>Or</StyledDivider>

        <SocialLogin>
          <SocialButton
            variant="outlined"
            startIcon={<img src={google} alt="Google" />}
          >
            Google
          </SocialButton>
          <SocialButton
            variant="outlined"
            startIcon={<img src={facebook} alt="Facebook" />}
          >
            Facebook
          </SocialButton>
        </SocialLogin>
      </form>

      <StyledAccountPrompt>Have no account yet?</StyledAccountPrompt>
      <StyledButton onClick={() => setActiveForm("register")}>
        Register
      </StyledButton>
    </StyledLoginForm>
  );
};

export default LoginForm;
