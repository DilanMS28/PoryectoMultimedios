import React,{useState} from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//Importacion de lo necesario para autenticar el usuario en firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../AccesoFirebase/accesoFirebase";


export default function Login() {
  //variable para guardar la navegación
  const navigation = useNavigation()
  
  
  //Contantes para validar al usuario 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cambioTexto = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate('home')
    } catch (error) { console.log('Error al iniciar sesión',error) 
      Alert.alert('Correo o contraseña incorrecto. Por favor intente de nuevo.')
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("crearcuenta")}>
        <Text style={styles.txtRegistrarse}>Registrarme</Text>
      </TouchableOpacity>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <View style={styles.division} />

      <Text style={styles.label}>Coreo Electrónico</Text>
      <TextInput
        keyboardType="ascii-capable"
        placeholder="Coreo electrónico"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={email}
        onChangeText={(e)=>setEmail(e)}

      ></TextInput>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={password}
        onChangeText={(e)=>setPassword(e)}
      ></TextInput>

      <TouchableOpacity onPress={cambioTexto}>
        <Text style={styles.btnIniciarSesion}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("recuperarcontraseña")}>
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
  division: {
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
  inputTxt: {
    backgroundColor: "#DBDBDB",
    borderBottomWidth: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: 100,
    width: "100%",
  },
  inpBorder: {
    borderWidth: 2,
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
  txtOlvidar: {
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }

}); //cierre de la hoja de stilos
