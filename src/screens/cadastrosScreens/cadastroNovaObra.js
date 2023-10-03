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
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";

export default function CadastroNovaObra() {
  const navigation = useNavigation(); // Inicialize o hook de navegação

  const [isModalPesquisa, setModalPesquisa] = useState(false);
  const [codigo, setCodigo] = useState(""); // inicializa o modal oculto
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
  const [selectedValue, setSelectedValue] = useState("option1");
  //SETAR O ESTADO COMO FALSE PARA ACHAR a Nova Obra
  const [find, setFind] = useState(false);
  //function para pesquisar o Nova Obra
  const [nomeFind, setNomeFind] = useState("");
  const [codFind, setCodFind] = useState("");
  

  //function para alterar a visibilidade do modal de pesquisa
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  };

  //FUNCTION PARA VALIDAR CAMPOS VAZIOS DO CADASTRO
  const handleValidaCadastro = ()=>{
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
    else{
      return 1;
    }

  }
  
  //FUNCTION PARA VALIDAR CAMPOS VAZIOS DA PESQUISA
  const handleValidaPesquisa = ()=>{
    //VERIFICA SE OS CAMPOS ESTÃO VAZIOS
    if (nomeFind === "" && codFind === "") {
      return 0;
    }
    //SE OS CAMPOS NÃO ESTIVEREM VAZIOS
    else {
      return 1;
    }
    
  }

  //LIMPAR OS CAMPOS
  const handleCancelar = () => {
    setCodigo("");
    setNomeObra("");
    setCliente("");
    setTelefone("");
    setEndereco("");
    setEndereco("");
    setNumContrato("");
    setNumAlvara("");
    setRTProjeto("");
    setRTExec("");
    setDataInicio("");
    setDataTermino("");
    setOrcamento("");
    setNomeFind("");
    setCodFind("");
    setFind(false);

  };


  //CRUD DE OBRAS
  //function para cadastrar o Nova Obra
  const handleCadastro = () => {
    const validaCampos = handleValidaCadastro ();

    if (validaCampos === 0 ){
      Alert.alert("Atenção!", "Preencha os campos para cadastrar nova obra!", [
        {
          text: "Ok",
        },
      ]);
    }


    else{


      // REALIZAR CADASTRO NO BANCO DE DADOS DA NOVA OBRA

      Alert.alert("Sucesso!", "Obra cadastrada com sucesso!", [
        {
          text: "Confirmar",
        },
      ]);
      handleCancelar();
    }

  };

  //FUNCTIO PARA PESQUISAR OBRAS CADASTRADAS
  const handlePesquisa = () => {
    const validaCampos = handleValidaPesquisa ();

    if (validaCampos === 0 ){
      Alert.alert("Atenção!", "Preencha os campos para pesquisar Obras!", [
        {
          text: "Ok",
        },
      ]);
    }


    else{


      // REALIZAR PESQUISA NO BANCO DE DADOS DE ACORDO COM OS CAMPOS INFORMADOS

      setFind(true);
      toggleModalPesquisa();
    }
  };

  //FUNCTION PARA ALTERAR OBRA CADASTRADA
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

  //FUNCTION PARA DELETAR OBRA CADASTRADA
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

  

  return (
    <ScrollView>
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
          <Text style={styles.heading}>Dados da Nova Obra</Text>
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
              placeholder="Cliente da Obra  (NOME OU CPF/CNPJ)"
              value={cliente}
              onChangeText={(text) => setCliente(text)}
            />
            <TouchableOpacity onPress={() => {}}>
              <Icon
                sytle={styles.iconCliente}
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
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.dropdown}
          >
            <Picker.Item label="Opção 1" value="option1" />
            <Picker.Item label="Opção 2" value="option2" />
            <Picker.Item label="Opção 3" value="option3" />
            <Picker.Item label="Opção 4" value="option4" />
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
            onChangeText={ (text) => { setOrcamento(text) } }
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar Nova Obra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
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

          {/* PESQUISA OBRAS CADASTRADAS, PARA ALTERAR OU EXLCUIR REGISTRO */}
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
                  placeholder="Código da Obra"
                  style={styles.input}
                  placeholderTextColor={"grey"}
                  value={codFind}
                  onChangeText={(text) => {
                    setCodFind(text);
                  }}
                />

                <TextInput
                  placeholder="Nome da Obra"
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
    width: '82%',
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
