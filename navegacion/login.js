import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function Login() {
  return (
    <View style={{width:'90%'}}>
      <TouchableOpacity>
        <Text style={styles.txtRegistrarse}>Registrarme</Text>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      <View style={styles.border}>
        <Text style={styles.titulo}>Iniciar Sesión</Text>
      </View>

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        keyboardType="ascii-capable"
        placeholder="Nombre Usuario"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <TouchableOpacity>
        <Text style={styles.btnIniciarSesion}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.txtOlvidar}>Olvidaste tu contraseñas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

  border: {
    borderBottomWidth: 4,
    borderBottomColor: "#BEEE3B",
    borderStyle: "solid",
    marginBottom: 30,
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
    marginTop: 15,
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
