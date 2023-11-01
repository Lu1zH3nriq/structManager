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
  const handleCadastro = async () => {
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
      try {
        let response = await fetch("http://192.168.100.3:3000/cadastraTpO", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo: tipo,
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
                setTipo("");
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
  const [tipoFind, setTipoFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");

  const [idBuscado, setIdBuscado] = useState("");
  const [tipoBuscado, setTipoBuscado] = useState("");
  const [codigoBuscado, setCodigoBuscado] = useState("");

  const handlePesquisa = async () => {
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
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaTpO";
        let params = {
          tipo: tipoFind,
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
          //console.log(data);
          setTipo(data.tipo);
          setCodigo(data.codigo);

          setIdBuscado(data.id);
          setTipoBuscado(data.tipo);
          setCodigoBuscado(data.codigo);

          //SE ENCONTRAR CLIENTE, MARCAR ESTADO COMO VERDADEIRO PARA PODER ALANISAR EDIÇÃO DO CADASTRO
          setFind(true);
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
    toggleModalPesquisa();
  };

  //function para alterar o Tipo de Obra
  const handleAltera = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (tipo === "" && codigo === "") {
      Alert.alert("Atenção!", "Preencha os campos para alterar Tipo de Obra!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      

      if (tipoBuscado != tipo || codigoBuscado != codigo) {


        const tipoAlterado = {
          id: idBuscado,
          tipo: tipo,
          codigo: codigo
        };

        try {
          const response = await fetch("http://192.168.100.3:3000/alteraTpO", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tipoAlterado),
          });

          const data = await response.json();

          if (response.status === 200) {
            Alert.alert("Sucesso!", data.message, [
              {
                text: "Confirmar",
                onPress: () => {
                  // LIMPAR TODOS OS CAMPOS
                  setTipo("");
                  setCodigo("");

                  //LIMPA O ESTADO DO CLIENTE ENCONTRADO
                  setIdBuscado("");
                  setTipoBuscado("");
                  setCodigoBuscado("");

                  //MUDA ESTADO DE CLIENTE ENCONTRADO PARA FALSE, PAR ESCONDER BOTOES DE ALTERAÇÃO
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
    if (tipo === "" && codigo === "") {
      Alert.alert("Atenção!", "Preencha os campos para deletar Tipo de Obra!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      Alert.alert(
        "Atenção!",
        "Deseja realmente deletar o registro deste Tipo de Obra? ",
        [
          {
            text: "Deletar Tipo de Obra",
            onPress: async () => {
              try {
                let response = await fetch(
                  "http://192.168.100.3:3000/deletaTpO",
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
                        // LIMPAR TODOS OS CAMPOS
                        setTipo("");
                        setCodigo("");

                        //LIMPA O ESTADO DO CLIENTE ENCONTRADO
                        setIdBuscado("");
                        setTipoBuscado("");
                        setCodigoBuscado("");

                        //MUDA ESTADO DE CLIENTE ENCONTRADO PARA FALSE, PAR ESCONDER BOTOES DE ALTERAÇÃO
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

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
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
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
          <Text style={styles.buttonText}>Pesquisar/Alterar Tipo de Obra</Text>
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
