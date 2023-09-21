import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from "./src/screens/login";

export default function App() {
  return (
    <view>
      <LoginScreen/>
      <StatusBar style='auto'/>
    </view>
  );
}
