import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BASEURL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PATIENT } from "../types";
import { useNavigation } from "expo-router";
interface Props {
  firstName: string;
  lastName: string;
  age: number;
  emergencyNumber: string | number;
  address: string;
  hospital: string;
  status: string;
  description: string;
  count: number;
}
export const UserDetailCard = ({
  firstName,
  hospital,
  address,
  age,
  status,
  description,
  lastName,
  emergencyNumber,
  count,
}: Props) => {
  let borderColor = "#77ff99";

  if (status === "emergency") {
    borderColor = "#ff5566";
  }
  if (status === "hungry") {
    borderColor = "#f6f765";
  }
  if (status === "toilet") {
    borderColor = "#6677ff";
  }

  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.row}>
        <Text style={styles.title}>status</Text>
        <Text style={styles.description}>
          {status === null ? "Normal" : status}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Patient First Name</Text>
        <Text style={styles.description}>{firstName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Patient Last Name</Text>
        <Text style={styles.description}>{lastName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Age</Text>
        <Text style={styles.description}>{age}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Emergency Number</Text>
        <Text style={styles.description}>{emergencyNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.description}>{address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Hospital</Text>
        <Text style={styles.description}>{hospital}</Text>
      </View>
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
    borderStyle: "solid",
    borderWidth: 4,
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
