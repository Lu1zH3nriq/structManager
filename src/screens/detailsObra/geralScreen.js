import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import materialScreen from "./materialScreen";
import funcionarioScreen from "./funcionarioScreen";
import equipamentoScreen from "./equipamentoScreen.js";

const Tab = createMaterialTopTabNavigator();

export default function GeralScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Obtendo os detalhes da obra do parâmetro
  const obra = route.params?.obra || {};

  // Função para navegar para outras telas relacionadas à obra
  const navigateToOutraTela = (tela) => {
    // Use a função navigate para navegar para a tela desejada
    navigation.navigate(tela, { obra });
  };

  const [cliente, setCliente] = React.useState("");

  React.useEffect(() => {
    const getCliente = async () => {
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaCliente";
        let params = { id: obra.clienteId };
        let url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

        let response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCliente(data.nome);
        } else {
          console.error("Erro na requisição: ", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
      }
    };

    getCliente();
  }, []);

  const TelaMateriais = () => <materialScreen />;
  const TelaFuncionarios = () => <funcionarioScreen />;
  const TelaEquipamentos = () => <equipamentoScreen />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Envolve os detalhes da obra em uma View com estilos específicos */}
      <View style={styles.detalhesObraContainer}>
        <Text style={styles.textoDetalhes}>Nome da Obra: {obra.nome}</Text>
        <Text style={styles.textoDetalhes}>Tipo: {obra.tipo}</Text>
        <Text style={styles.textoDetalhes}>
          Data de Início: {obra.dataInicio}
        </Text>
        <Text style={styles.textoDetalhes}>
          Data prevista para Término: {obra.dataFim}
        </Text>
        <Text style={styles.textoDetalhes}>Cliente da Obra: {cliente}</Text>
      </View>

      {/* Renderiza a barra de navegação para outras telas relacionadas à obra */}
      <View style={styles.barraNavegacao}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#454A50",
            },
            tabBarLabelStyle: {
              color: "white",
            },
          }}
        >
          <Tab.Screen name="Materiais" component={TelaMateriais} />
          <Tab.Screen name="Funcionários" component={TelaFuncionarios} />
          <Tab.Screen name="Equipamentos" component={TelaEquipamentos} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Cor de fundo diferente
    padding: 5, // Padding de 5px
    borderRadius: 10, // Bordas arredondadas
  },
  barraNavegacao: {
    flexDirection: "row",
    marginTop: 20,
  },
  detalhesObraContainer: {
    margin: 5, // Margem de 5px do topo e da esquerda
  },
  textoDetalhes: {
    color: "white",
    marginBottom: 3, // Espaçamento de 3px entre cada Text
    fontWeight: "bold", // Fonte em negrito
  },
});
