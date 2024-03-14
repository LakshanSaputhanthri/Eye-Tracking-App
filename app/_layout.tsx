import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "#A3A4A3" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="users/user" options={{ title: "Patient Details" }} />
    </Stack>
  );
};

export default RootLayout;
