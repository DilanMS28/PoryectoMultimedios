import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';


export default function Calendario() {
  //variable para guardar la navegación
  const navigation = useNavigation();
  const [selected, setSelected] = useState(""); //la varible para el calendario
  const [isChecked, setIsChecked] = useState(false)

  const handleAgregar = () => {
    if (selected) {
      navigation.navigate("agendar", { selectedDate: selected });
    } else {
      alert("Por favor, selecciona una fecha primero.");
    }
  };


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

        <TouchableOpacity onPress={() => navigation.navigate("config")}>
          <Image
            source={require("../assets/imagenes/perfile.png")}
            resizeMode="center"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
          <Text style={styles.titulo}>Calendario</Text>
          <Text style={styles.txt}>Aquí puedes agendar tus citas y otros</Text>

          {/* para la aparición del calendario */}
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />

        <Text style={styles.label}>Eventos</Text>

        <View style={styles.contEvento}>
          <View> 
            <Checkbox sytle={styles.check} status={isChecked ? 'checked' : 'unchecked'} onPress={() => setIsChecked(!isChecked)}/>
          </View>
          <View style={styles.evento}>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly", alignItems: "center"}}>
                <Text style={styles.txtEvento}>Cita médica de laboratorio</Text>
                
              <View>
                  <TouchableOpacity onPress={()=> navigation.navigate("actualizarCita")}>
                    <MaterialCommunityIcons name={"calendar-edit"} size={30} color={"#fff"}/>
                  </TouchableOpacity>
                </View> 
            </View>

          </View>
        </View>

        
        <TouchableOpacity onPress={handleAgregar}>
          <Text style={styles.btninfo}>+ Agregar</Text>
        </TouchableOpacity>
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
  tituloheader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 30,
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
    textAlignVertical: "top",
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
    marginTop: 20,
  },
  //
  btninfo: {
    backgroundColor: "#00C9D2",
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
  },
  evento:{
    backgroundColor: "#BEEE3B",
    width: "90%",
    borderRadius: 20,
    marginRight: "auto",
    marginLeft: "auto",
    padding: 5,
  },
  check: {
    color: "#000",
    backgroundColor: "#00C9D2",
    marginLeft: 20,
  },
  contEvento:{
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"row", 
    width:"90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  txtEvento:{
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    padding: 2,

  },
}); //cierre de la hoja de stilos
