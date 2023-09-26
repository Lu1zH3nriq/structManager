import React from 'react';
import { Text, StyleSheet,SafeAreaView } from 'react-native';


export default function Relatorios() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Tela de relatórios com os tipos de relatórios a ser definidos</Text>
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