import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function GeralScreen({ navigation, route }) {
  const { onGoBack } = route.params || {};

  const obra = route.params?.obra || {};
  const [cliente, setCliente] = React.useState("");

  React.useEffect(() => {
    const getCliente = async () => {
      try {
        let baseUrl = "http://192.168.100.3:3000/buscaCliente/Id";
        let params = { id: obra.clienteId };
        let url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

        let response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCliente(data);
        } else {
          console.error("Erro na requisição: ", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição: ", error);
      }
    };

    getCliente();
  }, []);

  const dataInicioFormatada = format(new Date(obra.dataInicio), "dd/MM/yyyy");
  const dataFimFormatada = format(new Date(obra.dataFim), "dd/MM/yyyy");

  const deleteObra = async () => {
    Alert.alert(
      "Atenção!",
      "Deseja realmente deletar o registro desta obra? ",
      [
        {
          text: "Deletar Obra",
          onPress: async () => {
            try {
              let response = await fetch(
                "http://192.168.100.3:3000/deletaObra",
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: obra.id,
                  }),
                }
              );
              const data = await response.json();
              if (response.status === 200) {
                Alert.alert("Sucesso!", data.message, [
                  {
                    text: "Confirmar",
                    onPress: () => {
                      if (onGoBack) {
                        onGoBack();
                      }

                      navigation.goBack();
                    },
                  },
                ]);
              } else {
                Alert.alert("Atenção!", data.message);
              }
            } catch (error) {
              Alert.alert(
                "Erro de rede",
                "Houve um problema na requisição. Tente novamente mais tarde."
              );
            }
          },
        },
        {
          text: "Cancelar",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButton}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Obra: {obra.nome}</Text>
        <Text style={styles.textoHeader}>
          Número do Contrato: {obra.numContrato}
        </Text>
      </View>
      <View style={styles.detalhesObraContainer}>
        <Text style={styles.textoDetalhes}>Código: {obra.codigo}</Text>
        <Text style={styles.textoDetalhes}>Endereço: {obra.endereco}</Text>

        <Text style={styles.textoDetalhes}>
          Número do Alvará: {obra.numAlvara}
        </Text>
        <Text style={styles.textoDetalhes}>
          Responsável pelo Projeto: {obra.rtProjeto}
        </Text>
        <Text style={styles.textoDetalhes}>
          Responsável pela Execução: {obra.rtExec}
        </Text>
        <Text style={styles.textoDetalhes}>
          Data de Início: {dataInicioFormatada}
        </Text>
        <Text style={styles.textoDetalhes}>
          Data prevista para Término: {dataFimFormatada}
        </Text>
        <Text style={styles.textoDetalhes}>Orçamento: {obra.orcamento}</Text>
        <Text style={styles.textoDetalhes}>
          Cliente da Obra: {cliente.nome}
        </Text>
      </View>

      {/* Botões e Ícones na parte inferior */}
      <View style={styles.bottomContainer}>
        {/* Botões */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              navigation.navigate("MateriaisObra", { obra: obra });
            }}
          >
            <Text style={styles.textoBotao}>Materiais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => {
              navigation.navigate("FuncionariosObra", { obra: obra });
            }}>
            <Text style={styles.textoBotao}>Funcionários</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => {
              navigation.navigate("EquipamentosObra", { obra: obra });
            }}>
            <Text style={styles.textoBotao}>Equipamentos</Text>
          </TouchableOpacity>
        </View>

        {/* Ícones */}
        <View style={styles.iconesContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UpdateObra", { obra: obra });
            }}
          >
            <Icon name="pencil" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteObra();
            }}
          >
            <Icon name="trash" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    paddingHorizontal: 10,
  },
  detalhesObraContainer: {
    alignSelf: "center",
    backgroundColor: "#60656A",
    padding: "10%",
    borderRadius: 10,
  },
  textoDetalhes: {
    fontSize: 16,
    marginBottom: "2%",
    color: "white",
    fontWeight: "400",
  },
  textoHeader: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  goBackButton: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    backgroundColor: "#333", // Cor de fundo dos botões
    paddingVertical: 10,
  },
  botao: {
    backgroundColor: "#007BFF", // Escolha a cor desejada
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  textoBotao: {
    color: "white",
    textAlign: "center",
  },
  iconesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333", // Cor de fundo dos ícones
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
});
