import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BASEURL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserDetailCard = () => {
  const [token, setToken] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ username: "", password: "" });
  const getUserCredentialsFromStorage = async () => {
    try {
      const userData = await AsyncStorage.multiGet(["username", "password"]);
      if (userData !== null) {
        // Both username and password retrieved successfully
        const username =
          userData.find((item) => item[0] === "username")?.[1] ?? "";
        const password =
          userData.find((item) => item[0] === "password")?.[1] ?? "";
        setData({ username, password });
      } else {
        // Username or password is not stored
        console.log("No username or password found in storage");
      }
    } catch (error) {
      // Error retrieving data
      console.error("Error retrieving user credentials:", error);
    }
  };
  useEffect(() => {
    getUserCredentialsFromStorage();
  }, []);
  useEffect(() => {
    axios
      .get(`${BASEURL}/api/v1/users/my_patients/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  useEffect(() => {
    if (data) {
      axios
        .post(`${BASEURL}/api-auth/auth/login/`, {
          username: data.username,
          password: data.password,
        })
        .then(function (response) {
          setToken(response.data["access"]);
        })
        .catch(function (error) {
          console.log(error, "login");
        });
    }
  }, [data]);
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Patient Name</Text>
        <Text style={styles.description}>Willson Somasiri</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Age</Text>
        <Text style={styles.description}>65</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Emergency Number</Text>
        <Text style={styles.description}>071523248</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.description}>Colombo,Homagama</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.description}>Colombo,Homagama</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Hospital</Text>
        <Text style={styles.description}>General Hospital Colombo</Text>
      </View>
      <Text>{data.username}</Text>
      <Text>{data.password}</Text>
      <Text>{token}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    gap: 4,
    marginTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    width: "50%",
  },
  description: {
    color: "#ff1",
    fontSize: 18,
    fontWeight: "500",
    flexWrap: "wrap",
    width: 200,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
