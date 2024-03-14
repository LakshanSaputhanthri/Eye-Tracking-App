import React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "./component/LoginForm";
import { LogLevel, OneSignal } from "react-native-onesignal";
import "react-native-gesture-handler";

const initOneSignal = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize("a2533e4a-e8de-4d2d-a612-9c70fb496e50");
  OneSignal.Notifications.requestPermission(true);
};

const Index = () => {
  initOneSignal();

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
