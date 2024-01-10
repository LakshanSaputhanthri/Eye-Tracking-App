import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Index = () => {
  return (
    <View>
      <Text>Index</Text>
      <Link href={"users/user"}>
        <Text>User</Text>
      </Link>
    </View>
  );
};

export default Index;
