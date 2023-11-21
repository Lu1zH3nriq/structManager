import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button } from "react-native-elements";

// Importar navegação
import { useNavigation } from '@react-navigation/native';

export default function Cadastros() {
  // Navegação
  const navigation = useNavigation();

  // Função para navegar até a tela de Cadastro de Cliente
  const navigateToCadastroCliente = () => {
    navigation.navigate('CadastraCliente');
  }

  // Função para navegar até a tela de Cadastro de Funcionário
  const navigateToCadastroFuncionario = () => {
    navigation.navigate('CadastraFuncionario');
  }

  // Função para navegar até a tela de Cadastro de Equipamento
  const navigateToCadastroEquipamento = () => {
    navigation.navigate('CadastraEquipamento');
  }

  // Função para navegar até a tela de Cadastro de Tipo de Obra
  const navigateToCadastroTipodeObra = () => {
    navigation.navigate('CadastraTipodeObra');
  }

  const navigateToCadastroMaterial = () => {
    navigation.navigate('CadastraMaterial');
  }

  // Função para navegar até a tela de Cadastro da nova Obra
  const navigateToCadastroNovaObra = () => {
    navigation.navigate('CadastraNovaObra');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar Cliente"
          onPress={navigateToCadastroCliente}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Cadastrar Funcionário"
          onPress={navigateToCadastroFuncionario}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Cadastrar Equipamento"
          onPress={navigateToCadastroEquipamento}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Cadastrar Tipo de Obra"
          onPress={navigateToCadastroTipodeObra}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Cadastrar Material"
          onPress={navigateToCadastroMaterial}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Cadastrar Nova Obra"
          onPress={navigateToCadastroNovaObra}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007BFF", 
    width: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center", 
  },
});
