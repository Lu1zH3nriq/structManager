import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalAdd from "react-native-modal";

export default function MaterialScreen({ navigation, route }) {
  const obra = route.params?.obra || {};
  const [materiais, setMateriais] = useState([]);
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [nomeMaterial, setNomeMaterial] = useState("");
  const [quantidadeMaterial, setQuantidadeMaterial] = useState("");

  const toggleModalAdd = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButton}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Gestão de Materiais</Text>
        <Text style={styles.textoHeader}>
          Contrato da Obra: {obra.numContrato}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleModalAdd}>
          <Text style={styles.buttonText}><Icon name="plus" size={15} color="white"/> Adicionar</Text>
        </TouchableOpacity>
      </View>

      <ModalAdd
        isVisible={isModalPesquisaVisible}
        onBackdropPress={toggleModalAdd}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Material</Text>
          <Text style={styles.inpText}>Nome do Material:</Text>
          <TextInput
            placeholder="Nome do Material"
            style={styles.input}
            placeholderTextColor="grey"
            value={nomeMaterial}
            onChangeText={(text) => setNomeMaterial(text)}
          />
          <Text style={styles.inpText}>Quantidade do Material:</Text>
          <TextInput
            placeholder="Quantidade "
            style={styles.input}
            placeholderTextColor="grey"
            value={quantidadeMaterial}
            onChangeText={(text) => setQuantidadeMaterial(text)}
          />
          <TouchableOpacity onPress={() => {}} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ModalAdd>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
  },
  goBackButton: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
  textoHeader: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: "10%",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  listMateriais: {
    flex: 1,
    paddingHorizontal: 10,
  },
  deleteIconContainer: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "90%",
    borderRadius: 8,
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
  input: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: "white",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
