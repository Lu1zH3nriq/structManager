import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importe os ícones apropriados

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </SafeAreaView>
  );
}

function CadastrosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Cadastros Screen</Text>
    </SafeAreaView>
  );
}

function RelatoriosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Relatórios Screen</Text>
    </SafeAreaView>
  );
}

function UsuarioScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Usuário Screen</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = "home";
          } else if (route.name === "Cadastros") {
            iconName = "list"; // Altere o nome do ícone conforme necessário
          } else if (route.name === "Relatórios") {
            iconName = "file-text"; // Altere o nome do ícone conforme necessário
          } else if (route.name === "Usuário") {
            iconName = "user"; // Altere o nome do ícone conforme necessário
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue", // Cor do ícone ativo
        inactiveTintColor: "gray", // Cor do ícone inativo
        tabBarStyle: {
          display: "flex",
        },
      }}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Cadastros" component={CadastrosScreen} />
      <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
      <Tab.Screen name="Usuário" component={UsuarioScreen} />
    </Tab.Navigator>
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
