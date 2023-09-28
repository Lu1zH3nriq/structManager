import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button } from "react-native-elements";

//importar navegação
import { useNavigation } from '@react-navigation/native';


export default function Cadastros() {
  //navegação
  const navigation = useNavigation();


  //função para navegar até a tela de Cadastro de Cliente
  const navigateToCadastroCliente = () => {
    navigation.navigate('CadastraCliente');
  }

  //função para navegar até a tela de Cadastro de Funcionario
  const navigateToCadastroFuncionario = () => {
    navigation.navigate('CadastraFuncionario');
  }

  //função para navegar até a tela de Cadastro de Equipamento
  const navigateToCadastroEquipamento = () => {
    navigation.navigate('CadastraEquipamento');
  }

  //função para navegar até a tela de Cadastro de Tipo de Obra
  const navigateToCadastroTipodeObra = () => {
    navigation.navigate('CadastraTipodeObra');
  }

  //função para navegar até a tela de Cadastro da nova Obra
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
        />
        <Button
          title="Cadastrar Funcionário"
          onPress={navigateToCadastroFuncionario}
          buttonStyle={styles.button}
        />
        <Button
          title="Cadastrar Equipamento"
          onPress={navigateToCadastroEquipamento}
          buttonStyle={styles.button}
        />
        <Button
          title="Cadastrar Tipo de Obra"
          onPress={navigateToCadastroTipodeObra}
          buttonStyle={styles.button}
        />


        <Button
          title="Cadastrar Nova Obra"
          onPress={navigateToCadastroNovaObra}
          buttonStyle={styles.button}
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
    marginTop: 20,
  },
  button: {
    backgroundColor: "grey", // Cor de fundo dos botões
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});