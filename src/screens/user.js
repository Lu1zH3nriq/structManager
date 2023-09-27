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

export default function User() {
  const navigation = useNavigation();
  const [isModaSenhaVisible, setModalSenhaVisible] = useState(false);
  const [emailSenha, setEmailSeha] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarSource, setAvatarSource] = useState(null);
  const [photoChanged, setPhotoChanged] = useState(false); // Estado para rastrear se a foto foi alterada

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

  const handleSavePhoto = () => {
    // Lógica para salvar a foto
    Alert.alert(
      "Foto salva com sucesso!",
      "A foto foi salva com sucesso!",
      [
        {
          text: "OK",
        },
      ],

      setPhotoChanged(false)
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Encerrar sessão",
      "Deseja finalizar e sair do aplicativo? ",
      [
        {
          text: "Cancelar",
          onPress: () => {
            // Ação a ser executada ao cancelar
          },
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            // Lógica de logout do usuário, remover token ou limpar o estado

            // Após encerrar sessão
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  //estrutura de modal para redefinir senha
  const toggleModalSenha = () => {
    setModalSenhaVisible(!isModaSenhaVisible);
  };

  const handleSavePassword = () => {
    // Lógica para salvar a nova senha

    Alert.alert(
      "Senha redefinida com sucesso!",
      "Uma confirmação foi enviada para o email informado!",
      [
        {
          text: "Confirmar e fazer login",
          onPress: () => {
            // Lógica de logout do usuário, remover token ou limpar o estado

            // Após encerrar sessão
            navigation.navigate("Login");
          },
        },
      ]
    );
    // Feche o modal após salvar
    toggleModalSenha();
  };

  // estrutura de moral para redefinir email
  const [isModaEmailVisible, setModalEmailVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toggleModalEmail = () => {
    setModalEmailVisible(!isModaEmailVisible);
  };

  const handleSaveEmail = () => {
    Alert.alert(
      "Email redefinido com sucesso!",
      "Uma confirmação foi enviada para o novo email informado!",
      [
        {
          text: "Confirmar",
          onPress: () => {},
        },
      ]
    );
    // Lógica para salvar o novo email

    // Feche o modal após salvar
    toggleModalEmail();
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
          <Text style={styles.userDataText}>Usuário: userName</Text>
          <Text style={styles.userDataText}>E-mail: example@email.com</Text>
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

      <ModalSenha isVisible={isModaSenhaVisible}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Redefinir Senha</Text>
              <TextInput
                placeholder="Email atual"
                style={styles.input}
                value={emailSenha}
                onChangeText={(text) => setEmailSeha(text)}
                placeholderTextColor="white"
                color="white"
              />
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

      <ModalEmail isVisible={isModaEmailVisible}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Redefinir Email</Text>
              <TextInput
                placeholder="Email atual"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="white"
                color="white"
              />
              <TextInput
                placeholder="Digite o novo email"
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
    borderColor: "grey",
    padding: 4,
  },
  changeImageButton: {
    color: "white",
    marginTop: 5,
  },
  userDataText: {
    color: "white",
    fontSize: 16,
  },
  userData: {
    marginTop: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "grey", // Cor de fundo dos botões
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
  modalButton: {
    backgroundColor: "grey",
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
