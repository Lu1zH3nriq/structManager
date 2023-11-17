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
import format from "date-fns/format";

export default function UpdateObra({ navigation, route }) {
  const obra = route.params?.obra || {};

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

  const [selectedValue, setSelectedValue] = useState("");
  const [tiposObras, setTiposObras] = useState([]);

  const [clientIdBuscado, setClientIdBuscado] = useState("");
  const [clientNomeBuscado, setclientNomeBuscado] = useState("");
  const [clientTelefoneBuscado, setClientTelefoneBuscado] = useState("");

  const handleSetarCampos = () => {
    const dataInicioFormatada = format(new Date(obra.dataInicio), "dd/MM/yyyy");
    const dataFimFormatada = format(new Date(obra.dataFim), "dd/MM/yyyy");

    setCodigo(obra.codigo);
    setNomeObra(obra.nome);
    setCliente("");
    setTelefone("");
    setEndereco(obra.endereco);
    setNumContrato(obra.numContrato);
    setNumAlvara(obra.numAlvara);
    setRTProjeto(obra.RTProjeto);
    setRTExec(obra.RTExec);
    setDataInicio(dataInicioFormatada);
    setDataTermino(dataFimFormatada);
    setOrcamento(obra.orcamento);
    setSelectedValue(obra.TipoObra.tipo);
  };

  const handleValidaCampos = () => {
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

    setClientIdBuscado("");
    setclientNomeBuscado("");
    setClientTelefoneBuscado("");

    navigation.goBack();
  };

  // Função para formatar a data
  function formatarData(dataString) {
    const [dia, mes, ano] = dataString.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  const compare = () => {
    const obraAlterada = {
      codigo: codigo,
      nomeObra: nomeObra,
      cliente: clientIdBuscado,
      telefone: clientTelefoneBuscado,
      endereco: endereco,
      numContrato: numContrato,
      numAlvara: numAlvara,
      RTProjeto: RTProjeto,
      RTExec: RTExec,
      dataInicio: formatarData(dataInicio),
      dataTermino: formatarData(dataTermino),
      orcamento: orcamento,
      tipoObraId: selectedValue,
    };

    for (const key in obraAlterada) {
      if (obraAlterada[key] !== obra[key]) {
        return 1;
      }
    }

    return 0;
  };

  //FUNCTION PARA CADASTRAR NOVA OBRA
  const handleUpdate = async () => {
    const validaCampos = handleValidaCampos();

    if (validaCampos === 0) {
      Alert.alert("Atenção!", "Preencha os campos para cadastrar nova obra!", [
        {
          text: "Ok",
        },
      ]);
    } else {
      const _compare = compare();
      if (_compare === 1) {
        try {
          const _obraAlterada = {
            id: obra.id,
            codigo: codigo,
            nomeObra: nomeObra,
            cliente: clientIdBuscado,
            telefone: clientTelefoneBuscado,
            endereco: endereco,
            numContrato: numContrato,
            numAlvara: numAlvara,
            RTProjeto: RTProjeto,
            RTExec: RTExec,
            dataInicio: formatarData(dataInicio),
            dataTermino: formatarData(dataTermino),
            orcamento: orcamento,
            tipoObraId: selectedValue,
          };
          const response = await fetch("http://192.168.100.3:3000/alteraObra", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(_obraAlterada),
          });

          const data = await response.json();
          if (response.status === 200) {
            Alert.alert("Sucesso!", data.message, [
              {
                text: "Confirmar",
                onPress: () => {
                  // LIMPAR TODOS OS CAMPOS
                  handleCancelar();
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
      } else {
        Alert.alert("Atenção!", "Nenhum campo alterado, nada para salvar!", [
          {
            text: "Ok",
          },
        ]);
      }
    }
  };

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
        setClientIdBuscado(data.id);
        setclientNomeBuscado(data.nome);
        setClientTelefoneBuscado(data.telefone);
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

  const getClienteObra = async () => {
    try {
      let baseUrl = "http://192.168.100.3:3000/buscaCliente/Id";
      let params = {
        id: obra.clienteId,
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

        setTiposObras(tipos);
      } else {
        //console.error("Erro ao buscar tipos de obras do servidor.");
      }
    } catch (error) {
      //console.error("Erro ao buscar tipos de obras: " + error);
    }
  };

  useEffect(() => {
    handleSetarCampos();
    getTiposDeObra();
    getClienteObra();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.heading}>Dados da Obra</Text>
          <TextInput
            style={styles.input}
            placeholder="Código da Obra"
            keyboardType="numeric"
            value={codigo}
            onChangeText={(text) => setCodigo(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome da Obra"
            value={nomeObra}
            onChangeText={(text) => setNomeObra(text)}
          />
          <View style={styles.clienteContainer}>
            <TextInput
              style={styles.inputCliente}
              placeholder="Cliente da Obra  (CPF/CNPJ)"
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
          <TextInput
            style={styles.input}
            placeholder="Contato do cliente"
            editable={false}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço da Obra"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Número do Contrato"
            keyboardType="numeric"
            value={numContrato}
            onChangeText={(text) => setNumContrato(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Número do Alvará"
            keyboardType="numeric"
            value={numAlvara}
            onChangeText={(text) => setNumAlvara(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Responsável de Projeto"
            value={RTProjeto}
            onChangeText={(text) => setRTProjeto(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Responsável de Execução"
            value={RTExec}
            onChangeText={(text) => setRTExec(text)}
          />

          {/* DROPDOWN PARA SELECIONAR O TIPO DE OBRA CADASTRADOS NO BANCO */}
          <Text style={styles.label}>Escolha o tipo de obra:</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.dropdown}
          >
            {tiposObras.map((tipo) => (
              <Picker.Item label={tipo.tipo} value={tipo.id} key={tipo.id} />
            ))}
          </Picker>

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

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
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
