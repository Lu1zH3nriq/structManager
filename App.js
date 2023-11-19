import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Routes from "./src/routes/index";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar backgroundColor="#63676B" barStyle="ligh-content" />
        <Routes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

