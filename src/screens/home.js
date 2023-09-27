import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleModal}>
        <Icon name="search" size={30} color="white" style={styles.searchIcon} />
      </TouchableOpacity>
      <Text style={styles.text}>Aqui as obras cadastradas serão mostradas</Text>
      <View style={styles.footer}>
        <Icon name="plus" size={30} color="white" style={styles.addIcon} />
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pesquisar por nome</Text>
          <TextInput
            placeholder="Digite o nome"
            style={styles.input}
            placeholderTextColor="white"
            color="white"
          />
          <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  addIcon: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: '#454A50',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
