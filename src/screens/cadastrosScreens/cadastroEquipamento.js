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

export default function CadastroEquipamento() {
  const [isModalPesquisa, setModalPesquisa] = useState(false); // inicializa o modal oculto
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [etiqueta, setEtiqueta] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O Equipamento
  const [find, setFind] = useState(false);

  const navigation = useNavigation(); // Inicialize o hook de navegação

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //CRUD Equipamento
  //function para cadastrar o Equipamento
  const handleCadastro = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      codigo === "" &&
      marca === "" &&
      modelo === "" &&
      etiqueta === ""
    ) {
      Alert.alert(
        "Atenção!",
        "Preencha todos os campos para cadastrar o Equipamento!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Equipamento
      //se achar, informar que o Equipamento ja está cadastrado
      //se nao achar, cadastrar o Equipamento

      // DEPOIS DE CADASTRAR
      Alert.alert("Sucesso!", "Equipamento cadastrado com sucesso!", [
        {
          text: "Confirmar",
          onPress: () => {
            // LIMPAR TODOS OS CAMPOS
            setNome("");
            setCodigo("");
            setMarca("");
            setModelo("");
            setEtiqueta("");
            setNomeFind("");
            setCodigoFind("");
          },
        },
      ]);
    }
  };

  //function para pesquisar o Equipamento
  const [nomeFind, setNomeFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");
  const handlePesquisa = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && codigoFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha os campos para pesquisar Equipamentos!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      //buscar Equipamento
      //se achar, trazer os dados do Equipamento (json)

      setFind(true);

      //se nao achar, trazer uma mensagem de Equipamento nao cadastrado
    }
    toggleModalPesquisa();
  };

  //function para alterar o Equipamento
  const handleAltera = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      codigo === "" &&
      marca === "" &&
      modelo === "" &&
      etiqueta === ""
    ) {
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Equipamento
      //se achar, informar que o Equipamento ja está cadastrado
      //se nao achar, cadastrar o Equipamento

      // DEPOIS DE ALTERAR
      Alert.alert();

      // LIMPAR TODOS OS CAMPOS
      setNome("");
      setCodigo("");
      setMarca("");
      setModelo("");
      setEtiqueta("");
      setNomeFind("");
      setCodigoFind("");
    }
  };

  //function para deletar o Equipamento
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
      //buscar Equipamento
      //se achar, informar que o Equipamento ja está cadastrado
      //se nao achar, cadastrar o Equipamento

      // DEPOIS DE DELETAR

      // LIMPAR TODOS OS CAMPOS
      setNome("");
      setCodigo("");
      setMarca("");
      setModelo("");
      setEtiqueta("");
      setNomeFind("");
      setCodigoFind("");
    }
  };

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setNome("");
    setCodigo("");
    setMarca("");
    setModelo("");
    setEtiqueta("");
    setNomeFind("");
    setCodigoFind("");
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
        <Text style={styles.heading}>Dados do Equipamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Equipamento"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código"
          value={codigo}
          onChangeText={(text) => setCodigo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="IMarca"
          value={marca}
          onChangeText={(text) => setMarca(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={(text) => setModelo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Etiqueta"
          value={etiqueta}
          onChangeText={(text) => setEtiqueta(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar Equipamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
          <Text style={styles.buttonText}>Pesquisar/Alterar Equipamento</Text>
        </TouchableOpacity>

        {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM Equipamento */}
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
              <Text style={styles.modalTitle}>Pesquisar Equipamento</Text>

              <TextInput
                placeholder="Código ou Etiqueta"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={codigoFind}
                onChangeText={(text) => {
                  setCodigoFind(text);
                }}
              />

              <TextInput
                placeholder="Nome do Equipamento"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={nomeFind}
                onChangeText={(text) => {
                  setNomeFind(text);
                }}
              />

              <TouchableOpacity onPress={handlePesquisa} style={styles.button}>
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
