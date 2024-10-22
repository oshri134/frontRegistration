// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  formContainer: {
    width: 300,
    alignItems: "center",
  },

  inputWrapper: {
    width: "100%",
    height: 40,
    marginBottom: 16,
  },

  inputBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    height: "100%",
  },

  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: "100%",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 8,
  },

  inputIcon: {
    marginRight: 8,
    width: 20,
    height: 20,
  },

  visibilityIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 12,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    color: "#3949ab",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 33,
  },

  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#3949AB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonPressed: {
    backgroundColor: "#27368F",
  },

  loginButtonDisabled: {
    backgroundColor: "#3949AB",
    opacity: 0.5,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 14,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },

  dividerLine: {
    width: 93,
    height: 1,
    backgroundColor: "#E6E9FA",
    marginHorizontal: 4,
  },

  dividerText: {
    color: "#828282",
    fontSize: 14,
  },

  socialButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  socialButton: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3949ab",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },

  socialButtonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  socialButtonText: {
    color: "#3949ab",
    fontSize: 14,
  },

  registerContainer: {
    width: "100%",
    alignItems: "center",
  },

  registerPrompt: {
    color: "#7b7b7b",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },

  registerButton: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3949ab",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  registerButtonText: {
    color: "#3949ab",
    fontSize: 14,
  },
});

export default styles;
