import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//Importaciones necesarias para la manipulacion de la firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore, setDoc,doc } from "firebase/firestore";
import { app, auth } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);

export default function Login() {

  //variable para guardar la navegación
  const navigation = useNavigation()

  //parametros a recibir para la creacion de un usuario 
  const [user, setUser] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contraseña: '',
    confContraseña: '',
    imagenPerfil: '',
    datos: {
      altura: '',
      peso: '',
      horaSueño: '',
      tipoSangre: '',
    }
  })

  //Funcion para validar las contraseñas
  const validarContraseña = () => {
    return user.contraseña == user.confContraseña;
  }

  //Funcion para realizar ingresos de texto en los inputs
  const cambioTexto = (value, name) => {
    setUser({ ...user, [name]: value })
  }

  //Funcion para recibir los datos en los TextInputs 
  const RegistrarUsuario = async () => {
    if (!validarContraseña()) {
      Alert.alert('Las contraseñas no coinciden. Por favor intente de nuevo')
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.correo, user.contraseña);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'User', uid), {
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        contraseña: user.confContraseña,
        imagenPerfil: '',
        datos: {
          altura: '',
          peso: '',
          horaSueño: '',
          tipoSangre: '',
        }
      });
      Alert.alert('Registrado!', 'Usuario registrado exitosamente!')
      navigation.navigate('home') //En el futuro me debe llevar a login

    } catch (error) { console.log(error) }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>

        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.txtIniciarSesion}>Iniciar Sesión</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.logo}>
        <Image
          source={require("../assets/imagenes/logo.jpg")}
          style={{ height: 200, width: 200 }}
        />
      </View>


      <Text style={styles.titulo}>Crear Cuenta</Text>

      <View style={styles.division} />


      <Text style={styles.label}>Nombre</Text>
      <TextInput
        value={user.nombre}
        onChangeText={(value) => cambioTexto(value, 'nombre')}
        keyboardType="ascii-capable"
        placeholder="Tu nombre"
        style={styles.inputTxt}
        underlineColor="transparent"
      ></TextInput>

      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        keyboardType="ascii-capable"
        placeholder="Tus apellidos"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={user.apellidos}
        onChangeText={(value) => cambioTexto(value, 'apellidos')}
      ></TextInput>

      <Text style={styles.label}>Correo</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="Correo Electronico"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={user.correo}
        onChangeText={(value) => cambioTexto(value, 'correo')}
      ></TextInput>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={user.contraseña}
        onChangeText={(value) => cambioTexto(value, 'contraseña')}
      ></TextInput>

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Contraseña"
        style={styles.inputTxt}
        underlineColor="transparent"
        value={user.confContraseña}
        onChangeText={(value) => cambioTexto(value, 'confContraseña')}
      />

      <TouchableOpacity onPress={RegistrarUsuario}>
        <Text style={styles.btnIniciarSesion}>Registrarse</Text>
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
  txtIniciarSesion: {
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginLeft: 240,
    marginBottom: 10,
    marginTop: 20,
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
    marginTop: 10,
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
    // marginBottom: 10,
    borderRadius: 20,
  },
  txtOlvidar: {
    color: "#484848",
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
}); //cierre de la hoja de stilos
