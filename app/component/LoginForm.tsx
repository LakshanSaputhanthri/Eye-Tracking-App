import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import axios from "axios";
import { BASEURL } from "../config";
import { OneSignal } from "react-native-onesignal";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const { setItem } = useAsyncStorage("token");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(`${BASEURL}/api-auth/auth/login/`, {
        username,
        password,
      }),
    onSuccess: async (data) => {
      await AsyncStorage.setItem("token", data.data["access"]);
      OneSignal.login(username);
      console.log("object");
      router.replace("/users/user");
    },
    onError: (err) => {
      console.log("kkkk", err);
    },
  });

  return (
    <View style={styles.container}>
      {mutation.isPending && <Text>Login...</Text>}
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
        {!mutation.isPending && (
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
              onPress={() => mutation.mutate()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
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
    gap: 8,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginForm;
