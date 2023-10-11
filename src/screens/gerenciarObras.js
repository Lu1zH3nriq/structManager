import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalPesquisa from "react-native-modal";
import { TextInputMask } from "react-native-masked-text";

//importar navegção
import { useNavigation } from '@react-navigation/native';


export default function GerenciarObras() {
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [dataInicio, setDataInicio] = useState("");
   // setar o estado como falso para os botoes de pesquisa

  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  //navegação
  const navigation = useNavigation();
  const toggleCadastrarObra = () => {
    navigation.navigate('CadastraNovaObra')
  };

  const toggleDetailObra = () => {
    navigation.navigate('DetailsObra')
  };


  //função para pesquisar as obras
  const handlePesquisar = () => {

    // verifica se os campos estão vazios
    if( nomeCliente === '' && tipoObra === '' && dataInicio === ''){
      Alert.alert(
        'Atenção!',
        'Preencha algum dos campos para pesquisar obras.',
        [
          {
            text: "Ok",
          },
        ],
      );
    }
    else{

      //pesquisar no banco de dados as obras de acordo com os filtros;

    }

    //ao final fechar o modal de pesquisa
    toggleModalPesquisa();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleModalPesquisa}>
        <Icon name="search" size={30} color="white" style={styles.searchIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={ toggleDetailObra } >
        <Text style={ {color: 'white'} }>
          ABRIR TELA DE GERENCIAR CADA OBRA
        </Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleCadastrarObra}>
          <Icon name="plus" size={30} color="white" style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <ModalPesquisa
        isVisible={isModalPesquisaVisible}
        onBackdropPress={toggleModalPesquisa}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pesquisar obras</Text>
            <TextInput
              placeholder="Nome do Cliente"
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              value={nomeCliente}
              onChangeText={(text) => setNomeCliente(text)}
            />

            <TextInput
              placeholder="Tipo de Obra"
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              value={tipoObra}
              onChangeText={(text) => setTipoObra(text)}
            />
            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              placeholder="Data de Início"
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              value={dataInicio}
              onChangeText={(text) => setDataInicio(text)}
              keyboardType="numeric"
            />

            <TouchableOpacity
              onPress={handlePesquisar}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Pesquisar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ModalPesquisa>


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
    position: "absolute",
    top: "5%",
    left: '3%',
    zIndex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  searchIconCadastro: {
    position: "absolute",
    right: "10%",
    top: "13.5%",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: '3%',
    right: '5%',
    zIndex: 1,
  },
  addIcon: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: "#454A50",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  inputSearch: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  modalButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },


 
});
