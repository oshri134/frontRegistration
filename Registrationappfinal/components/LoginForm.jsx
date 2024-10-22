// LoginForm.js
import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image,
 Pressable,
} from "react-native";
import Toast from 'react-native-toast-message';
import styles from "./styles";
const googleIcon = require("../assets/google.png");
const facebookIcon = require("../assets/facebook.png");
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LoginForm({ onRegisterPress }) {
 const [showPassword, setShowPassword] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const isValidEmail = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
 };

 const isFormValid =
   email.trim() !== "" && isValidEmail(email) && password.trim() !== "";

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
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: welcomeData.message || 'Login successful!',
         position: 'bottom',
         visibilityTime: 4000,
         autoHide: true,
         topOffset: 30,
         bottomOffset: 40,
       });
     } else {
       const errorData = await loginResponse.json();
       Toast.show({
         type: 'error',
         text1: 'Error',
         text2: errorData.error || 'Login failed.',
         position: 'bottom',
         visibilityTime: 4000,
         autoHide: true,
         topOffset: 30,
         bottomOffset: 40,
       });
     }
   } catch (error) {
     Toast.show({
       type: 'error',
       text1: 'Error',
       text2: 'An error occurred. Please try again later.',
       position: 'bottom',
       visibilityTime: 4000,
       autoHide: true,
       topOffset: 30,
       bottomOffset: 40,
     });
     console.error("Login error:", error);
   }
 };

 return (
   <View style={styles.container}>
     <View style={styles.formContainer}>
       {/* Email Input */}
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

       {/* Password Input */}
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

       <Text style={styles.forgotPassword}>Forgot password?</Text>

       <Pressable
         style={({ pressed }) => [
           styles.loginButton,
           !isFormValid && styles.loginButtonDisabled,
           pressed && isFormValid && styles.loginButtonPressed,
         ]}
         disabled={!isFormValid}
         onPress={handleLogin}
       >
         <Text style={styles.loginButtonText}>Log in</Text>
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
         <Text style={styles.registerPrompt}>Have no account yet?</Text>
         <TouchableOpacity 
           style={styles.registerButton}
           onPress={onRegisterPress}
         >
           <Text style={styles.registerButtonText}>Register</Text>
         </TouchableOpacity>
       </View>
     </View>
   </View>
 );
}