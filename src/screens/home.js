import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";


export default function Home() {

  //FUNÇÃO PARA PEGAR O NOME DO USUÁRIO LOGADO
  const userName = () => {

  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Bem vindo(a) de volta</Text>
        <Text style={styles.headerText}>userName</Text>
      </View>

      <View style={styles.cardContainer}>

        <View style={styles.card}>
          
          <Text style={styles.cardText}> Total de Obras cadastradas:    0</Text>
          <Text style={styles.cardText}> Total de obras em andamento:       0</Text>


        </View>

      </View>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    width: "90%",
    height: "70%",
    borderRadius: 10,
    padding: 10,
  },
  card: {
    opacity: 1,
  },

  cardText: {
    color: 'white',
    fontSize: 18,
    paddingBottom: 8,

  }
});
