import React from "react";
import RegistrationForm from "../../components/RegistrationForm";
import LoginForm from "../../components/LoginForm";
import { Paper, Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import mainimage from "../../assets/main-image.png";
import Logo from "../../assets/Logo.png";

const StyledMain = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4e54c8;
  padding: 16px;
`;

const StyledBox = styled(Box)`
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  background-color: #3949ab;
  box-shadow: 0px 2px 30px 0px #0000004d;

  width: 1218px;
  height: 743px;
`;

const LeftSection = styled.div`
  flex: 1;
  width: 732px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  position: relative;
`;

const RightSection = styled.div`
  flex: 1;
  width: 486px;
  display: flex;
  flex-direction: column;

  background-color: white;
  justify-content: center;
  align-items: center;
`;

const StyledLogoContaine = styled.div`
  position: absolute;
  top: 41px;
  left: 40px;

  justify-content: center;
`;
const StyledLogo = styled.img`
  width: 49.23px;
  height: 49px;
`;

const StyleImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;
const StyledImage = styled.img`
  width: 357px;
  height: 357px;
  gap: 0px;
  opacity: 0px;
  position: relative;
  transform: scaleX(-1);
  margin-bottom: -1px;
`;
const CircleContainer = styled.div`
  left: 27px;
  bottom: 72px;
  width: 277.81px;
  height: 277.81px;
  border-radius: 50%;
  background-color: #00227b;
  position: absolute;
  z-index: 0;
  opacity: 0.6;
`;
const StyledTypography = styled.h4`
  font-family: "Lato", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 48px;
  text-align: center;
  margin-top: -28px;

  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
  margin-top: -8px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
const StyledTitle = styled(Typography)`
  && {
    font-family: "lato";
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    color: #3949ab;
    margin-bottom: 63px;
  }
`;
const HomePage: React.FC = () => {
  const [activeForm, setActiveForm] = React.useState("login");
  return (
    <StyledMain>
      <StyledBox>
        <LeftSection>
          <StyledLogoContaine>
            <StyledLogo src={Logo} alt="logo" />
          </StyledLogoContaine>
          <StyleImageContainer>
            <CircleContainer />
            <StyledImage src={mainimage} alt="Welcome" />
          </StyleImageContainer>
          <StyledTypography>Welcome aboard my friend</StyledTypography>
          <SubText>just a couple of clicks and we start</SubText>
        </LeftSection>
        <RightSection>
          <StyledTitle variant="h4">
            {activeForm === "login" ? "Log in" : "Sign up"}
          </StyledTitle>

          <FormContainer>
            {activeForm === "login" ? (
              <LoginForm setActiveForm={setActiveForm} />
            ) : (
              <RegistrationForm setActiveForm={setActiveForm} />
            )}
          </FormContainer>
        </RightSection>
      </StyledBox>
    </StyledMain>
  );
};

export default HomePage;
