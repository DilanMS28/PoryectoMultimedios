import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

  //variable para guardar la navegación
  const navigation = useNavigation()

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={()=>navigation.navigate("login")}>
        <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={styles.flecha}/>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      
      <Text style={styles.titulo}>Nueva Contraseña</Text>
      

      <View style={styles.division}/>

      <Text style={styles.label}>Nueva Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Nueva Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <TouchableOpacity onPress={()=>navigation.navigate("login")}>
        <Text style={styles.btnIniciarSesion}>Guardar</Text>
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
  division:{
    height: 4,
    width: "100%",
    backgroundColor: "#BEEE3B",
    marginTop: 10,
    marginBottom: 10,
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

  // border: {
  //   borderBottomWidth: 4,
  //   borderBottomColor: "#BEEE3B",
  //   borderStyle: "solid",
  //   marginBottom: 30,
  // },

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
    marginTop: 30,
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
    marginTop: 40,
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
