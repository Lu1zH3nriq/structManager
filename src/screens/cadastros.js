import React from 'react';
import { Text, StyleSheet,SafeAreaView } from 'react-native';


export default function Cadastros() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Tela para cadastrar novos clientes, funcionários, materiais e equipamentos</Text>
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
    text: {
      fontSize: 20,
      color: "white",
    },
  });