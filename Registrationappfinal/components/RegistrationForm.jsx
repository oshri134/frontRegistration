import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
const googleIcon = require("../assets/google.png");
const facebookIcon = require("../assets/facebook.png");
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

export default function RegisterForm({ onLoginPress }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    email.trim() !== "" &&
    isValidEmail(email) &&
    password.trim() !== "" &&
    password === confirmPassword &&
    username.trim() !== "";

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const registrationData = {
        username,
        email,
        password,
      };

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
        Toast.show({
          type: "success",
          text1: "Success",
          text2: welcomeData.message || "Registration successful!",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        onLoginPress();
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: responseData.error || "Registration failed. Please try again.",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred. Please try again later.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <View style={styles.inputBorder}>
            <View style={styles.inputContent}>
              <Icon
                name="person-outline"
                size={20}
                color="#828282"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholderTextColor="#828282"
              />
            </View>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputBorder}>
            <View style={styles.inputContent}>
              <Icon
                name="mail-outline"
                size={20}
                color="#828282"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#828282"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputBorder}>
            <View style={styles.inputContent}>
              <Icon
                name="lock-outline"
                size={20}
                color="#828282"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#828282"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.visibilityIcon}
              >
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputBorder}>
            <View style={styles.inputContent}>
              <Icon
                name="lock-outline"
                size={20}
                color="#828282"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                placeholderTextColor="#828282"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.visibilityIcon}
              >
                <Icon
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            !isFormValid && styles.loginButtonDisabled,
            pressed && isFormValid && styles.loginButtonPressed,
          ]}
          disabled={!isFormValid || isLoading}
          onPress={handleRegister}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>Register</Text>
          )}
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}> Or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={googleIcon} style={styles.socialButtonIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={facebookIcon} style={styles.socialButtonIcon} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerPrompt}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onLoginPress}
          >
            <Text style={styles.registerButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
