import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserDetailCard } from "./UserDetailCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASEURL } from "../config";
import { PATIENT } from "../types";
import { Link, useNavigation } from "expo-router";

const User = () => {
  const [token, setToken] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ username: "", password: "" });
  const [patientData, setPatientData] = useState<PATIENT[]>();

  const getUserCredentialsFromStorage = async () => {
    try {
      const userData = await AsyncStorage.multiGet(["username", "password"]);
      if (userData !== null) {
        const username = "caretailer";
        const password = "carepassword";
        setData({ username, password });
      } else {
        console.log("No username or password found in storage");
      }
    } catch (error) {
      console.error("Error retrieving user credentials:", error);
    }
  };
  useEffect(() => {
    getUserCredentialsFromStorage();
  }, []);

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
    }, 120000);
  }, [count]);
  useEffect(() => {
    console.log(count);
    axios
      .get<PATIENT[]>(`${BASEURL}/api/v1/users/my_patients/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setPatientData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token, count]);
  return (
    <View>
      <View>{!patientData && <Text>Loading...</Text>}</View>
      {patientData?.slice(0, 1).flatMap((item) => (
        <UserDetailCard
          key={item.id}
          firstName={item.first_name}
          lastName={item.last_name}
          age={item.age}
          emergencyNumber={item.mobile}
          address={item.address}
          hospital={item.hospital}
          status={item.status}
          description={item.alert_message}
          count={count}
        />
      ))}
    </View>
  );
};

export default User;
const style = StyleSheet.create({
  backButton: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 4,
  },
});
