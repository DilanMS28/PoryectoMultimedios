import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import {TextInput } from "react-native-paper";

import {MaterialCommunityIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

  //variable para guardar la navegación
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("recuperarcontraseña")}>
            <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={styles.flecha}/>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 250, width: 250 }}
        />
      </View>

        {/* <View style={styles.border}> */}
          <Text style={styles.titulo}>Ingresar Código</Text>
        {/* </View> */}

        <View style={styles.division}/>


      <Text style={styles.txt}>Hemos enviado a tu correo un código de verificación el cual debes introducir aquí</Text>


      <Text style={styles.label}>Código</Text>
      <TextInput
        keyboardType=""
        placeholder="Código de Recuperación"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <TouchableOpacity onPress={()=>navigation.navigate("nuevacontraseña")}>
        <Text style={styles.btnIniciarSesion}>Verificar</Text>
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
  txt: {
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
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
    fontSize: 35,
    textAlign: "center",
    marginBottom: 20,
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
    marginTop: 50,
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
