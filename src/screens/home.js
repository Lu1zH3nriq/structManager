import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home(  ) {
  const [ user, setUser ] = useState(null);

  useEffect( ()=>{
    async function getUserName(){
      let response = await AsyncStorage.getItem('userData');
      let user = JSON.parse(response);
      setUser(user.usuario);
    }

    getUserName();
  }, [] );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Bem vindo(a) de volta</Text>
        <Text style={styles.headerText}>{user}</Text>
      </View>

      <View style={styles.cardContainer}>

        <View style={styles.card}>


          <View style={styles.cardHeader}>
            <Text style={styles.cardText}>GRÁFICO DE PIZZA</Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardText}>Obras cadastradas:    0</Text>
            <Text style={styles.cardText}>Obras em andamento:   0</Text>
          </View>


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
    height: "80%",
    borderRadius: 10,
    padding: 10,
  },
  card: {
    flex: 1, // Adicione esta linha
    flexDirection: "column", // Adicione esta linha
    justifyContent: "center", // Adicione esta linha
  },
  cardHeader: {
    justifyContent: "center", // Alinhe no início do card
    alignItems: "center",
  },

  cardFooter: {
    position: "absolute",
    bottom: 0, 
  },
  cardText: {
    color: "white",
    fontSize: 18,
    paddingBottom: 8,
  },
});
