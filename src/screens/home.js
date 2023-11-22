import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";

export default function Home() {
  const [user, setUser] = useState(null);
  const [obras, setObras] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    async function getUserName() {
      try {
        let response = await AsyncStorage.getItem('userData');
        let user = JSON.parse(response);
        setUser(user.usuario);
      } catch (error) {
        console.error("Erro ao obter nome do usuário: " + error);
      }
    }

    async function getAllObras() {
      try {
        const response = await fetch("http://192.168.100.3:3000/allObras", {
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
        const response = await fetch("http://192.168.100.3:3000/buscaAllClientes", {
          method: "GET",
        });

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
        const response = await fetch("http://192.168.100.3:3000/buscaAllFuncionarios", {
          method: "GET",
        });

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
  const percentObrasConc = (obrasConcluidas.length / totalObras) * 100;
  const percentObrasPend = (obrasPendentes.length / totalObras) * 100;

  const data = [
    {
      name: "Concluídas",
      population: percentObrasConc,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pendentes",
      population: percentObrasPend,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const getObrasAFinalizar = () => {
    const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);

    const obrasAFinalizar = obras.filter((obra) => {
      const dataFimObra = new Date(obra.dataFim);
      return dataFimObra > dataAtual && dataFimObra <= ultimoDiaDoMes;
    });

    return obrasAFinalizar.length;
  };
  const obrasAFinalizarNoMes = getObrasAFinalizar();

  const getClienteComMaisObras = () => {
    const contadorObrasPorCliente = {};

    // Contar o número de obras para cada cliente
    obras.forEach((obra) => {
      const clienteId = obra.clienteId; // Substitua com o nome do seu campo de identificação do cliente
      contadorObrasPorCliente[clienteId] = (contadorObrasPorCliente[clienteId] || 0) + 1;
    });

    // Encontrar o cliente com mais obras
    let clienteComMaisObras = null;
    let maxObras = 0;

    Object.keys(contadorObrasPorCliente).forEach((clienteId) => {
      if (contadorObrasPorCliente[clienteId] > maxObras) {
        clienteComMaisObras = clienteId;
        maxObras = contadorObrasPorCliente[clienteId];
      }
    });

    return clienteComMaisObras;
  };
  const clienteComMaisObras = getClienteComMaisObras();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bem-vindo(a) de volta</Text>
        <Text style={styles.headerText}>{user}</Text>
      </View>
      <View style={styles.cardContainer}>
        {obras.length > 0 ? (
          <View style={styles.card}>
            <View style={styles.chartContainer}>
              <PieChart
                data={data}
                width={300}
                height={200}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>Obras cadastradas: {totalObras}</Text>
              <Text style={styles.cardText}>Cliente cadastrados: {clientes.length}</Text>
              <Text style={styles.cardText}>Funcionários cadastrados: {funcionarios.length}</Text>
              <Text style={styles.cardText}>Obras a finalizar neste mês: {obrasAFinalizarNoMes}</Text>
              <Text style={styles.cardText}>Cliente com mais Obras: {clienteComMaisObras ? clienteComMaisObras : "Nenhum"}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>Nenhuma obra cadastrada.</Text>
        )}
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  chartContainer: {
    alignItems: "flex-start",
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
  noDataText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
