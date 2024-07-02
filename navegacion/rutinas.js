import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Rutinas() {
  //variable para guardar la navegación
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons
            name="menu"
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
      </View>

      <ScrollView >
        <Text style={styles.titulo}>Rutinas Ejercicios</Text>

        <Text style={styles.txt}>El ejercicio nos ayuda a mantenernos saludables</Text>

        <View style={styles.tarjeta}>
            
            <View style={styles.headerTarjeta}>
                <MaterialCommunityIcons name="weight-kilogram" fontSize={10} color={"white"} size={40} style={styles.flecha}/>
                <Text style={styles.tituloTarjeta}>Ejercicios</Text>
            </View>

            <Text style={styles.txtTarjeta}>Te gustaría conocer acerca de los mejores ejercicios para tu salud</Text>

            <TouchableOpacity onPress={() => navigation.navigate("chat")}>
                <Text style={styles.btninfo}>Ejercicios</Text>
            </TouchableOpacity>

        </View>

        <View style={styles.tarjeta}>
            
            <View style={styles.headerTarjeta}>
                <MaterialCommunityIcons name="dumbbell" fontSize={10} color={"white"} size={40} style={styles.flecha}/>
                <Text style={styles.tituloTarjeta}>Quemar Grasa</Text>
            </View>

            <Text style={styles.txtTarjeta}>Son aquellos que nos ayudan a mantenernos con energía durante el día</Text>

            <TouchableOpacity>
                <Text style={styles.btninfo}>Rutina</Text>
            </TouchableOpacity>

        </View>


        <View style={styles.tarjeta}>

            <View style={styles.headerTarjeta}>
                <MaterialCommunityIcons name="weight-lifter" fontSize={10} color={"white"} size={40} style={styles.flecha}/>
                <Text style={styles.tituloTarjeta}>Ganar Masa Muscular</Text>
            </View>

            <Text style={styles.txtTarjeta}>Son aquellos que nos ayudan a conciliar mejor el sueño y favorece la recuperación y el descanso</Text>

            <TouchableOpacity>
                <Text style={styles.btninfo}>Rutina</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.tarjeta}>

            <View style={styles.headerTarjeta}>
                <MaterialCommunityIcons name="run" fontSize={10} color={"white"} size={40} style={styles.flecha}/>
                <Text style={styles.tituloTarjeta}>Crossfit</Text>
            </View>

            <Text style={styles.txtTarjeta}>Son aquellos que favorecen la digestión y ayudan a mantener un cuerpo sano</Text>

            <TouchableOpacity>
                <Text style={styles.btninfo}>Rutina</Text>
            </TouchableOpacity>
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 12,
    width: 180,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    borderRadius: 20,
  },
}); //cierre de la hoja de stilos

