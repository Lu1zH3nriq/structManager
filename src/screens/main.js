import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; 

import TelaHome from './home.js';
import TelaCadastros from './cadastros';
import TelaRelatorios from './relatorios';
import TelaUsuario from './user';
import TelaGerencialObras from './gerenciarObras.js';

function HomeScreen() {
  return (
    <TelaHome style={styles.container}/>
  );
}

function GerenciarObras(){
  return(
    <TelaGerencialObras style={styles.container}/>
  );
}

function CadastrosScreen() {
  return (
    <TelaCadastros style={styles.container}/>
  );
}

function RelatoriosScreen() {
  return (
    <TelaRelatorios style={styles.container}/>
  );
}

function UsuarioScreen() {
  return (
    <TelaUsuario style={styles.container}/>
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
          } else if (route.name === "Gerencial") {
            iconName = "star"; 
          } else if (route.name === "Cadastros") {
            iconName = "list"; 
          } else if (route.name === "Relatórios") {
            iconName = "file-text"; 
          } else if (route.name === "Usuário") {
            iconName = "user"; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarIconStyle={{
        activeTintColor: "blue", // Cor do ícone ativo
        inactiveTintColor: "gray", // Cor do ícone inativo
        tabBarStyle: {
          display: "flex",
        },
      }}
    >
      <Tab.Screen name="Início" component={HomeScreen} options={{headerShown : false}}/>
      <Tab.Screen name="Gerencial" component={GerenciarObras} options={{headerShown : false}}/>
      <Tab.Screen name="Cadastros" component={CadastrosScreen}  options={{headerShown : false}}/>
      {/* <Tab.Screen name="Relatórios" component={RelatoriosScreen} options={{headerShown : false}}/> */}
      <Tab.Screen name="Usuário" component={UsuarioScreen} options={{headerShown : false}} />
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
