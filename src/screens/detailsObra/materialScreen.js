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
  const [codigoMaterial, setCodigoMaterial] = useState("");
  const [quantidadeMaterial, setQuantidadeMaterial] = useState("");

  const toggleModalAdd = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  const addMaterial = async () => {
    try {
      const response = await fetch("http://192.168.100.3:3000/addMaterial", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obraId: obra.id,
          materialName: nomeMaterial,
          materialCod: codigoMaterial,
          materialQuant: quantidadeMaterial,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Sucesso!", data.message, [
          {
            text: "Ok",
            onPress: () => {
              setMateriais(data.materiais);

              setNomeMaterial("");
              setQuantidadeMaterial("");
              setCodigoMaterial("");
              toggleModalAdd();
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
      Alert.alert("Atenção!", "Erro de requisição ao adicionar material.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const getMateriais = async () => {
    try {
      let baseUrl = "http://192.168.100.3:3000/buscaMateriais";
      let params = {
        obraId: obra.id,
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
        setMateriais(data);
      } else {
        console.log("Erro ao buscar todos os materiais desta obra!");
      }
    } catch (error) {
      console.log("Erro ao buscar todos os materiais: " + error);
    }
  };
  useEffect(() => {
    getMateriais();
  }, []);

  const deleteMaterial = async ({ item }) => {

    try {
      const response = await fetch(`http://192.168.100.3:3000/removeMaterial`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.obraMateriais.id,
          obraId: obra.id,
          materialId: item.obraMateriais.materialId,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log(data.materiais);

        Alert.alert("Sucesso!", data.message, [
          {
            text: "Ok",
            onPress: () => {setMateriais(data.materiais)},
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
      Alert.alert("Atenção!", "Erro de requisição ao remover material.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const renderMaterialItem = ({ item }) => {
    const swipeRightActions = () => (
      <View style={styles.deleteIconContainer}>
        <TouchableOpacity onPress={() => deleteMaterial({ item })}>
          <Icon name="trash" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable renderRightActions={swipeRightActions}>
        <View style={styles.materialItem}>
          <Text style={styles.materialItemText}>Nome: {item?.nome}</Text>
          <Text style={styles.materialItemText}>
            Quantidade: {item?.obraMateriais?.quantidade}
          </Text>
        </View>
      </Swipeable>
    );
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
          <Text style={styles.buttonText}>
            <Icon name="plus" size={15} color="white" /> Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listMateriais}>
        <FlatList
          data={materiais}
          keyExtractor={(item) => (item ? item.id.toString() : null)}
          renderItem={({ item }) => renderMaterialItem({ item })}
        />
      </View>

      <ModalAdd
        isVisible={isModalPesquisaVisible}
        onBackdropPress={toggleModalAdd}
      >
        <KeyboardAvoidingView>
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
            <Text style={styles.inpText}>Código do Material:</Text>
            <TextInput
              placeholder="Código "
              style={styles.input}
              placeholderTextColor="grey"
              value={codigoMaterial}
              onChangeText={(text) => setCodigoMaterial(text)}
            />
            <Text style={styles.inpText}>Quantidade do Material:</Text>
            <TextInput
              placeholder="Quantidade "
              style={styles.input}
              placeholderTextColor="grey"
              value={quantidadeMaterial}
              onChangeText={(text) => setQuantidadeMaterial(text)}
            />
            <TouchableOpacity onPress={addMaterial} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    height: "87%",
    borderRadius: 8,
  },
  materialItem: {
    backgroundColor: "#60656A",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  materialItemText: {
    color: "white",
    fontSize: 16,
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
