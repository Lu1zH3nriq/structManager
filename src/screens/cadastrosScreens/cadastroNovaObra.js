import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import ModalPesquisa from "react-native-modal";
import { useNavigation } from "@react-navigation/native"; // Importe o hook de navegação

export default function CadastroNovaObra() {
  const [isModalPesquisa, setModalPesquisa] = useState(false); // inicializa o modal oculto
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O Nova Obra
  const [find, setFind] = useState(false);

  const navigation = useNavigation(); // Inicialize o hook de navegação

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //CRUD Nova Obra
  //function para cadastrar o Nova Obra
  const handleCadastro = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      cpfCnpj === "" &&
      telefone === "" &&
      email === "" &&
      endereco === ""
    ) {
      Alert.alert(
        "Atenção!",
        "Preencha todos os campos para cadastrar o Nova Obra!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Nova Obra
      //se achar, informar que o Nova Obra ja está cadastrado
      //se nao achar, cadastrar o Nova Obra

      // DEPOIS DE CADASTRAR
      Alert.alert("Sucesso!", "Nova Obra cadastrado com sucesso!", [
        {
          text: "Confirmar",
          onPress: () => {
            // LIMPAR TODOS OS CAMPOS
            setNome("");
            setCpfCnpj("");
            setTelefone("");
            setEmail("");
            setEndereco("");
            setNomeFind("");
            setCpfCnpjFind("");
          },
        },
      ]);
    }
  };

  //function para pesquisar o Nova Obra
  const [nomeFind, setNomeFind] = useState("");
  const [cpfCnpjFind, setCpfCnpjFind] = useState("");
  const handlePesquisa = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && cpfCnpjFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha os campos para pesquisar Obras!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      //buscar Nova Obra
      //se achar, trazer os dados do Nova Obra (json)

      setFind(true);

      //se nao achar, trazer uma mensagem de Nova Obra nao cadastrado
    }
    toggleModalPesquisa();
  };

  //function para alterar o Nova Obra
  const handleAltera = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      cpfCnpj === "" &&
      telefone === "" &&
      email === "" &&
      endereco === ""
    ) {
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Nova Obra
      //se achar, informar que o Nova Obra ja está cadastrado
      //se nao achar, cadastrar o Nova Obra

      // DEPOIS DE ALTERAR
      Alert.alert();

      // LIMPAR TODOS OS CAMPOS
      setNome("");
      setCpfCnpj("");
      setTelefone("");
      setEmail("");
      setEndereco("");
      setNomeFind("");
      setCpfCnpjFind("");
    }
  };

  //function para deletar o Nova Obra
  const handleDelet = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      cpfCnpj === "" &&
      telefone === "" &&
      email === "" &&
      endereco === ""
    ) {
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Nova Obra
      //se achar, informar que o Nova Obra ja está cadastrado
      //se nao achar, cadastrar o Nova Obra

      // DEPOIS DE DELETAR

      // LIMPAR TODOS OS CAMPOS
      setNome("");
      setCpfCnpj("");
      setTelefone("");
      setEmail("");
      setEndereco("");
      setNomeFind("");
      setCpfCnpjFind("");
    }
  };

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setNome("");
    setCpfCnpj("");
    setTelefone("");
    setEmail("");
    setEndereco("");

    setNomeFind("");
    setCpfCnpjFind("");
    setFind(false);

    //navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackButton}>{"< Voltar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Dados da Nova Obra</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Nova Obra"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          value={cpfCnpj}
          onChangeText={(text) => setCpfCnpj(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar Nova Obra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleModalPesquisa}
        >
          <Text style={styles.buttonText}>Pesquisar/Alterar Nova Obra</Text>
        </TouchableOpacity>

        {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM Nova Obra */}
        {find ? (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Excluir Cadastro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grayBackground}></View>
        )}

        <ModalPesquisa
          isVisible={isModalPesquisa}
          onBackdropPress={toggleModalPesquisa}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Pesquisar Nova Obra</Text>

              <TextInput
                placeholder="CPF ou CNPJ"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={cpfCnpjFind}
                onChangeText={(text) => {
                  setCpfCnpjFind(text);
                }}
              />

              <TextInput
                placeholder="Nome do Nova Obra"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={nomeFind}
                onChangeText={(text) => {
                  setNomeFind(text);
                }}
              />

              <TouchableOpacity
                onPress={handlePesquisa}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Pesquisar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ModalPesquisa>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    padding: 20,
    height: "100%",
  },
  heading: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  goBackButton: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    marginLeft: 10,
  },
  cancelButton: {
    position: "absolute",
    top: 3,
    right: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: "white",
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
  grayBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
});
