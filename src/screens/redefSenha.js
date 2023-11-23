import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Config from "../../config/config.json";

export default function RedefSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  //function para resetar a senha
  const handleResetPassword = async () => {
    //verifica o campo do email
    if (email === "" || user === "") {
      Alert.alert(
        "Email ou usuário inválido",
        "Preencha com o nome de usuário e o email cadastrado para redefinir a senha! ",
        [
          {
            text: "Ok",
          },
        ]
      );
    } else {
      try {
        let response = await fetch(`${Config.urlRoot}/resetPassword`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: user,
            email: email,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          Alert.alert(
            "Sucesso!",
            data.message,
            [
              {
                text: "Fazer login com nova senha",
                onPress: () => {
                  navigation.navigate("Login");
                },
              },
            ],
            { cancelable: false } // O usuário não pode fechar o alerta clicando fora dele
          );
        } else {
          Alert.alert(
            "Atenção!",
            data.message,
            [
              {
                text: "Ok",
              },
            ]
          );
        }
      } catch (error) {
        //console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInUp">
        <View style={styles.header}>
          <Text style={styles.headerText}>Redefinir Senha</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formText}>
            Digite seu usuário e endereço de e-mail cadastrado para enviarmos
            uma nova senha temporária.
          </Text>
          <Text style={styles.formText}>Usuário:</Text>
          <TextInput
            placeholder="Nome de Usuário"
            style={styles.formTextInput}
            autoCapitalize="none"
            value={user}
            onChangeText={(text) => setUser(text)}
          />

          <Text style={styles.formText}>E-mail:</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="example@email.com.br"
            style={styles.formTextInput}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btnEnviar}
            onPress={handleResetPassword}
          >
            <Text style={styles.btnEntrarText}>Enviar nova senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnEsqSenhaText}>Voltar para Log In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#454A50",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
  },
  headerText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  form: {
    padding: 12,
  },
  formText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 15,
  },
  formTextInput: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  buttons: {
    width: "100%",
    paddingHorizontal: 45,
    marginTop: 15,
  },
  btnEnviar: {
    backgroundColor: "#007BFF",
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEntrarText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  btnVoltar: {
    alignItems: "center",
  },
  btnEsqSenhaText: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 15,
  },
});

/**/
