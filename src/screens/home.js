import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";

export default function Home() {
  const [user, setUser] = useState(null);
  const [obras, setObras] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    async function getUserName() {
      try {
        let response = await AsyncStorage.getItem("userData");
        let user = JSON.parse(response);
        setUser(user.usuario);
      } catch (error) {
        console.error("Erro ao obter nome do usuário: " + error);
      }
    }

    async function getAllObras() {
      try {
        const response = await fetch(`${SERVER_URL}/allObras`, {
          method: "GET",
        });

        if (response.status === 200) {
          const obras = await response.json();
          setObras(obras);
        } else {
          console.error("Erro ao buscar obras do servidor.");
        }
      } catch (error) {
        console.error("Erro ao buscar obras: " + error);
      }
    }

    async function getAllClientes() {
      try {
        const response = await fetch(
          `${SERVER_URL}/buscaAllClientes`,
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const clientes = await response.json();
          setClientes(clientes);
        } else {
          console.error("Erro ao buscar clientes do servidor.");
        }
      } catch (error) {
        console.error("Erro ao buscar clientes: " + error);
      }
    }

    async function getAllFuncionarios() {
      try {
        const response = await fetch(
          `${SERVER_URL}/buscaAllFuncionarios`,
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const funcionarios = await response.json();
          setFuncionarios(funcionarios);
        } else {
          console.error("Erro ao buscar funcionários do servidor.");
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários: " + error);
      }
    }

    getUserName();
    getAllObras();
    getAllClientes();
    getAllFuncionarios();
  }, []);

  const dataAtual = new Date();

  const obrasConcluidas = obras.filter((obra) => {
    const dataFimObra = new Date(obra.dataFim);
    return dataFimObra <= dataAtual;
  });

  const obrasPendentes = obras.filter((obra) => {
    const dataFimObra = new Date(obra.dataFim);
    return dataFimObra > dataAtual;
  });

  const totalObras = obras.length;
  const percentObrasConcText = obrasConcluidas.length > 0 ? percentObrasConc.toFixed(2) + "%" : "0%";
  const percentObrasPendText = obrasPendentes.length > 0 ? percentObrasPend.toFixed(2) + "%" : "0%"; 

  const getObrasAFinalizar = () => {
    const ultimoDiaDoMes = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() + 1,
      0
    );

    const obrasAFinalizar = obras.filter((obra) => {
      const dataFimObra = new Date(obra.dataFim);
      return dataFimObra > dataAtual && dataFimObra <= ultimoDiaDoMes;
    });

    return obrasAFinalizar.length;
  };
  const obrasAFinalizarNoMes = getObrasAFinalizar();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo(a) de volta</Text>
        <Text style={styles.headerText}>{user}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Obras Cadastradas:
          </Text>
          <Text style={styles.numeroObrasText}>{obras.length}</Text>
        </View>

        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Obras Concluidas:
          </Text>
          <Text style={styles.numeroObrasText}>{percentObrasConcText}</Text>
        </View>

        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Obras Pendentes:
          </Text>
          <Text style={styles.numeroObrasText}>{percentObrasPendText}</Text>
        </View>

        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Obras para entregar este mês:
          </Text>
          <Text style={styles.numeroObrasText}>{obrasAFinalizarNoMes}</Text>
        </View>

        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Total de Cliente Cadastrados:
          </Text>
          <Text style={styles.numeroObrasText}>{clientes.length}</Text>
        </View>

        <View style={styles.obrasContainer}>
          <Text style={styles.descriptionText}>
            Total de Funcionários Cadastrados:
          </Text>
          <Text style={styles.numeroObrasText}>{funcionarios.length}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "90%",
    height: "80%",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  obrasContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  descriptionText: {
    color: "white",
    fontSize: 16,
  },
  numeroObrasText: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 8,
  },
});
