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
  const [cpfCliente, setCpfCliente] = useState("");
  const [numContrato, setNumContrato] = useState("");

  const [obras, setObras] = useState([]);
  const [filteredObras, setFilteredObras] = useState([]);
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
        setFilteredObras(obras);
      } else {
        console.error("Erro ao buscar obras do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar obras: " + error);
    }
  };

  function ObraCard({ obra }) {
    const navigateToDetails = () => {
      navigation.setOptions({
        onGoBack: getObrasFromDatabase,
      });
      navigation.navigate("DetailsObra", { obra });
    };

    const dataInicioFormatada = format(new Date(obra.dataInicio), "dd/MM/yyyy");
    const dataFimFormatada = format(new Date(obra.dataFim), "dd/MM/yyyy");

    return (
      <TouchableOpacity onPress={navigateToDetails}>
        <View style={styles.obraCard}>
          <Text>Código: {obra.codigo}</Text>
          <Text>Nome: {obra.nome}</Text>
          <Text>Tipo: {obra.TipoObra.tipo}</Text>
          <Text>Endereço: {obra.endereco}</Text>
          <Text>Contrato: {obra.numContrato}</Text>
          <Text>Data de Início: {dataInicioFormatada}</Text>
          <Text>Data de Término: {dataFimFormatada}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getObrasFromDatabase();
    });

    return unsubscribe;
  }, [navigation]);
  const toggleCadastrarObra = () => {
    navigation.setOptions({
      onGoBack: getObrasFromDatabase,
    });
    navigation.navigate("CadastraNovaObra");
  };

  const handlePesquisar = async () => {
    // Verifica se os campos estão vazios
    if (nomeCliente === "" && cpfCliente === "" && numContrato === "") {
      Alert.alert(
        "Atenção!",
        "Preencha algum dos campos para pesquisar obras.",
        [{ text: "Ok" }]
      );
    } else {
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaObra";
        let params = {
          nomeCliente: nomeCliente,
          cpfCliente: cpfCliente,
          numContrato: numContrato,
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
          setFilteredObras(data);
          toggleModalPesquisa();

          setNumContrato("");
          setCpfCliente("");
          setNomeCliente("");

        } else {
          Alert.alert("Atenção", data.message, [
            {
              text: "Ok",
            },
          ]);
        }
      } catch (error) {
        console.log("Erro ao buscar obra: " + error);
        Alert.alert("Atenção!", "Erro de requisição ao buscar obras!", [
          {
            text: "Ok",
          },
        ]);
      }
    }
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
        data={filteredObras} // Renderiza as obras filtradas
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
              placeholder="CPF/CNPJ do Cliente"
              style={styles.input}
              placeholderTextColor="white"
              value={cpfCliente}
              onChangeText={(text) => setCpfCliente(text)}
            />

            <TextInput
              placeholder="Número do Contrato"
              style={styles.input}
              placeholderTextColor="white"
              value={numContrato}
              onChangeText={(text) => setNumContrato(text)}
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
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
