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
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Agendar() {
  //variable para guardar la navegación
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(0);

  //variables para los formatos de las fechas
  const [openIncio, setOpenInicio] = useState(false);
  const [openFin, setOpenFin] = useState(false);
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  // const [fechaFormato, setFechaFormato] = useState("");

  // const formatFecha = (fecha) => {
  //   const dia = fecha.getDate();
  //   const mes = fecha.getMonth() + 1; // Los meses comienzan en 0
  //   const anio = fecha.getFullYear();
  //   setFechaFormato(`${dia}/${mes}/${anio}`);
  // };

  const handleDateChangeInicio = (event, selectedDate) => {
    setOpenInicio(false);
    if (selectedDate) {
      setDateInicio(selectedDate);
    }
  };

  const handleDateChangeFin = (event, selectedDate) => {
    setOpenFin(false);
    if (selectedDate) {
      setDateFin(selectedDate);
    }
  };
  //guardar todos los datos de cada uno de los campos

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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={"black"}
              size={40}
              style={{ marginTop: 20, top: 20, right: 100 }}
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>Agendar</Text>
        </View>

        <Text style={styles.label}>Titulo</Text>
        <TextInput
          keyboardType="ascii-capable"
          placeholder="Titulo para agendar"
          style={styles.inputTxt}
          underlineColor="transparent"
        ></TextInput>

        <TouchableOpacity onPress={() => setOpenInicio(true)}>
          <Text style={styles.label}>Hora Inicio</Text>

          {openIncio && (
            <DateTimePicker
              value={dateInicio}
              mode="time"
              display="clock"
              onChange={handleDateChangeInicio}
            />
          )}

          <Text style={styles.inputTxt}>Hora: {dateInicio.getHours()} Minutos: {dateInicio.getMinutes()}</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpenFin(true)}>
          <Text style={styles.label}>Hora Fin</Text>

          {openFin && (
            <DateTimePicker
              value={dateFin}
              mode="time"
              display="clock"
              onChange={handleDateChangeFin}
            />
          )}

          <Text style={styles.inputTxt}>Hora: {dateFin.getHours()} Minutos: {dateFin.getMinutes()}</Text>

        </TouchableOpacity>





        <Text style={styles.label}>Recordar</Text>
        {/* <TextInput keyboardType="ascii-capable" placeholder="Recordar"  style={styles.inputTxt} underlineColor="transparent"> </TextInput> */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.inputTxt}
        >
          <Picker.Item label="10 minutos antes" value={0} />
          <Picker.Item label="1 Día antes" value={1} />
          <Picker.Item label="2 Dias antes" value={2} />
          <Picker.Item label="1 Semana antes" value={3} />
          <Picker.Item label="15 Días antes" value={4} />
        </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          keyboardType="ascii-capable"
          placeholder="Descripción detalla de la tarea a realizar"
          style={styles.textArea}
          underlineColor="transparent"
          multiline={true}
          numberOfLines={5}
        ></TextInput>

        <TouchableOpacity>
          <Text style={styles.btninfo}>Agendar</Text>
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
    top: 20,
    right: 20,
    // marginLeft: 20,
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
  },
}); //cierre de la hoja de stilos
