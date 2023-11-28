import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ModalSenha from "react-native-modal";
import ModalEmail from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { SERVER_URL } from "@env";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User() {
  const navigation = useNavigation();
  const [isModaSenhaVisible, setModalSenhaVisible] = useState(false);

  const [avatarSource, setAvatarSource] = useState(null);
  const [photoChanged, setPhotoChanged] = useState(false);

  const [userLogadoID, setUserLogadoID] = useState(null);
  const [userLogadoUsuario, setUserLogadoUsuario] = useState(null);
  const [userLogadoEmail, setUserLogadoEmail] = useState(null);
  const [userLogadoPass, setUserLogadoPass] = useState(null);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let user = JSON.parse(response);
      setUserLogadoID(user.id);
      setUserLogadoUsuario(user.usuario);
      setUserLogadoEmail(user.email);
      setUserLogadoPass(user.password);

      if (user.fotoPerfil) {
        setAvatarSource(user.fotoPerfil);
      } else {
        setAvatarSource(require("../../assets/undefinedUser.jpg"));
      }
    }

    getUser();
  }, []);

  const selectImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarSource(result.assets[0].uri);
      setPhotoChanged(true); // Marcar a foto como alterada
    }
  };

  const handleSavePhoto = async () => {
    // Lógica para salvar a foto

    try {
      let response = await fetch(`${SERVER_URL}/uploadFoto`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userLogadoID,
          fotoPerfil: avatarSource,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Foto salva com sucesso!", data.message, [{ text: "OK" }]);

        setPhotoChanged(false);
      } else {
        Alert.alert("Erro no servidor", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      Alert.alert(
        "Erro de rede",
        "Houve um problema na requisição. Tente novamente mais tarde."
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Encerrar sessão",
      "Deseja finalizar e sair do aplicativo? ",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            await AsyncStorage.clear();
            // Após encerrar sessão
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  //estrutura de modal para redefinir senha
  const [emailAtual, setEmailAtual] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toggleModalSenha = () => {
    setModalSenhaVisible(!isModaSenhaVisible);
  };

  const handleSavePassword = async () => {
    // VERIFICAR SE OS CAMPOS NÃO ESTÃO VAZIOS
    if (emailAtual === "" || newPassword === "") {
      Alert.alert("Atenção!", "Para redefinir a senha, preencha todos os campos!", [
        {
          text: "Confirmar",
        },
      ]);
    } else if (newPassword === userLogadoPass) {
      Alert.alert("Atenção!", "A nova senha não pode ser igual à senha anterior!", [
        {
          text: "Confirmar",
        },
      ]);
    } else if (userLogadoEmail !== emailAtual) {
      Alert.alert("Atenção!", "O email digitado não pertence a este usuário!", [
        {
          text: "Confirmar",
        },
      ]);
    } else {
      try {
        let response = await fetch(`${SERVER_URL}/updateSenha`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userLogadoID,
            password: newPassword,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          Alert.alert("Sucesso!", data.message);
          toggleModalSenha();
          setEmailAtual("");
          setNewPassword("");
        } else {
          Alert.alert("Erro!", data.message);
        }
      } catch (error) {
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
  };

  // estrutura de modal para redefinir email
  const [isModaEmailVisible, setModalEmailVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toggleModalEmail = () => {
    setModalEmailVisible(!isModaEmailVisible);
  };

  const handleSaveEmail = async () => {
    if (email === "" || newEmail === "") {
      Alert.alert("Atenção!", "Para redefinir o email, preencha todos os campos!", [
        {
          text: "Confirmar",
        },
      ]);
    } else if (newEmail === userLogadoEmail) {
      Alert.alert("Atenção!", "O novo email não pode ser igual ao anterior!", [
        {
          text: "Confirmar",
        },
      ]);
    } else if (userLogadoEmail !== email) {
      Alert.alert("Atenção!", "O email anterior digitado não pertence a este usuário!", [
        {
          text: "Confirmar",
        },
      ]);
    } else {
      try {
        let response = await fetch(`${SERVER_URL}/updateEmail`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userLogadoID,
            email: newEmail,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          Alert.alert("Sucesso!", data.message);
          toggleModalEmail();
          setEmail("");
          setNewEmail("");
        } else {
          Alert.alert("Erro!", data.message);
        }
      } catch (error) {
        Alert.alert(
          "Erro de rede",
          "Houve um problema na requisição. Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            avatarSource
              ? { uri: avatarSource }
              : require("../../assets/undefinedUser.jpg")
          }
          style={styles.userImage}
        />
        <TouchableOpacity onPress={selectImageFromGallery}>
          <Text style={styles.changeImageButton}>Trocar Imagem</Text>
        </TouchableOpacity>
        {photoChanged && ( // Mostrar o botão "Salvar Foto" somente se a foto foi alterada
          <TouchableOpacity onPress={handleSavePhoto}>
            <Text style={styles.changeImageButton}>Salvar Foto</Text>
          </TouchableOpacity>
        )}

        <View style={styles.userData}>
          <Text style={styles.userDataText}>Usuário: {userLogadoUsuario}</Text>
          <Text style={styles.userDataText}>e-mail: {userLogadoEmail}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Redefinir senha"
          onPress={toggleModalSenha}
          buttonStyle={styles.button}
        />
        <Button
          title="Redefinir email"
          onPress={toggleModalEmail}
          buttonStyle={styles.button}
        />
        <Button
          title="Sair"
          onPress={handleLogout}
          buttonStyle={styles.button}
        />
      </View>

      <ModalSenha
        isVisible={isModaSenhaVisible}
        onBackdropPress={toggleModalSenha}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Redefinir Senha</Text>
              <Text style={styles.inpText}>E-mail cadastrado:</Text>
              <TextInput
                placeholder="Digite o e-mail cadastrado"
                style={styles.input}
                value={emailAtual}
                onChangeText={(text) => setEmailAtual(text)}
                placeholderTextColor="white"
                color="white"
              />
              <Text style={styles.inpText}>Nova senha:</Text>
              <TextInput
                placeholder="Digite a nova senha"
                style={styles.input}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="white"
                color="white"
              />
              <TouchableOpacity
                onPress={handleSavePassword}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModalSenha}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ModalSenha>

      <ModalEmail
        isVisible={isModaEmailVisible}
        onBackdropPress={toggleModalEmail}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Redefinir Email</Text>
              <Text style={styles.inpText}>E-mail atual:</Text>
              <TextInput
                placeholder="Digite o e-mail atual"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="white"
                color="white"
              />
              <Text style={styles.inpText}>Nome e-mail:</Text>
              <TextInput
                placeholder="Digite o novo e-mail"
                style={styles.input}
                value={newEmail}
                onChangeText={(text) => setNewEmail(text)}
                placeholderTextColor="white"
                color="white"
              />
              <TouchableOpacity
                onPress={handleSaveEmail}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModalEmail}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ModalEmail>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454A50",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
    borderWidth: 8,
    borderColor: "#59A8FF",
    padding: 4,
  },
  changeImageButton: {
    color: "white",
    marginTop: 5,
  },
  userDataText: {
    color: "white",
    fontSize: 24,
  },
  userData: {
    marginTop: 15,
    alignItems: "flex-start",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF", // Cor de fundo dos botões
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
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
    marginBottom: 10,
  },
  input: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
