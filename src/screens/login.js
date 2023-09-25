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
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgImage3.jpg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >

        <KeyboardAvoidingView
          
          style={styles.keyboardAvoidingView}
        >
          <Animatable.View animation="fadeInUp">
            <View style={styles.header}>
              <Text style={styles.headerText}>Bem vindo(a)</Text>
              <Text style={styles.headerText}>Entrar</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.formText}>Usuário:</Text>
              <TextInput
                autoCorrect={false} // Desativa o corretor automático
                autoCompleteType="off" // Desativa o sugestor de palavras
                autoCapitalize="none"
                placeholder="Digite seu usuário"
                style={styles.formTextInput}
              />

              <Text style={styles.formText}>Senha:</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  autoCorrect={false} // Desativa o corretor automático
                  autoCompleteType="off" // Desativa o sugestor de palavras
                  autoCapitalize="none"
                  placeholder="Digite sua senha"
                  style={styles.passwordTextInput}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                  autoCorrect={false} // Desativa o corretor automático
                  autoCompleteType="off" // Desativa o sugestor de palavras
                  onPress={toggleShowPassword}
                  style={styles.toggleButton}
                >
                  <Text>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.btnEntrar}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.btnEntrarText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnEsqSenha}
                onPress={() => navigation.navigate("RedefSenha")}
              >
                <Text style={styles.btnEsqSenhaText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
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
    backgroundColor: "#828282",
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
