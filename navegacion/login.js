import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  //variable para guardar la navegación
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("crearcuenta")}>
        <Text style={styles.txtRegistrarse}>Registrarme</Text>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 250, width: 250 }}
        />
      </View>

        <Text style={styles.titulo}>Iniciar Sesión</Text>
        <View style={styles.division}/>

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        keyboardType="ascii-capable"
        placeholder="Nombre Usuario"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <TouchableOpacity>
        <Text style={styles.btnIniciarSesion}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("recuperarcontraseña")}>
        <Text style={styles.txtOlvidar}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 24,
        paddingLeft: 24,

      },
  txtRegistrarse: {
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginLeft: 250,
    marginBottom: 50,
    marginTop: 0,
  },
  logo: {
    alignContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  division:{
    height: 4,
    width: "100%",
    backgroundColor: "#BEEE3B",
    marginTop: 10,
    marginBottom: 10,
  },

  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  inputTxt:{
    backgroundColor:"#DBDBDB",
    borderBottomWidth:0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: 100,
    width: "100%",
  },
  inpBorder:{
    borderWidth:2,
  },
  btnIniciarSesion: {
    backgroundColor: "#BEEE3B",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 12,
    width: 180,
    height: 50,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 20,
  },
  txtOlvidar:{
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
  
}); //cierre de la hoja de stilos
