import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalPesquisa from "react-native-modal";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

// Suponha que você tenha uma função que recupera as obras do banco de dados
// Substitua esta função pela lógica real de busca no banco de dados
const getObrasFromDatabase = async () => {
  // Aqui você deve fazer a busca real no banco de dados
  // e retornar os dados das obras
  return [
    { id: 1, nome: "Obra 1", tipo: "Tipo 1", dataInicio: "01/01/2023" },
    { id: 2, nome: "Obra 2", tipo: "Tipo 2", dataInicio: "02/01/2023" },
    // Adicione mais obras conforme necessário
  ];
};

function ObraCard({ obra, navigation }) {
  const navigateToDetails = () => {
    navigation.navigate("DetailsObra", { obra });
  };

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <View style={styles.obraCard}>
        <Text>ID: {obra.id}</Text>
        <Text>Nome: {obra.nome}</Text>
        <Text>Tipo: {obra.tipo}</Text>
        <Text>Data de Início: {obra.dataInicio}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function GerenciarObras() {
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [obras, setObras] = useState([]);

  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  const navigation = useNavigation();

  const toggleCadastrarObra = () => {
    navigation.navigate("CadastraNovaObra");
  };

  const handlePesquisar = async () => {
    // Verifica se os campos estão vazios
    if (nomeCliente === "" && tipoObra === "" && dataInicio === "") {
      Alert.alert("Atenção!", "Preencha algum dos campos para pesquisar obras.", [
        { text: "Ok" },
      ]);
    } else {
      // Aqui você pode chamar a função que busca as obras no banco de dados
      const obrasEncontradas = await getObrasFromDatabase();

      // Atualize o estado com as obras encontradas
      setObras(obrasEncontradas);
    }

    toggleModalPesquisa();
  };

  useEffect(() => {
    // Carregue as obras ao entrar na tela
    getObrasFromDatabase().then((obrasEncontradas) => setObras(obrasEncontradas));
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleModalPesquisa}>
            <Icon name="search" size={30} color="white" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCadastrarObra}>
            <Icon name="plus" size={30} color="white" style={styles.addIcon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={obras}
          renderItem={({ item }) => <ObraCard obra={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
        />

        <ModalPesquisa
          isVisible={isModalPesquisaVisible}
          onBackdropPress={toggleModalPesquisa}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Pesquisar obras</Text>
              <TextInput
                placeholder="Nome do Cliente"
                style={styles.input}
                placeholderTextColor="white"
                color="white"
                value={nomeCliente}
                onChangeText={(text) => setNomeCliente(text)}
              />

              <TextInput
                placeholder="Tipo de Obra"
                style={styles.input}
                placeholderTextColor="white"
                color="white"
                value={tipoObra}
                onChangeText={(text) => setTipoObra(text)}
              />
              <TextInputMask
                type={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                placeholder="Data de Início"
                style={styles.input}
                placeholderTextColor="white"
                color="white"
                value={dataInicio}
                onChangeText={(text) => setDataInicio(text)}
                keyboardType="numeric"
              />

              <TouchableOpacity onPress={handlePesquisar} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Pesquisar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ModalPesquisa>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    paddingHorizontal: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  addIcon: {
    padding: 10,
  },
  obraCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
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
