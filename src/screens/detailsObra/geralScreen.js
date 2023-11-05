import React from "react";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function GeralScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Obtenha os detalhes da obra dos parâmetros
  const obra = route.params?.obra || {};

  // Função para navegar para outras telas relacionadas à obra
  const navigateToOutraTela = (tela) => {
    // Use a função navigate para navegar para a tela desejada
    navigation.navigate(tela, { obra });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Renderize os detalhes da obra (por exemplo, nome da obra) */}
      <Text style={{ color: "white" }}>Nome da Obra: {obra.nome}</Text>
      <Text style={{ color: "white" }}>Tipo: {obra.tipo}</Text>
      <Text style={{ color: "white" }}>Data de Início: {obra.dataInicio}</Text>

      {/* Renderize a barra de navegação para outras telas relacionadas à obra */}
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
          <Tab.Screen
            name="TelaRelacionada1"
            component={TelaRelacionada1}
          />
          <Tab.Screen
            name="TelaRelacionada2"
            component={TelaRelacionada2}
          />
          <Tab.Screen
            name="TelaRelacionada3"
            component={TelaRelacionada3}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const TelaRelacionada1 = () => (
  <View style={styles.telaRelacionada}>
    <Text style={{ color: "white" }}>Tela Relacionada 1</Text>
  </View>
);

const TelaRelacionada2 = () => (
  <View style={styles.telaRelacionada}>
    <Text style={{ color: "white" }}>Tela Relacionada 2</Text>
  </View>
);

const TelaRelacionada3 = () => (
  <View style={styles.telaRelacionada}>
    <Text style={{ color: "white" }}>Tela Relacionada 3</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
  },
  barraNavegacao: {
    flexDirection: "row",
    marginTop: 20,
  },
  telaRelacionada: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
