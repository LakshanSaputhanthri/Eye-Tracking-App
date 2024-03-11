import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const UserDetailCard = () => {
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
