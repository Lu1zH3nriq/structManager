import React, { useState } from "react";
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
  const [email, setEmail] = useState('');


  //function para resetar a senha
  const handleResetPassword = () => {

    //verifica o campo do email
    if (email === '') {
      Alert.alert(
        "Email inválido",
        "Preencha com o email cadastrado para redefinir a senha",
        [
          {
            text: "Ok",
          },
        ],
      );
    }
    else {

      // fazer uma busca no banco de dados o usuario correspondente ao email informado
      //se encontrar usuario
      // gerar um numero aleatorio
      // alterar a senha do usuario encontrado para a senha gerada aleatoria
      // enviar um email para o email informado com o numero aleatorio

      Alert.alert(
        "Sucesso!",
        "Uma nova senha foi enviada para o email cadastrado, por favor verifique e faça login novamente!",
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


      //se nao encontrar usuario com este email,
      Alert.alert(
        "Atenção!",
        "Não existe usuário cadastrado com este endereço de email, verifique o email informado!",
        [
          {
            text: "Ok",
          },
        ],
      );
    }
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
          <Text style={styles.formText}>Digite seu endereço de e-mail cadastrado para enviarmos uma nova senha temporária. </Text>
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
            onPress={() => navigation.navigate('Login')}
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
