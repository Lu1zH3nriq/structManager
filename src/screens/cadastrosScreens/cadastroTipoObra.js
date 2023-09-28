import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import ModalPesquisa from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'; // Importe o hook de navegação

export default function CadTipoObra() {
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
  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [etiqueta, setEtiqueta] = useState('');

  const handleCadastro = () => {



    // Aqui você pode adicionar a lógica para enviar os dados do cliente para o servidor

  };

  const handleCancelar = () => {
    setNome('');
    setCodigo('');
    setModelo('');
    setMarca('');
    setEtiqueta('');

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
        <Text style={styles.heading}>Tipos de Obras</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Equipamento"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código"
          value={codigo}
          onChangeText={text => setCodigo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={text => setModelo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={marca}
          onChangeText={text => setMarca(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Etiqueta"
          value={etiqueta}
          onChangeText={text => setEtiqueta(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar Tipo de Obra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
          <Text style={styles.buttonText}>Pesquisar/Alterar </Text>
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

              <Text style={styles.modalTitle}>Pesquisar </Text>

              <TextInput
                placeholder="Tipo de Obra"
                style={styles.input}
                placeholderTextColor={'grey'}
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
    alignSelf: 'center'
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
