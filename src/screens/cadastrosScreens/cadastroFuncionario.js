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

export default function CadastroFuncionario() {
  const [isModalPesquisa, setModalPesquisa] = useState(false); // inicializa o modal oculto
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O Funcionário
  const [find, setFind] = useState(false);

  const [idFor, setIdFor] = useState("");
  const [nomeFor, setNomeFor] = useState("");
  const [cpfCnpjFor, setCpfCnpjFor] = useState("");
  const [telefoneFor, setTelefoneFor] = useState("");
  const [emailFor, setEmailFor] = useState("");
  const [enderecoFor, setEnderecoFor] = useState("");

  const navigation = useNavigation(); // Inicialize o hook de navegação

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //CRUD Funcionário
  //function para cadastrar o Funcionário
  const handleCadastro = async () => {
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
        "Preencha todos os campos para cadastrar o funcionário!",
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
          "http://192.168.100.3:3000/cadastraFuncionario",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              cpfcnpj: cpfCnpj,
              telefone: telefone,
              email: email,
              endereco: endereco,
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
                setCpfCnpj("");
                setTelefone("");
                setEmail("");
                setEndereco("");
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
    }
  };

  //function para pesquisar o Funcionário
  const [nomeFind, setNomeFind] = useState("");
  const [cpfCnpjFind, setCpfCnpjFind] = useState("");

  const handlePesquisa = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && cpfCnpjFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha os campos para pesquisar funcionários!",
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
        let baseUrl = "http://192.168.100.3:3000/buscaFuncionario";
        let params = {
          nome: nomeFind,
          cpfcnpj: cpfCnpjFind,
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
           // Extrair dados JSON da resposta

          //console.log(data);
          setNome(data.nome);
          setCpfCnpj(data.cpfcnpj);
          setTelefone(data.telefone);
          setEmail(data.email);
          setEndereco(data.endereco);

          setIdFor(data.id);
          setNomeFor(data.nome);
          setCpfCnpjFor(data.cpfcnpj);
          setTelefoneFor(data.telefone);
          setEmailFor(data.email);
          setEnderecoFor(data.endereco);

          //SE ENCONTRAR CLIENTE, MARCAR ESTADO COMO VERDADEIRO PARA PODER ALANISAR EDIÇÃO DO CADASTRO
          setFind(true);
        } else {
          Alert.alert(
            "Atenção!", data.message
          );
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
    toggleModalPesquisa();
  };

  //function para alterar o Funcionário
  const handleAltera = async () => {
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
      const funcionarioBuscado = {
        id: idFor,
        nome: nomeFor,
        cpfcnpj: cpfCnpjFor,
        telefone: telefoneFor,
        email: emailFor,
        endereco: enderecoFor,
      };

      if (
        funcionarioBuscado.nome != nome ||
        funcionarioBuscado.cpfcnpj != cpfCnpj ||
        funcionarioBuscado.telefone != telefone ||
        funcionarioBuscado.email != email ||
        funcionarioBuscado.endereco != endereco
      ) {
        (funcionarioBuscado.nome = nome),
          (funcionarioBuscado.cpfcnpj = cpfCnpj),
          (funcionarioBuscado.telefone = telefone),
          (funcionarioBuscado.email = email),
          (funcionarioBuscado.endereco = endereco);
        try {
          const response = await fetch(
            "http://192.168.100.3:3000/alteraFuncionario",
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(funcionarioBuscado),
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
                  setCpfCnpj("");
                  setTelefone("");
                  setEmail("");
                  setEndereco("");

                  //LIMPA O ESTADO DO FUNCIONARIO ENCONTRADO
                  setIdFor("");
                  setNomeFor("");
                  setCpfCnpjFor("");
                  setTelefoneFor("");
                  setEmailFor("");
                  setEnderecoFor("");

                  //MUDA ESTADO DE CLIENTE ENCONTRADO PARA FALSE, PAR ESCONDER BOTOES DE ALTERAÇÃO
                  setFind(false);
                },
              },
            ]);
          } else {
            Alert.alert("Atenção1", data.message );
          }
        } catch (error) {
          console.error("Erro na requisição: ", error);
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

  //function para deletar o Funcionário
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
      var confirm_delete = false;
      Alert.alert(
        "Atenção!",
        "Deseja realmente deletar o registro deste funcionario? ",
        [
          {
            text: "Deletar Funcionario",
            onPress: async () => {
              try {
                let response = await fetch(
                  "http://192.168.100.3:3000/deletaFuncionario",
                  {
                    method: "DELETE",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: idFor,
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
                        setCpfCnpj("");
                        setTelefone("");
                        setEmail("");
                        setEndereco("");

                        //LIMPA O ESTADO DO CLIENTE ENCONTRADO
                        setIdFor("");
                        setNomeFor("");
                        setCpfCnpjFor("");
                        setTelefoneFor("");
                        setEmailFor("");
                        setEnderecoFor("");

                        //MUDA ESTADO DE CLIENTE ENCONTRADO PARA FALSE, PAR ESCONDER BOTOES DE ALTERAÇÃO
                        setFind(false);
                      },
                    },
                  ]);
                } else {
                  Alert.alert("Atenção!", data.message );
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
          <Text style={styles.goBackButton}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Dados do Funcionário</Text>
        <Text style={styles.inpText}>Nome do Funcionário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Funcionário"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Text style={styles.inpText}>CPF ou CNPJ do Funcionário:</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          value={cpfCnpj}
          onChangeText={(text) => setCpfCnpj(text)}
        />
        <Text style={styles.inpText}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />
        <Text style={styles.inpText}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inpText}>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar Funcionário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
          <Text style={styles.buttonText}>Pesquisar/Alterar Funcionário</Text>
        </TouchableOpacity>

        {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM Funcionário */}
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
              <Text style={styles.modalTitle}>Pesquisar Funcionário</Text>
              <Text style={styles.inpText}>CPF ou CNPJ do Funcionário:</Text>
              <TextInput
                placeholder="CPF ou CNPJ"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={cpfCnpjFind}
                onChangeText={(text) => {
                  setCpfCnpjFind(text);
                }}
              />
              <Text style={styles.inpText}>Nome do Funcionário:</Text>
              <TextInput
                placeholder="Nome do Funcionário"
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
  inpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
