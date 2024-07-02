import React from "react";
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Chat(props) {
  //variable para guardar la navegación

  const navigation = useNavigation();

    // const OPENAI_API_KEY = require("")
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    const [dificultad, setDificultad] = useState("")


    const url = 'https://api.api-ninjas.com/v1/exercises';
    const options = {
      method: 'GET',
      headers: {
        'x-Api-key': 'GGm8XffZzdqF1UCDq3w2pQ==WzFOocXvooogkguY',
      }
    };

    const Recetario = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const TipoDificultad = (difficulty)=>{
        switch(difficulty){
          case "beginner":
            return "#009900";
          case "intermediate":
            return "#ffff00";
          case "hard":
            return "red"
        }
    }
  
    useEffect(() => {
      Recetario();
    }, []);
      

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

      {/* <ScrollView > */}
        <Text style={styles.titulo}>Ejercicios</Text>

        <Text style={styles.txt}>Nuestros hábitos son los que nos definen</Text>


        <Text style={styles.label}>Lista de Ejercicios</Text>
        
        
          {isLoading ? (<ActivityIndicator size={50} style={{marginTop: 20}}/>) : (

            <FlatList
              data={data}
              // keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <View style={styles.tarjeta}>
                  <Text style={[styles.response, {color: TipoDificultad(item.difficulty)} ]}> <Text style={styles.span}>Dificultad:</Text> {item.difficulty}</Text>
                  <Text style={styles.response}> <Text style={styles.span}>Nombre:</Text> {item.name}</Text>
                  <Text style={styles.response}> <Text style={styles.span}>Tipo:</Text> {item.type}</Text>
                  <Text style={styles.response}> <Text style={styles.span}>Músculo:</Text> {item.muscle}</Text>
                  
                  <TouchableOpacity onPress={()=>props.navigation.navigate("ejercicio", {ejercicioId: item} )}>
                      <Text style={styles.btninfo}>Instrucciones <MaterialCommunityIcons name={"arrow-right"} size={15} color={"#454546"}/> </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            
          )}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "600",
    fontSize: 18,
    color: "#454546"
  },
}); //cierre de la hoja de stilos

