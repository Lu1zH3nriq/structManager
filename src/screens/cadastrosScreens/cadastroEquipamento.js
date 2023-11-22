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
  const handleCadastro = async () => {
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
      try {
        let response = await fetch(
          "http://192.168.100.3:3000/cadastraEquipamento",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              codigo: codigo,
              marca: marca,
              modelo: modelo,
              etiqueta: etiqueta,
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
                setNome("");
                setCodigo("");
                setMarca("");
                setModelo("");
                setEtiqueta("");
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

  //function para pesquisar o Equipamento
  const [nomeFind, setNomeFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");

  const [idBuscado, setIdBuscado] = useState("");
  const [nomeBuscado, setNomeBuscado] = useState("");
  const [codigoBuscado, setCodigoBuscado] = useState("");
  const [marcaBuscado, setMarcaBuscado] = useState("");
  const [modeloBuscado, setModeloBuscado] = useState("");
  const [etiquetaBuscado, setEtiquetaBuscado] = useState("");

  const handlePesquisa = async () => {
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
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaEquipamento";
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
          //console.log(data);
          setNome(data.nome);
          setCodigo(data.codigo);
          setMarca(data.marca);
          setModelo(data.modelo);
          setEtiqueta(data.etiqueta);

          setIdBuscado(data.id);
          setNomeBuscado(data.nome);
          setCodigoBuscado(data.codigo);
          setMarcaBuscado(data.marca);
          setModeloBuscado(data.modelo);
          setEtiquetaBuscado(data.etiqueta);

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

  //function para alterar o Equipamento
  const handleAltera = async () => {
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
      const equipAlterado = {
        id: idBuscado,
        nome: nomeBuscado,
        codigo: codigoBuscado,
        marca: marcaBuscado,
        modelo: modeloBuscado,
        etiqueta: etiquetaBuscado,
      };

      if (
        equipAlterado.nome != nome ||
        equipAlterado.codigo != codigo ||
        equipAlterado.marca != marca ||
        equipAlterado.modelo != modelo ||
        equipAlterado.etiqueta != etiqueta
      ) {
        (equipAlterado.nome = nome),
          (equipAlterado.codigo = codigo),
          (equipAlterado.marca = marca),
          (equipAlterado.modelo = modelo),
          (equipAlterado.etiqueta = etiqueta);
        try {
          const response = await fetch(
            "http://192.168.100.3:3000/alteraEquipamento",
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(equipAlterado),
            }
          );

          const data = await response.json();

          if (response.status === 200) {
            Alert.alert("Sucesso!", data.message, [
              {
                text: "Confirmar",
                onPress: () => {
                  // LIMPAR TODOS OS CAMPOS
                  setNome("");
                  setCodigo("");
                  setMarca("");
                  setModelo("");
                  setEtiqueta("");

                  //LIMPA O ESTADO DO CLIENTE ENCONTRADO
                  setIdBuscado("");
                  setNomeBuscado("");
                  setCodigoBuscado("");
                  setMarcaBuscado("");
                  setModeloBuscado("");
                  setEtiquetaBuscado("");

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

  //function para deletar o Equipamento
  const handleDelet = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      nome === "" &&
      codigo === "" &&
      marca === "" &&
      modelo === "" &&
      etiqueta === ""
    ) {
      Alert.alert("Atenção!", "Preencha os campos para deletar Equipamento!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      Alert.alert(
        "Atenção!",
        "Deseja realmente deletar o registro deste equipamento? ",
        [
          {
            text: "Deletar Equipamento",
            onPress: async () => {
              try {
                let response = await fetch(
                  "http://192.168.100.3:3000/apagaEquipamento",
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
                        setNome("");
                        setCodigo("");
                        setMarca("");
                        setModelo("");
                        setEtiqueta("");

                        //LIMPA O ESTADO DO CLIENTE ENCONTRADO
                        setIdBuscado("");
                        setNomeBuscado("");
                        setCodigoBuscado("");
                        setMarcaBuscado("");
                        setModeloBuscado("");
                        setEtiquetaBuscado("");

                        //MUDA ESTADO DE CLIENTE ENCONTRADO PARA FALSE, PAR ESCONDER BOTOES DE ALTERAÇÃO
                        setFind(false);
                      },
                    },
                  ]);
                } else {
                  Alert.alert("Atenção!", data.message);
                }
              } catch (error) {
                console.error("Erro na requisição: ", error);
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
          <Text style={styles.heading}>Dados do Equipamento</Text>
          <Text style={styles.inpText}>Nome do Equipamento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Equipamento"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <Text style={styles.inpText}>Código:</Text>
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={codigo}
            onChangeText={(text) => setCodigo(text)}
          />
          <Text style={styles.inpText}>Marca:</Text>
          <TextInput
            style={styles.input}
            placeholder="IMarca"
            value={marca}
            onChangeText={(text) => setMarca(text)}
          />
          <Text style={styles.inpText}>Modelo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={modelo}
            onChangeText={(text) => setModelo(text)}
          />
          <Text style={styles.inpText}>Etiqueta:</Text>
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
                <Text style={styles.modalTitle}>Pesquisar Equipamento</Text>
                <Text style={styles.inpText}>Código do Equipamento:</Text>
                <TextInput
                  placeholder="Código ou Etiqueta"
                  style={styles.input}
                  placeholderTextColor={"grey"}
                  value={codigoFind}
                  onChangeText={(text) => {
                    setCodigoFind(text);
                  }}
                />
                <Text style={styles.inpText}>Nome do Equipamento:</Text>
                <TextInput
                  placeholder="Nome do Equipamento"
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
