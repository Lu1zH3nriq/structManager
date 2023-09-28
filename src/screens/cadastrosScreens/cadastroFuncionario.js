import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook de navegação

export default function CadCliente() {
  const navigation = useNavigation(); // Inicialize o hook de navegação

  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleCadastroCliente = () => {



    // Aqui você pode adicionar a lógica para enviar os dados do cliente para o servidor
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}> 
        <Text style={styles.goBackButton}>{'< Voltar'}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Cadastrar novo Funcionário</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleCadastroCliente}>
        <Text style={styles.buttonText}>Cadastrar Funcionário</Text>
      </TouchableOpacity>
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
});
