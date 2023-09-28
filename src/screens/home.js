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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalPesquisa from "react-native-modal";
import ModalCadastro from "react-native-modal";
import { TextInputMask } from "react-native-masked-text";

export default function Home() {
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [isModalCadastroVisible, setModalCadastroVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [dataInicio, setDataInicio] = useState("");

  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  const toggleModalCadastro = () => {
    setModalCadastroVisible(!isModalCadastroVisible); // Função para abrir/fechar o modal de cadastro
  };

  //função para pesquisar as obras
  const handlePesquisar = () => {
    // Lógica de pesquisa através dos campos informados aqui

    //ao final fechar o modal de pesquisa
    toggleModalPesquisa();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleModalPesquisa}>
        <Icon name="search" size={30} color="white" style={styles.searchIcon} />
      </TouchableOpacity>

      <Text style={styles.text}>Dashboard de todas as obras cadastradas</Text>

      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleModalCadastro}>
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

      <ModalCadastro
        isVisible={isModalCadastroVisible}
        onBackdropPress={toggleModalCadastro}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cadastrar nova obra</Text>
            {/* Adicione os campos e a lógica para cadastrar uma nova obra aqui */}
            <Icon
              name="search"
              size={30}
              color="white"
              style={styles.searchIconCadastro}
            />
            <TextInput
              placeholder="Cliente: "
              style={styles.inputSearch}
              placeholderTextColor="white"
              color="white"
            />

            <TextInput
              placeholder="Contato: "
              style={styles.input}
              placeholderTextColor="white"
              color="white"
            />

            <TextInput
              placeholder="Tipo de Obra: "
              style={styles.input}
              placeholderTextColor="white"
              color="white"
            />

            <TextInput
              placeholder="Endereço da Obra: "
              style={styles.input}
              placeholderTextColor="white"
              color="white"
            />

            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              placeholder="Data de Início:"
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              keyboardType="numeric"
            />

            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              placeholder="Data prevista de Término:"
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              keyboardType="numeric"
            />

            <TextInput
              type={"courency"}
              options={{
                format: "R$9.999,99",
              }}
              placeholder="Orçamento: "
              style={styles.input}
              placeholderTextColor="white"
              color="white"
              keyboardType="numeric"
            />

            <TouchableOpacity
              onPress={toggleModalCadastro}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ModalCadastro>
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
