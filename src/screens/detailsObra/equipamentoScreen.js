import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

//importar navegção
import { useNavigation } from '@react-navigation/native';

export default function equipamentoScreen() {
  

  return (
    <SafeAreaView style={styles.container}>

        <Text style={ {color: 'white'} }>PÁGINA GERAL DOS DETALHES DA OBRA SELECIONADA</Text>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    alignItems: "center",
    justifyContent: "center",
  },
 
});
