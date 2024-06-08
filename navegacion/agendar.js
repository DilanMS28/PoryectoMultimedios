import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Agendar() {
  //variable para guardar la navegación
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(0);


  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons
            name="menu"
            fontSize={10}
            color={"white"}
            size={40}
          />
        </TouchableOpacity>
        <Text style={styles.tituloheader}>Salud y Bienestar</Text>

        <TouchableOpacity>
          <Image
            source={require("../assets/imagenes/perfile.png")}
            resizeMode="center"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={styles.flecha} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Agendar</Text>

        <Text style={styles.label}>Titulo</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Titulo para agendar" style={styles.inputTxt} underlineColor="transparent"></TextInput>

        <Text style={styles.label}>Hora Inicio</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Hora de Inicio" style={styles.inputTxt} underlineColor="transparent"></TextInput>

        <Text style={styles.label}>Hora Fin</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Hora de Finalizacion" style={styles.inputTxt} underlineColor="transparent"></TextInput>

        <Text style={styles.label}>Recordar</Text>
        {/* <TextInput keyboardType="ascii-capable" placeholder="Recordar"  style={styles.inputTxt} underlineColor="transparent"> </TextInput> */}
        <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} style={styles.inputTxt}>
          <Picker.Item label="10 minutos antes" value={0} />
          <Picker.Item label="1 Día antes" value={1} />
          <Picker.Item label="2 Dias antes" value={2} />
          <Picker.Item label="1 Semana antes" value={3} />
          <Picker.Item label="15 Días antes" value={4} />
        </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Descripción detalla de la tarea a realizar" style={styles.textArea} underlineColor="transparent"></TextInput>


        <TouchableOpacity >
          <Text style={styles.btninfo}>Agendar</Text>
        </TouchableOpacity>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  tituloheader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 18,
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
  },
  txtTarjeta: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "justify",
    lineHeight: 20,
    padding: 5,
    marginBottom: 10,
  },
  txt: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 18,
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
  },
  //  
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
    marginTop: 20,
    borderRadius: 20,
  },

  flecha: {
    marginLeft: 20,
    top: 40,
  }
}); //cierre de la hoja de stilos
