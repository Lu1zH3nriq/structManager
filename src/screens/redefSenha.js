import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native'

export default function RedefSenha() {

  const navigation = useNavigation();

  const handleResetPassword = () => {
    Alert.alert(
      "Redefinir Senha",
      "Uma nova senha foi enviada para o email cadastrado, por favor verifique e faça login novamente!",
      [
        {
          text: "Fazer login com nova senha",
          onPress: () => {
            // Aqui você pode adicionar a lógica para redefinir a senha, se necessário
            // Em seguida, navegue de volta para a tela de login
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false } // O usuário não pode fechar o alerta clicando fora dele
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <Animatable.View
          animation="fadeInUp"
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Redefinir Senha</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formText}>E-mail:</Text>
            <TextInput
              placeholder="Digite seu email"
              style={styles.formTextInput}
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
              onPress={()=>navigation.navigate('Login')}
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
