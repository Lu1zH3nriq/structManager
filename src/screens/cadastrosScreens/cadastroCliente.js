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
import ModalPesquisaCliente from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function CadCliente() {
  const [isModalPesquisaCliente, setModalPesquisaCliente] = useState(false); // inicializa o modal oculto
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  //SETAR O ESTADO COMO FALSE PARA ACHAR O CLIENTE
  const [find, setFind] = useState(false);
  const cliente = {
    id: "",
    nome:"",
    cpfcnpj:"",
    telefone:"",
    email:"",
    endereco:""
  };

  const navigation = useNavigation(); // Inicialize o hook de navegação

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisaCliente = () => {
    setModalPesquisaCliente(!isModalPesquisaCliente);
  };

  //CRUD CLIENTE
  //function para cadastrar o cliente
  const handleCadastroCliente = async () => {
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
        "Preencha todos os campos para cadastrar o cliente!",
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
          "http://192.168.100.3:3000/cadastraCliente",
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

        if (response.status === 200) {
          Alert.alert("Sucesso!", "Cliente cadastrado com sucesso!", [
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
          Alert.alert("Erro ao cadastrar cliente.");
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
  };

  //function para pesquisar o cliente
  const [nomeFind, setNomeFind] = useState("");
  const [cpfCnpjFind, setCpfCnpjFind] = useState("");

  const handlePesquisaCliente = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && cpfCnpjFind === "") {
      Alert.alert("Atenção!", "Preencha os campos para pesquisar um cliente!", [
        {
          text: "Ok",
        },
      ]);
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaCliente";
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

        if (response.status === 200) {
          const data = await response.json(); // Extrair dados JSON da resposta

          //console.log(data);
          
          cliente.id = data.id;
          cliente.nome = data.nome;
          cliente.cpfcnpj = data.cpfcnpj;
          cliente.telefone = data.telefone;
          cliente.email = data.email;
          cliente.endereco = data.endereco;
            
          //console.log(cliente);
          setNome(cliente.nome);
          setCpfCnpj(cliente.cpfcnpj);
          setTelefone(cliente.telefone);
          setEmail(cliente.email);
          setEndereco(cliente.endereco);


          //SE ENCONTRAR CLIENTE, MARCAR ESTADO COMO VERDADEIRO PARA PODER ALANISAR EDIÇÃO DO CADASTRO
          setFind(true);
        } else {
          Alert.alert("Erro ao buscar este cliente ou cliente não cadastrado!");
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
    toggleModalPesquisaCliente();
  };

  //function para alterar o cliente
  const handleAlteraCliente = async () => {
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
        "Preencha todos os campos para alterar este cliente!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      const clienteAlterado = {
        id: cliente.id,
        nomeAlterado: nome,
        cpfcnpjAlterado: cpfCnpj,
        telefoneAlterado: telefone,
        emailAlterado: email,
        enderecoAlterado: endereco,
      };

      

      console.log("cliente  : ",clienteAlterado);
    }
  };

  //function para deletar o cliente
  const handleDeletaCliente = () => {
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
        "Preencha todos os campos para cadastrar o cliente!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, BUSCAR SE JA EXISTE
    else {
      //buscar cliente
      //se achar, informar que o cliente ja está cadastrado
      //se nao achar, cadastrar o cliente

      // DEPOIS DE CADASTRAR
      Alert.alert();

      // LIMPAR TODOS OS CAMPOS
      setNome("");
      setCpfCnpj("");
      setTelefone("");
      setEmail("");
      setEndereco("");
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
        <Text style={styles.heading}>Dados do Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
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
        <TouchableOpacity style={styles.button} onPress={handleCadastroCliente}>
          <Text style={styles.buttonText}>Cadastrar Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleModalPesquisaCliente}
        >
          <Text style={styles.buttonText}>Pesquisar/Alterar Cliente</Text>
        </TouchableOpacity>

        {/*MOSTRAR OS BOTOES DE ALTERAR E EXLCUIR SOMENTE SE ACHAR UM CLIENTE */}
        {find ? (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleAlteraCliente}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Excluir Cadastro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grayBackground}></View>
        )}

        <ModalPesquisaCliente
          isVisible={isModalPesquisaCliente}
          onBackdropPress={toggleModalPesquisaCliente}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Pesquisar Cliente</Text>

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
                placeholder="Nome do Cliente"
                style={styles.input}
                placeholderTextColor={"grey"}
                value={nomeFind}
                onChangeText={(text) => {
                  setNomeFind(text);
                }}
              />

              <TouchableOpacity
                onPress={handlePesquisaCliente}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Pesquisar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ModalPesquisaCliente>
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

/* 
if (
        clienteAlterado.nomeAlterado != cliente.nome ||
        clienteAlterado.cpfcnpjAlterado != cliente.cpfcnpj ||
        clienteAlterado.telefoneAlterado != cliente.telefone ||
        clienteAlterado.emailAlterado != cliente.email ||
        clienteAlterado.enderecoAlterado != cliente.endereco
      ) {
        try {
          let response = await fetch(
            "http://192.168.100.3:3000/alteraCliente",
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clienteAlterado),
            }
          );

          if (response.status === 200) {
            Alert.alert("Sucesso!", "Cliente alterado com sucesso!", [
              {
                text: "Confirmar",
                onPress: () => {
                  // LIMPAR TODOS OS CAMPOS
                  setNome("");
                  setCpfCnpj("");
                  setTelefone("");
                  setEmail("");
                  setEndereco("");

                  setFind(false);
                },
              },
            ]);
          } else {
            Alert.alert("Erro ao atualizar cliente.");
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

*/
