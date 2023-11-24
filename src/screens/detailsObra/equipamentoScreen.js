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
import ModalPesquisa from "react-native-modal";
import ModalPesquisaSearch from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../../../config/config.json";

export default function EquipamentoScreen({ navigation, route }) {
  const obra = route.params?.obra || {};
  const [isModalPesquisaVisible, setModalPesquisaVisible] = useState(false);
  const [isModalPesquisaSearchVisible, setModalPesquisaSearchVisible] =
    useState(false);
  const toggleModalPesquisa = () => {
    setModalPesquisaVisible(!isModalPesquisaVisible);
  };
  const toggleModalPesquisaSearch = () => {
    setModalPesquisaSearchVisible(!isModalPesquisaSearchVisible);
  };
  const [nomeFind, setNomeFind] = useState("");
  const [codigoFind, setCodigoFind] = useState("");

  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamentosBuscados, setEquipamentosBuscados] = useState([]);

  const getEquipamentos = async () => {
    try {
      let baseUrl = `${Config.urlRoot}/buscaEquipamentos`;
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
        setEquipamentos(data);
      } else {
        console.log("Erro ao buscar todos os equipamentos desta obra!");
      }
    } catch (error) {
      console.log("Erro ao buscar todos os equipamentos: " + error);
    }
  };

  const addEquipamento = async () => {
    if (nomeFind === "" || codigoFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha todos os campos para adicionar o equipamento!",
        [
          {
            text: "Ok",
          },
        ]
      );
    } else {
      try {
        const response = await fetch(`${Config.urlRoot}/addEquip`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            obraId: obra.id,
            equipName: nomeFind,
            equipCodigo: codigoFind,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          Alert.alert("Atenção!", data.message, [
            {
              text: "Ok",
              onPress: () => {
                setNomeFind("");
                setCodigoFind("");
                setEquipamentos(data.equipamentos);
                toggleModalPesquisa();
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
        Alert.alert(
          "Atenção!",
          "Erro de requisição ao adicionar equipamento.",
          [
            {
              text: "Ok",
            },
          ]
        );
      }
    }
  };

  useEffect(() => {
    getEquipamentos();
  }, []);

  const pesquisarEquipamentos = async () => {
    //VERIFICA SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (nomeFind === "" && codigoFind === "") {
      Alert.alert(
        "Atenção!",
        "Preencha os campos para pesquisar o funcionário!",
        [
          {
            text: "Ok",
          },
        ]
      );
    }

    //SE NÃO ESTIVER VAZIOS, FAZER A BUSCA PELOS CAMPOS COLETADOS
    else {
      try {
        let baseUrl = `${Config.urlRoot}/buscaEquipObra`;
        let params = {
          nome: nomeFind,
          codigo: codigoFind,
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
          setEquipamentosBuscados(data);
        } else {
          Alert.alert("Atenção!", data.message);
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
    toggleModalPesquisaSearch();
  };

  const renderSwipeable = (item) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity onPress={() => removeEquipamento(item)}>
            <View style={styles.deleteIconContainer}>
              <Icon name="trash" size={30} color="white" />
            </View>
          </TouchableOpacity>
        )}
      >
        {renderEquipamentoCard(item)}
      </Swipeable>
    );
  };

  const renderEquipamentoCard = ({ item }) => {
    return (
      <View style={styles.funcionarioCard}>
        <Text style={styles.funcionarioCardText}>Nome: {item.nome}</Text>
        <Text style={styles.funcionarioCardText}>Código: {item.codigo}</Text>
        <Text style={styles.funcionarioCardText}>
          Etiqueta: {item.etiqueta}
        </Text>
      </View>
    );
  };

  const removeEquipamento = async (item) => {
    try {
      const response = await fetch(`${Config.urlRoot}/removeEquip`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obraId: obra.id,
          equipId: item.id,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Atenção!", data.message, [
          {
            text: "Ok",
            onPress: () => {
              setEquipamentos(data.equipamentos);
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
      Alert.alert("Atenção!", "Erro de requisição ao remover equipamento.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButton}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Gestão de Equipamentos</Text>
        <Text style={styles.textoHeader}>
          Contrato da Obra: {obra.numContrato}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleModalPesquisa}>
        <Text style={styles.buttonText}><Icon name="plus" size={15} color="white"/> Adicionar</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          style={styles.button}
          onPress={toggleModalPesquisaSearch}
        >
          <Text style={styles.buttonText}>Pesquisar</Text>
          </TouchableOpacity>*/}
      </View>

      <View style={styles.listEquipamentos}>
        <FlatList
          data={
            equipamentosBuscados.length > 0
              ? equipamentosBuscados
              : equipamentos
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderSwipeable({ item })}
        />
      </View>

      <ModalPesquisaSearch
        isVisible={isModalPesquisaSearchVisible}
        onBackdropPress={toggleModalPesquisaSearch}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pesquisar Equipamento</Text>
            <Text style={styles.inpText}>Nome do Equipamento:</Text>
            <TextInput
              placeholder="Nome do Equipamento"
              style={styles.input}
              placeholderTextColor="grey"
              value={nomeFind}
              onChangeText={(text) => setNomeFind(text)}
            />
            <Text style={styles.inpText}>Código do Equipamento:</Text>
            <TextInput
              placeholder="Código do Equipamento"
              style={styles.input}
              placeholderTextColor="grey"
              value={codigoFind}
              onChangeText={(text) => setCodigoFind(text)}
            />
            {/* Adicione outros campos conforme necessário */}
            <TouchableOpacity
              onPress={addEquipamento}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ModalPesquisaSearch>

      <ModalPesquisa
        isVisible={isModalPesquisaVisible}
        onBackdropPress={toggleModalPesquisa}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pesquisar Equipamento</Text>
            <Text style={styles.inpText}>Nome do Equipamento:</Text>
            <TextInput
              placeholder="Nome do Equipamento"
              style={styles.input}
              placeholderTextColor="grey"
              value={nomeFind}
              onChangeText={(text) => setNomeFind(text)}
            />
            <Text style={styles.inpText}>Código do Equipamento:</Text>
            <TextInput
              placeholder="Código do Equipamento"
              style={styles.input}
              placeholderTextColor="grey"
              value={codigoFind}
              onChangeText={(text) => setCodigoFind(text)}
            />
            {/* Adicione outros campos conforme necessário */}
            <TouchableOpacity
              onPress={addEquipamento}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Adicionar</Text>
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
  listEquipamentos: {
    flex: 1,
    paddingHorizontal: 10,
  },
  funcionarioCard: {
    backgroundColor: "#60656A",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  funcionarioCardText: {
    color: "white",
    fontSize: 15,
  },
  deleteIconContainer: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "90%",
    borderRadius: 8,
  },
  deleteIcon: {
    color: "white",
    fontSize: 20,
  },
});
