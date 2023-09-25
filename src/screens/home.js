import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native'

export default function Home() {

  const navigation = useNavigation();

  
  return (
    <SafeAreaView style={styles.container}>
      
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#454A50",
  },
  
});
