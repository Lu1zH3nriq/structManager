import React, { useState, useEffect } from "react";
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
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";

export default function CadastroNovaObra({ navigation, route }) {
  const { onGoBack } = route.params || {};


  const [codigo, setCodigo] = useState("");
  const [nomeObra, setNomeObra] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numContrato, setNumContrato] = useState("");
  const [numAlvara, setNumAlvara] = useState("");
  const [RTProjeto, setRTProjeto] = useState("");
  const [RTExec, setRTExec] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [orcamento, setOrcamento] = useState("");

  //SELECT OPTION DO DROPDOWN DE TIPO DE OBRA
  const [selectedValue, setSelectedValue] = useState("");
  const [tipoObra, setTipoObra] = useState([]);

  //FUNCTION PARA VALIDAR CAMPOS VAZIOS DO CADASTRO
  const handleValidaCadastro = () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (
      codigo === "" &&
      nomeObra === "" &&
      telefone === "" &&
      cliente === "" &&
      endereco === "" &&
      numContrato === "" &&
      numAlvara === "" &&
      dataInicio === ""

      //SE TIVER MAIS CAMPOS OBRIGATÓRIOS, COLOCAR AQUI
    ) {
      return 0;
    }

    // SE OS CAMPOS NÃO ESTIVEREM VAZIOS
    else {
      return 1;
    }
  };

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setCodigo("");
    setNomeObra("");
    setCliente("");
    setTelefone("");
    setEndereco("");
    setNumContrato("");
    setNumAlvara("");
    setRTProjeto("");
    setRTExec("");
    setDataInicio("");
    setDataTermino("");
    setOrcamento("");
    setSelectedValue("");
    setIdClienteBuscado("");
    setNomeClienteBuscado("");
    setTelefoneClienteBuscado("");
  };

  
  //FUNCTION PARA CADASTRAR NOVA OBRA
  const handleCadastro = async () => {
    const validaCampos = handleValidaCadastro();

    if (validaCampos === 0) {
      Alert.alert("Atenção!", "Preencha os campos para cadastrar nova obra!", [
        {
          text: "Ok",
        },
      ]);
    } else {
      const novaObra = {
        codigo: codigo,
        nome: nomeObra,
        clienteId: idClienteBuscado,
        endereco: endereco,
        numContrato: numContrato,
        numAlvara: numAlvara,
        rtProjeto: RTProjeto,
        rtExec: RTExec,
        dataInicio: formatarData(dataInicio),
        dataFim: formatarData(dataTermino),
        orcamento: orcamento,
        tipoObraId: selectedValue,
      };

      // Função para formatar a data
      function formatarData(dataString) {
        const [dia, mes, ano] = dataString.split("/");
        return `${ano}-${mes}-${dia}`;
      }
      try {
        const response = await fetch("http://192.168.100.3:3000/cadastraObra", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaObra),
        });

        const data = await response.json();
        if (response.status === 200) {
          Alert.alert("Sucesso!", data.message, [
            {
              text: "Confirmar",
              onPress: () => {
                // LIMPAR TODOS OS CAMPOS
                handleCancelar();

                if (onGoBack) {
                  onGoBack();
                }

                navigation.goBack();
              },
            },
          ]);
        } else {
          Alert.alert("Atenção!", data.message, [
            {
              text: "Ok",
            },
          ]);
        }
      } catch (error) {
        Alert.alert("Atenção!", "Erro ao cadastrar nova obra!", [
          {
            text: "Ok",
          },
        ]);
        console.error("Erro ao cadastrar nova obra: " + error);
      }
    }
  };

  //BUSCAR CLIENTE PARA CADASTRAR A OBRA
  const [idClienteBuscado, setIdClienteBuscado] = useState("");
  const [nomeClienteBuscado, setNomeClienteBuscado] = useState("");
  const [telefoneClienteBuscado, setTelefoneClienteBuscado] = useState("");

  const getCliente = async () => {
    try {
      let baseUrl = "http://192.168.100.3:3000/pesquisaCliente";
      let params = {
        cpfcnpj: cliente,
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
        setCliente(data.nome);
        setTelefone(data.telefone);
        setIdClienteBuscado(data.id);
        setNomeClienteBuscado(data.nome);
        setTelefoneClienteBuscado(data.telefone);
      } else {
        Alert.alert("Atenção!", data.message, [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Atenção!", "Erro ao buscar cliente!", [
        {
          text: "Ok",
        },
      ]);
      //console.error("Erro ao buscar cliente: " + error);
    }
  };
  //BUSCA TODAS AS OBRAS CADASTRADAS NO BANCO DE DADOS
  const getTiposDeObra = async () => {
    try {
      // Fazer uma solicitação GET ao servidor para buscar os tipos de obras
      const response = await fetch("http://192.168.100.3:3000/tiposObras", {
        method: "GET",
      });

      if (response.status === 200) {
        // Se a solicitação for bem-sucedida, obtenha os tipos de obras da resposta
        const tipos = await response.json();

        setTipoObra(tipos);
      } else {
        //console.error("Erro ao buscar tipos de obras do servidor.");
      }
    } catch (error) {
      //console.error("Erro ao buscar tipos de obras: " + error);
    }
  };

  useEffect(() => {
    getTiposDeObra();
  }, []);

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
          <Text style={styles.heading}>Dados da Nova Obra</Text>
          <Text style={styles.inpText}>Código da Obra:</Text>
          <TextInput
            style={styles.input}
            placeholder="Código da Obra"
            keyboardType="numeric"
            value={codigo}
            onChangeText={(text) => setCodigo(text)}
          />
          <Text style={styles.inpText}>Nome da Obra:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Obra"
            value={nomeObra}
            onChangeText={(text) => setNomeObra(text)}
          />
          <Text style={styles.inpText}>Cliente da Obra:</Text>
          <View style={styles.clienteContainer}>
            <TextInput
              style={styles.inputCliente}
              placeholder="CPF DO CLIENTE"
              value={cliente}
              onChangeText={(text) => setCliente(text)}
            />
            <TouchableOpacity onPress={getCliente}>
              <Icon
                style={styles.iconCliente}
                name="search"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inpText}>Telefone do Cliente:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contato do cliente"
            editable={false}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
          <Text style={styles.inpText}>Endereço da Obra:</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço da Obra"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          <Text style={styles.inpText}>Número do Contrato:</Text>
          <TextInput
            style={styles.input}
            placeholder="Número do Contrato"
            keyboardType="numeric"
            value={numContrato}
            onChangeText={(text) => setNumContrato(text)}
          />
          <Text style={styles.inpText}>Número do Alvará:</Text>
          <TextInput
            style={styles.input}
            placeholder="Número do Alvará"
            keyboardType="numeric"
            value={numAlvara}
            onChangeText={(text) => setNumAlvara(text)}
          />
          <Text style={styles.inpText}>Responsável do Projeto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Responsável do Projeto"
            value={RTProjeto}
            onChangeText={(text) => setRTProjeto(text)}
          />
          <Text style={styles.inpText}>Responsável da Execução:</Text>
          <TextInput
            style={styles.input}
            placeholder="Responsável da Execução"
            value={RTExec}
            onChangeText={(text) => setRTExec(text)}
          />

          {/* DROPDOWN PARA SELECIONAR O TIPO DE OBRA CADASTRADOS NO BANCO */}
          <Text style={styles.label}>Escolha o tipo de obra:</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.dropdown}
          >
            {tipoObra.map((tipo) => (
              <Picker.Item label={tipo.tipo} value={tipo.id} key={tipo.id} />
            ))}
          </Picker>
          <Text style={styles.inpText}>Data de Início:</Text>
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            placeholder="Data de Início"
            style={styles.input}
            placeholderTextColor="grey"
            color="grey"
            value={dataInicio}
            onChangeText={(text) => setDataInicio(text)}
            keyboardType="numeric"
          />
          <Text style={styles.inpText}>Data prevista para o término:</Text>
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            placeholder="Data de Término"
            style={styles.input}
            placeholderTextColor="grey"
            color="grey"
            value={dataTermino}
            onChangeText={(text) => setDataTermino(text)}
            keyboardType="numeric"
          />
          <Text style={styles.inpText}>Orçamento da Obra:</Text>
          <TextInputMask
            type={"money"}
            placeholder="Orçamento da Obra"
            placeholderTextColor="grey"
            options={{
              precision: 2, // Número de casas decimais
              separator: ",", // Separador decimal
              delimiter: ".", // Separador de milhares
              unit: "R$ ", // Prefixo do valor (opcional)
              suffixUnit: "", // Sufixo do valor (opcional)
            }}
            style={styles.input}
            value={orcamento}
            onChangeText={(text) => {
              setOrcamento(text);
            }}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar Nova Obra</Text>
          </TouchableOpacity>
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
  inpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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

  clienteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputCliente: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: "82%",
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  dropdown: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
