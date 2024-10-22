import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegistrationForm";
import styles from "./styles";
import toplogo from "../assets/Logo.png";

export default function HomeScreen() {
  const [activeForm, setActiveForm] = useState("login");

  const toggleForm = () => {
    setActiveForm(activeForm === "login" ? "register" : "login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image source={toplogo} style={styles.logo} resizeMode="contain" />
          </View>


          <Text style={styles.loginText}>
            {activeForm === "login" ? "Log in" : "Register"}
          </Text>

          {activeForm === "login" ? (
            <LoginForm onRegisterPress={toggleForm} />
          ) : (
            <RegisterForm onLoginPress={toggleForm} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
