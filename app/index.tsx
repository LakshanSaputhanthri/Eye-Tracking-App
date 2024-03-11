import React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "./component/LoginForm";

const Index = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#456",
  },
  textInput: {
    backgroundColor: "#fff",
    width: 1000,
  },
});

export default Index;
