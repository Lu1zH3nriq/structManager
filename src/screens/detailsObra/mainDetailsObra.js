import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import geralScreen from '../detailsObra/geralScreen.js';
import funcionariosScreen from '../detailsObra/funcionarioScreen.js';
import equipamentosScreen from '../detailsObra/equipamentoScreen.js';
import materiaisScreen from '../detailsObra/materialScreen.js';

function GeralScreen() {
    return (
        <geralScreen style={styles.container} />
    );
}

function FuncionariosScreen() {
    return (
        <funcionariosScreen style={styles.container} />
    );
}

function EquipamentosScreen() {
    return (
        <equipamentosScreen style={styles.container} />
    );
}

function MateriaisScreen() {
    return (
        <materiaisScreen style={styles.container} />
    );
}



const Tab = createBottomTabNavigator();

export default function DetailObra() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Geral") {
                        iconName = "home";
                    } else if (route.name === "Funcionarios") {
                        iconName = "star";
                    } else if (route.name === "Equipamentos") {
                        iconName = "list";
                    } else if (route.name === "Materiais") {
                        iconName = "file-text";
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
            <Tab.Screen name="Geral" component={GeralScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Funcionarios" component={FuncionariosScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Equipamentos" component={EquipamentosScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Materiais" component={MateriaisScreen} options={{ headerShown: false }} />
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
});
