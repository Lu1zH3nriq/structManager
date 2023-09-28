import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import ModalPesquisa from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'; // Importe o hook de navegação

export default function CadEquipamento() {
  const [isModalPesquisa, setModalPesquisa] = useState(false) // inicializa o modal oculto

  //function para alterar a visibilidade do modal
  const toggleModalPesquisa = () => {
    setModalPesquisa(!isModalPesquisa);
  }

  //function para pesquisar o cliente e alterar os dados
  const togglePesquisa = () => {
    //lógica para pesquisar o cliente e trazer os dados para a tela onde tem os campos
    toggleModalPesquisa();
  }



  const navigation = useNavigation(); // Inicialize o hook de navegação

  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleCadastroFuncionario = () => {



    // Aqui você pode adicionar a lógica para enviar os dados do cliente para o servidor

  };

  const handleCancelar = () => {
    setNome('');
    setCpfCnpj('');
    setTelefone('');
    setEmail('');
    setEndereco('');

    //navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackButton}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Dados do Funcionário</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Funcionário"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF ou CNPJ"
          value={cpfCnpj}
          onChangeText={text => setCpfCnpj(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={text => setTelefone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={text => setEndereco(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastroFuncionario}>
          <Text style={styles.buttonText}>Cadastrar Funcionário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
          <Text style={styles.buttonText}>Pesquisar/Alterar Funcionário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Excluir Cadastro</Text>
        </TouchableOpacity>


        <ModalPesquisa isVisible={isModalPesquisa} onBackdropPress={toggleModalPesquisa}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalContainer}>

              <Text style={styles.modalTitle}>Pesquisar Funcionário</Text>

              <TextInput
                placeholder="CPF ou CNPJ"
                style={styles.input}
              />

              <TextInput
                placeholder="Nome do Funcionário"
                style={styles.input}
              />

              <TouchableOpacity
                onPress={togglePesquisa}
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
  },
  heading: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  goBackButton: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: 3,
    right: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
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
});
