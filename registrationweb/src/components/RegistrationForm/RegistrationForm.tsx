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
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import facebook from "../../assets/facebook.svg";
import google from "../../assets/google.svg";
import { toast } from "react-toastify";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const StyledSignupForm = styled(Box)`
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

const SocialSignup = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
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

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    width: 358px;
    font-family: "lato";
    height: 40px;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused {
      box-shadow: 0 0 0 3px rgba(87, 105, 212, 0.3);
    }
    &.Mui-focused fieldset {
      border-color: #5769d4;
    }
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
    font-family: "lato";
    weight: 400;

    &:hover {
      background-color: #27368f;
    }
    &.Mui-disabled {
      background-color: #b0b7db;
      color: #ffffff;
      border: 1px solid #b0b7db;
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
const SocialLogin = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
`;
interface RegistrationData {
  username: string;
  email: string;
  password: string;
}
interface RegistrationFormProps {
  setActiveForm: React.Dispatch<React.SetStateAction<string>>;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setActiveForm,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const registrationData: RegistrationData = { username, email, password };

    try {
      const registrationResponse = await fetch(
        "https://registration-test-1-gkgcayd0d5d3exbp.israelcentral-01.azurewebsites.net/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const responseData = await registrationResponse.json();

      if (registrationResponse.ok) {
        const welcomeResponse = await fetch(
          "https://gptregistration-g3gmc6d2gyfkfrfs.israelcentral-01.azurewebsites.net/get-signup-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const welcomeData = await welcomeResponse.json();
        toast.success(welcomeData.message || "register successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setActiveForm("login");
      } else {
        toast.error(
          responseData.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  return (
    <StyledSignupForm>
      <form onSubmit={handleRegister}>
        <FormGroup>
          <StyledTextField
            fullWidth
            id="username"
            placeholder="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
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
        <FormGroup>
          <StyledTextField
            fullWidth
            id="confirm-password"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? (
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
        <StyledButton type="submit" disabled={!isFormValid}>
          Sign up
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
      <StyledAccountPrompt>Already have an account?</StyledAccountPrompt>
      <StyledButton onClick={() => setActiveForm("login")}>Log in</StyledButton>
    </StyledSignupForm>
  );
};

export default RegistrationForm;
