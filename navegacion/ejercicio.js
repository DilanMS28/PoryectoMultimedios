import React from "react";
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Ejercicio(props) {
  //variable para guardar la navegación

  const navigation = useNavigation();

    // const OPENAI_API_KEY = require("")
    const [isLoading, setIsLoading] = useState(true);
    // const [ejercicio, setEjercicio] = useState([])

    const {ejercicioId} = props.route.params;

    // useEffect( ()=>{
    //     setEjercicio(props.route.params.ejercicioId)
    // })


  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        {/* <TouchableOpacity onPress={()=>navigation.navigate("inicio")}> */}
          <MaterialCommunityIcons
            name="arrow-left"
            fontSize={10}
            color={"white"}
            size={40}
            style={styles.flecha}
          />
        </TouchableOpacity>
        <Text style={styles.tituloheader}>Salud y Bienestar</Text>

        <TouchableOpacity onPress={()=>navigation.navigate("config")}>
          <Image
            source={require("../assets/imagenes/perfile.png")}
            resizeMode="center"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>{/* Cierre del nav*/}

      <ScrollView>
        <Text style={styles.titulo}>Instrucciones</Text>
        <Text style={styles.txt}>Deseas ver las instrucciones de este ejercicio</Text>

        <View style={styles.tarjeta}>
            <Text style={styles.ejTitulo}>{ejercicioId.name}</Text>
            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                <Text style={styles.txt}> <Text style={styles.label}>Dificultad: </Text>{ejercicioId.difficulty}</Text>
                <Text style={styles.txt}> <Text style={styles.label}>Musculo: </Text>{ejercicioId.muscle}</Text>

            </View>
            <Text style={styles.instructions}>{ejercicioId.instructions}</Text>
        </View>
        </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  labelej:{
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    color:"#454546",
  },
  ejTitulo:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize: 24,
    marginBottom: 20,
  },
  instructions:{
    fontSize: 20,
    fontWeight: "normal",
    textAlign:"justify",
    color:"#454546",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#00C9D2",
    height: 100,
    paddingTop: 40,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  tarjeta:{
    backgroundColor: "#00C9D2",
    marginBottom: 20,
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
  headerTarjeta:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom:10,
  },
  tituloTarjeta:{
    color:"#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
  },
  txtTarjeta:{
    color:"#fff",
    fontSize: 18,
    fontWeight:"normal",
    textAlign: "justify",
    marginBottom: 20,
  },
  tituloheader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  txt: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    lineHeight: 25,
  },

  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginTop: 40,
  },

  btninfo: {
    backgroundColor: "#BEEE3B",
    color: "#454546",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 12,
    width: 180,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 20,
  },
  label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  textArea: {
    backgroundColor: "#DBDBDB",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 18,
    height: 100,
    textAlignVertical: "top",

  },
  span:{
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    lineHeight: 25,
  },
  response:{
    fontWeight: "normal",
    fontSize: 16,
    color: "#454546"
  },
}); //cierre de la hoja de stilos

