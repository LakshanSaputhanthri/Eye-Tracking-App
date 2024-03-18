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
  const [waitingPatient, setWaitingPatient] = useState<PATIENT[]>();

  axios
    .get<PATIENT[]>(`${BASEURL}/api/v1/users/my_patients/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setPatientData(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  useEffect(() => {
    if (data) {
      axios
        .post(`${BASEURL}/api-auth/auth/login/`, {
          username: "caretailer",
          password: "carepassword",
        })
        .then(function (response) {
          setToken(response.data["access"]);
        })
        .catch(function (error) {
          console.log(error, "login");
        });
    }
  }, [data, count]);
  axios
    .get<PATIENT[]>(`${BASEURL}/api/v1/users/show_alerts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setWaitingPatient(
        response.data.filter((v) => v.status !== null || v.status !== undefined)
      );
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 120000);
  }, [count]);

  return (
    <View>
      {waitingPatient?.map((item) => (
        <View style={styles.card} key={item.id}>
          <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Text style={styles.name}>{item.first_name}</Text>
            <Text style={styles.name}>{item.last_name}</Text>
          </View>

          <Text
            style={{
              color: "#ff0000",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {item.status}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{item.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Emergency Number:</Text>
            <Text style={styles.value}>{item.mobile}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{item.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hospital:</Text>
            <Text style={styles.value}>{item.hospital}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{item.status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{item.alert_message}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Count:</Text>
            <Text style={styles.value}>{count}</Text>
          </View>
        </View>
      ))}

      <View>{!patientData && <Text>Loading...</Text>}</View>

      {patientData?.flatMap((item) => (
        <>
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
          />
        </>
      ))}
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  backButton: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});
