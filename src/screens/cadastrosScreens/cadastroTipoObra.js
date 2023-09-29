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

export default function CadastroTipodeObra() {
  const [isModalPesquisa, setModalPesquisa] = useState(false); // inicializa o modal oculto
  const [tipo, setTipo] = useState("");
  const [codigo, setCodigo] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O Tipo de Obra
  const [find, setFind] = useState(false);

  const navigation = useNavigation(); // Inicialize o hook de navegação

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //CRUD Tipo de Obra
  //function para cadastrar o Tipo de Obra
  const handleCadastro = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (tipo === "" && codigo === "") {
      Alert.alert(
        "Atenção!",
        "Preencha todos os campos para cadastrar o Tipo de Obra!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Tipo de Obra
      //se achar, informar que o Tipo de Obra ja está cadastrado
      //se nao achar, cadastrar o Tipo de Obra

      // DEPOIS DE CADASTRAR
      Alert.alert("Sucesso!", "Tipo de Obra cadastrado com sucesso!", [
        {
          text: "Confirmar",
          onPress: () => {
            // LIMPAR TODOS OS CAMPOS
            setTipo("");
            setCodigo("");

            setTipoFind("");
            setCodigoFind("");
          },
        },
      ]);
    }
  };

  //function para pesquisar o Tipo de Obra
  const [tipoFind, setTipoFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");
  const handlePesquisa = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (tipoFind === "" && codigoFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha os campos para pesquisar Tipo de Obras!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      //buscar Tipo de Obra
      //se achar, trazer os dados do Tipo de Obra (json)

      setFind(true);

      //se nao achar, trazer uma mensagem de Tipo de Obra nao cadastrado
    }
    toggleModalPesquisa();
  };

  //function para alterar o Tipo de Obra
  const handleAltera = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (tipo === "" && codigo === "") {
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Tipo de Obra
      //se achar, informar que o Tipo de Obra ja está cadastrado
      //se nao achar, cadastrar o Tipo de Obra

      // DEPOIS DE ALTERAR
      Alert.alert();

      // LIMPAR TODOS OS CAMPOS
      setTipo("");
      setCodigo("");

      setTipoFind("");
      setCodigoFind("");
    }
  };

  //function para deletar o Tipo de Obra
  const handleDelet = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (tipo === "" && codigo === "") {
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar Tipo de Obra
      //se achar, informar que o Tipo de Obra ja está cadastrado
      //se nao achar, cadastrar o Tipo de Obra

      // DEPOIS DE DELETAR

      // LIMPAR TODOS OS CAMPOS
      setTipo("");
      setCodigo("");

      setTipoFind("");
      setCodigoFind("");
    }
  };

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setTipo("");
    setCodigo("");

    setTipoFind("");
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

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelar}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Dados do Tipo de Obra</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Tipo de Obra"
              value={tipo}
              onChangeText={(text) => setTipo(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Código"
              value={codigo}
              onChangeText={(text) => setCodigo(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar Tipo de Obra</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleModalPesquisa}
            >
              <Text style={styles.buttonText}>
                Pesquisar/Alterar Tipo de Obra
              </Text>
            </TouchableOpacity>

            {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM Tipo de Obra */}
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
                  <Text style={styles.modalTitle}>Pesquisar Tipo de Obra</Text>

                  <TextInput
                    placeholder="Código"
                    style={styles.input}
                    placeholderTextColor={"grey"}
                    value={codigoFind}
                    onChangeText={(text) => {
                      setCodigoFind(text);
                    }}
                  />

                  <TextInput
                    placeholder="Nome do Tipo de Obra"
                    style={styles.input}
                    placeholderTextColor={"grey"}
                    value={tipoFind}
                    onChangeText={(text) => {
                      setTipoFind(text);
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
