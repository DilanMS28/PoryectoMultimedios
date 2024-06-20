import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Login() {
  //variable para guardar la navegación
  const navigation = useNavigation();
  const objetivos = "https://www.un.org/sustainabledevelopment/es/2015/09/la-asamblea-general-adopta-la-agenda-2030-para-el-desarrollo-sostenible/"
  const salud = "https://www.un.org/sustainabledevelopment/es/health/"

  async function linkPress(url) {
    const supported = await Linking.canOpenURL(url);
    if(supported){
      await Linking.openURL(url);
    }else{
      alert("Link No se pudo abrir")
    }
  }
  // const linkPress = async (url) =>{
  //   const supported = await Linking.canOpenURL(url);

  //   if(supported){
  //     await Linking.canOpenURL(url);
  //   }else{
  //     alert("Link No se pudo abrir")
  //   }
  // }


  return (
    <View style={styles.container}>

      <View style={styles.nav}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" fontSize={10} color={"white"} size={40} style={styles.flecha}/>
        </TouchableOpacity>
        <Text style={styles.tituloheader}>Salud y Bienestar</Text>

        <TouchableOpacity onPress={()=>navigation.navigate("config")}>
          <Image source={require("../assets/imagenes/perfile.png")} resizeMode="center" style={{width:50, height:50}}/>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.titulo}>Bienvenido</Text>

        <Text style={styles.txt}>
          La Buena Salud no es algo que podemos comprar
        </Text>

        <Text style={styles.subtitulo}>17 Objetivos</Text>

        <View style={styles.objetivos}>
          <Image
            source={require("../assets/imagenes/objetivos.jpg")}
            resizeMode="center"
            style={styles.img}
          />
        </View>
{/* 
        <TouchableOpacity onPress={()=>navigation.navigate("login")}>
          <Text style={styles.btninfo}>+ Más Información</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={()=>linkPress(objetivos)}>
          <Text style={styles.btninfo}>+ Más Información</Text>
        </TouchableOpacity>


        <View style={styles.division} />

        <Text style={styles.subtitulo}>Salud y Bienestar</Text>
        <Text style={styles.txt}>
          Objetivo 3: Garantizar una vida sana y promover el bienestar para todos en todas las edades
        </Text>
        <Text style={styles.txt}>
          Garantizar una vida saludable para todos requiere un fuerte
          compromiso, pero los beneficios superan los costes. Las personas sanas
          son la base de unas economías sanas. Se insta a los países de todo el
          mundo a tomar medidas inmediatas y decisivas para predecir y
          contrarrestar los desafíos en la salud.
        </Text>

        <TouchableOpacity onPress={()=>linkPress(salud)}>
          <Text style={styles.btninfo}>+ Más Información</Text>
        </TouchableOpacity>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingRight: 24,
    // paddingLeft: 24,
  },
  nav:{
    display:"flex",
    flexDirection:"row",
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
  tituloheader:{
    fontSize:20,
    fontWeight: "bold",
    color:"#fff"
  },
  txt: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 18,
    textAlign: "justify",
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    lineHeight:25,
  },

  img:{
    height: 400, 
    width: 400,
    marginRight:"auto",
    marginLeft:"auto",
    marginTop: 0,
    marginBottom: 0,
  },
  division: {
    height: 2,
    width: "90%",
    backgroundColor: "#BEEE3B",
    marginBottom: 20,
    marginLeft:"auto",
    marginRight:"auto"
  },

  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginTop:40,
  },
  subtitulo:{
    color:"#fff",
    fontSize: 20,
    fontWeight:"bold",
    backgroundColor:"#00C9D2",
    borderRadius: 20,
    textAlign:"center",
    padding: 10,
    paddingLeft: 20,
    paddingR: 20,
    marginRight:"auto",
    marginLeft:"auto",
    marginBottom: 20,
  },
  btninfo: {
    backgroundColor: "#BEEE3B",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 12,
    width: 180,
    height: 50,
    marginLeft: "auto",
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
}); //cierre de la hoja de stilos
