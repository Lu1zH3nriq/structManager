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
  ScrollView,
} from "react-native";
import ModalPesquisa from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "@env";

export default function CadastraMaterial() {
  const [isModalPesquisa, setModalPesquisa] = useState(false);
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O Tipo de Obra
  const [find, setFind] = useState(false);

  const navigation = useNavigation();

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //CRUD Tipo de Obra
  //function para cadastrar o Tipo de Obra
  const handleCadastro = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nome === "" && codigo === "") {
      Alert.alert(
        "Atenção!",
        "Preencha todos os campos para cadastrar o Material!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      try {
        let response = await fetch(`${SERVER_URL}/cadastraMat`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            codigo: codigo,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          Alert.alert("Sucesso!", data.message, [
            {
              text: "Confirmar",
              onPress: () => {
                // LIMPAR TODOS OS CAMPOS
                setNome("");
                setCodigo("");
              },
            },
          ]);
        } else {
          Alert.alert("Atenção!", data.message);
        }
      } catch (error) {
        //console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
  };

  //function para pesquisar o Tipo de Obra
  const [nomeFind, setNomeFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");

  const [idBuscado, setIdBuscado] = useState("");
  const [nomeBuscado, setNomeBuscado] = useState("");
  const [codigoBuscado, setCodigoBuscado] = useState("");

  const handlePesquisa = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && codigoFind === "") {
      Alert.alert("Atenção!", "Preencha os campos para pesquisar Material!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      try {
        let baseUrl = `${SERVER_URL}/buscaMat`;
        let params = {
          nome: nomeFind,
          codigo: codigoFind,
        };

        let url = `${baseUrl}?${Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join("&")}`;

        let response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setNome(data.nome);
          setCodigo(data.codigo);

          setIdBuscado(data.id);
          setNomeBuscado(data.nome);
          setCodigoBuscado(data.codigo);

          setFind(true);
        } else {
          Alert.alert("Atenção!", data.message);
        }
      } catch (error) {
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
    toggleModalPesquisa();
  };

  const handleAltera = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nome === "" && codigo === "") {
      Alert.alert("Atenção!", "Preencha os campos para alterar o material!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      if (nomeBuscado != nome || codigoBuscado != codigo) {
        const materialAlterado = {
          id: idBuscado,
          nome: nome,
          codigo: codigo,
        };

        try {
          const response = await fetch(`${SERVER_URL}/alteraMat`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(materialAlterado),
          });

          const data = await response.json();

          if (response.status === 200) {
            Alert.alert("Sucesso!", data.message, [
              {
                text: "Confirmar",
                onPress: () => {
                  setNome("");
                  setCodigo("");

                  setIdBuscado("");
                  setNomeBuscado("");
                  setCodigoBuscado("");

                  setFind(false);
                },
              },
            ]);
          } else {
            Alert.alert("Atenção!", data.message);
          }
        } catch (error) {
          Alert.alert(
            "Erro de rede",
            "Houve um problema na requisição. Tente novamente mais tarde."
          );
        }
      } else {
        Alert.alert("Atenção!", "Nenhum campo alterado, nada para salvar!", [
          {
            text: "OK",
          },
        ]);
      }
    }
  };

  //function para deletar o Tipo de Obra
  const handleDelet = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nome === "" && codigo === "") {
      Alert.alert("Atenção!", "Preencha os campos para deletar o material!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      Alert.alert(
        "Atenção!",
        "Deseja realmente deletar o registro deste material? ",
        [
          {
            text: "Deletar material",
            onPress: async () => {
              try {
                let response = await fetch(
                  `${SERVER_URL}/deletaMat`,
                  {
                    method: "DELETE",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: idBuscado,
                    }),
                  }
                );
                const data = await response.json();
                if (response.status === 200) {
                  Alert.alert("Sucesso!", data.message, [
                    {
                      text: "Confirmar",
                      onPress: () => {
                        setNome("");
                        setCodigo("");

                        setIdBuscado("");
                        setNomeBuscado("");
                        setCodigoBuscado("");

                        setFind(false);
                      },
                    },
                  ]);
                } else {
                  Alert.alert("Atenção!", data.message);
                }
              } catch (error) {
                //console.error("Erro na requisição: ", error);
                Alert.alert(
                  "Erro de rede",
                  "Houve um problema na requisição. Tente novamente mais tarde."
                );
              }
            },
          },
        ]
      );
    }
  };

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setNome("");
    setCodigo("");

    setNomeFind("");
    setCodigoFind("");
    setFind(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackButton}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelar}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Dados do Material</Text>
          <Text style={styles.inpText}>Nome do Material:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Material"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <Text style={styles.inpText}>Código do Material:</Text>
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={codigo}
            onChangeText={(text) => setCodigo(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar Material</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
            <Text style={styles.buttonText}>Pesquisar/Alterar Material</Text>
          </TouchableOpacity>

          {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM Tipo de Obra */}
          {find ? (
            <View>
              <TouchableOpacity style={styles.button} onPress={handleAltera}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDelet}>
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
                <Text style={styles.modalTitle}>Pesquisar Material</Text>
                <Text style={styles.inpText}>Código Material:</Text>
                <TextInput
                  placeholder="Código"
                  style={styles.input}
                  placeholderTextColor={"grey"}
                  value={codigoFind}
                  onChangeText={(text) => {
                    setCodigoFind(text);
                  }}
                />
                <Text style={styles.inpText}>Nome do Material:</Text>
                <TextInput
                  placeholder="Nome do Material"
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
      </ScrollView>
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
  inpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
