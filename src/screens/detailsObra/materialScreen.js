import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-web";

//importar navegção

export default function MaterialScreen({ navigation, route }) {
  const obra = route.params?.obra || {};

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButton}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Gestão de Materiais</Text>
        <Text style={styles.textoHeader}>
          Contrato da Obra: {obra.numContrato}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
      <View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
  },
  goBackButton: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
  textoHeader: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: "10%",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  }
});
