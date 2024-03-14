import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { BASEURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogLevel, OneSignal } from "react-native-onesignal";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    axios
      .post(`${BASEURL}/api-auth/auth/login/`, {
        username,
        password,
      })
      .then(async function (response) {
        if (response.status === 200) {
          try {
            setIsLogin(true);
            OneSignal.login(username);
            await AsyncStorage.setItem("token", response.data.token);
            await AsyncStorage.setItem("username", username);
            console.log("Login successful");
            console.log(response);
          } catch (error) {
            console.error("Error storing data:", error);
          }
        } else {
          console.log("Unexpected status code:", response.status);
        }
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <View
            style={{
              backgroundColor: "blue",
              padding: 10,
              width: "100%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                display: "flex",
                direction: "inherit",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isLogin && (
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            width: "100%",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={"users/user"}>
            <Text style={styles.buttonText}>Patient Care</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginForm;
