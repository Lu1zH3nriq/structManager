import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVER_URL } from "@env";


export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function loginUser() {
    if (user === "" || password === "") {
      Alert.alert(
        "Campos inválidos",
        "Preencha todos os campos para fazer login",
        [
          {
            text: "OK",
          },
        ]
      );
    } else {
      try {
        let response = await fetch(`${SERVER_URL}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: user,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          
          const user_logado = data;
          //  COLOCAR O USER_LOGADO NO ASYNC STORAGE PARA CONTROLE DE LOGIN
          await AsyncStorage.setItem('userData', JSON.stringify(user_logado));
            
          setUser("");
          setPassword("");
          navigation.navigate("Main");
        } else {
          Alert.alert("Erro de login", data.message );
        }
      } catch (error) {
        //console.error("Erro na requisição: ", error);
        Alert.alert(
          "Erro de rede",
          `Houve um problema na requisição. Tente novamente mais tarde. ${error}`
        );
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgImage3.jpg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animatable.View animation="fadeInUp">
              <View style={styles.header}>
                <Text style={styles.headerText}>Bem vindo(a)</Text>
                <Text style={styles.headerText}>Entrar</Text>
              </View>

              <View style={styles.form}>
                <Text style={styles.formText}>Usuário:</Text>
                <TextInput
                  autoCorrect={false}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  placeholder="Digite seu usuário"
                  style={styles.formTextInput}
                  value={user}
                  onChangeText={(text) => setUser(text)}
                />

                <Text style={styles.formText}>Senha:</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    autoCorrect={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    placeholder="Digite sua senha"
                    style={styles.passwordTextInput}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <TouchableOpacity
                    onPress={toggleShowPassword}
                    style={styles.toggleButton}
                  >
                    <Text>{showPassword ? "Ocultar" : "Exibir"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.btnEntrar} onPress={loginUser}>
                  <Text style={styles.btnEntrarText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnEsqSenha}
                  onPress={() => navigation.navigate("RedefSenha")}
                >
                  <Text style={styles.btnEsqSenhaText}>
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordTextInput: {
    flex: 1,
    backgroundColor: "#FFF",
    height: 45,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 15,
  },
  toggleButton: {
    backgroundColor: "#FFF",
    height: 45,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttons: {
    width: "100%",
    paddingHorizontal: 45,
    marginTop: 15,
  },
  btnEntrar: {
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
  btnEsqSenha: {
    alignItems: "center",
  },
  btnEsqSenhaText: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 15,
  },
  backgroundImage: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});
