import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';


export default function CadCliente() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>TELA DE CADASTRAR EQUIPAMENTO</Text>
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