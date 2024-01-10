import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="users/user" />
    </Stack>
  );
};

export default RootLayout;
