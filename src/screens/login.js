import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native'

export default function Login() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgImage.jpg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >
        <Animatable.View
          animation="fadeInUp"
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Bem vindo(a)</Text>
            <Text style={styles.headerText}>Entrar</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formText}>Usuário:</Text>
            <TextInput
              placeholder="Digite seu usuário ou email"
              style={styles.formTextInput}
            />

            <Text style={styles.formText}>Senha:</Text>
            <TextInput
              placeholder="Digite sua senha"
              style={styles.formTextInput}
              secureTextEntry={true} // Se desejar que a senha seja ocultada
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.btnEntrar}
              onPress={()=>navigation.navigate('Home')}
              >
              <Text style={styles.btnEntrarText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.btnEsqSenha}
              onPress={()=>navigation.navigate('RedefSenha')}
              >
              <Text style={styles.btnEsqSenhaText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
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
    resizeMode: "cover",
  },
});
