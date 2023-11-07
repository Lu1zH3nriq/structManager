import React, { useState, useEffect } from "react";
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
import { FlatList } from "react-native";
import { format } from "date-fns";

export default function GerenciarObras() {
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [obras, setObras] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Carregue as obras ao entrar na tela
    getObrasFromDatabase();
  }, []);

  const getObrasFromDatabase = async () => {
    try {
      // Fazer uma solicitação GET ao servidor para buscar todas as obras
      const response = await fetch("http://192.168.100.3:3000/allObras", {
        method: "GET",
      });

      if (response.status === 200) {
        // Se a solicitação for bem-sucedida, obtenha as obras da resposta
        const obras = await response.json();
        setObras(obras);
      } else {
        console.error("Erro ao buscar obras do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar obras: " + error);
    }
  };

  function ObraCard({ obra }) {
    const navigateToDetails = () => {
      navigation.navigate("DetailsObra", { obra });
    };

    const dataInicioFormatada = format(new Date(obra.dataInicio), "dd/MM/yyyy");
    const dataFimFormatada = format(new Date(obra.dataFim), "dd/MM/yyyy");

    return (
      <TouchableOpacity onPress={navigateToDetails}>
        <View style={styles.obraCard}>
          <Text>Código: {obra.codigo}</Text>
          <Text>Nome: {obra.nome}</Text>
          <Text>Tipo: {obra.tipo}</Text>
          <Text>Endereço: {obra.endereco}</Text>
          <Text>Contrato: {obra.numContrato}</Text>
          <Text>Data de Início: {dataInicioFormatada}</Text>
          <Text>Data de Término: {dataFimFormatada }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  const toggleCadastrarObra = () => {
    navigation.navigate("CadastraNovaObra");
  };

  const handlePesquisar = async () => {
    // Verifica se os campos estão vazios
    if (nomeCliente === "" && tipoObra === "" && dataInicio === "") {
      Alert.alert(
        "Atenção!",
        "Preencha algum dos campos para pesquisar obras.",
        [{ text: "Ok" }]
      );
    } else {
      // Você pode chamar a função que busca as obras no banco de dados aqui
      getObrasFromDatabase();
    }

    toggleModalPesquisa();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModalPesquisa}>
          <Icon
            name="search"
            size={30}
            color="white"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCadastrarObra}>
          <Icon name="plus" size={30} color="white" style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={obras}
        renderItem={({ item }) => <ObraCard obra={item} />}
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
              value={nomeCliente}
              onChangeText={(text) => setNomeCliente(text)}
            />

            <TextInput
              placeholder="Tipo de Obra"
              style={styles.input}
              placeholderTextColor="white"
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
              value={dataInicio}
              onChangeText={(text) => setDataInicio(text)}
            />

            <TouchableOpacity
              onPress={handlePesquisar}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Pesquisar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ModalPesquisa>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    paddingHorizontal: 10,
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
    color: "white",
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
