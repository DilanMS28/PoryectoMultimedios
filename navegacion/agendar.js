import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { auth, app } from "../AccesoFirebase/accesoFirebase"; // Asegúrate de importar db desde tu configuración de Firebase
import { collection, addDoc, doc,getFirestore } from "firebase/firestore"; // Importa las funciones necesarias desde Firestore
import { set } from "firebase/database";

const db = getFirestore(app);

export default function Agendar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params;

  const [selectedValue, setSelectedValue] = useState(0);
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [openFin, setOpenFin] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

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

  const handleAgendar = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Por favor, inicia sesión primero.");
        return;
      }

      const userRef = doc(db, "User", user.uid); 
      const agendarRef = collection(userRef, "Agendar");

      await addDoc(agendarRef, {
        titulo,
        dateInicio: `${dateInicio.getHours()}h :${dateInicio.getMinutes()}m`,
        dateFin: `${dateFin.getHours()}h :${dateFin.getMinutes()}m`,
        recordatorio: selectedValue,
        descripcion,
        selectedDate, 
      });

      Alert.alert("Cita agendada exitosamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al agendar la cita: ", error);
      Alert.alert("Error al agendar la cita, por favor intenta nuevamente.");

    }finally{setTitulo(''), setDateInicio(new Date()),setDateFin(new Date()),setDescripcion('')}
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
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
          
          <Text style={styles.titulo}>Agendar</Text>
        </View>

        <Text style={styles.label}>Título</Text>
        <TextInput
          keyboardType="ascii-capable"
          placeholder="Título para agendar"
          style={styles.inputTxt}
          underlineColor="transparent"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Hora de inicio</Text>
        <TouchableOpacity onPress={() => setOpenInicio(true)}>
          <Text style={styles.inputTxt}>
            {`${dateInicio.getHours()}h :${dateInicio.getMinutes()}m`}
          </Text>
        </TouchableOpacity>
        {openInicio && (
          <DateTimePicker
            value={dateInicio}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateChangeInicio}
          />
        )}

        <Text style={styles.label}>Hora de fin</Text>
        <TouchableOpacity onPress={() => setOpenFin(true)}>
          <Text style={styles.inputTxt}>
            {`${dateFin.getHours()}h :${dateFin.getMinutes()}m`}
          </Text>
        </TouchableOpacity>
        {openFin && (
          <DateTimePicker
            value={dateFin}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateChangeFin}
          />
        )}

        <Text style={styles.label}>Recordatorio</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.inputTxt}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Ninguno" value={0} />
          <Picker.Item label="5 minutos antes" value={5} />
          <Picker.Item label="10 minutos antes" value={10} />
          <Picker.Item label="15 minutos antes" value={15} />
          <Picker.Item label="30 minutos antes" value={30} />
        </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          placeholder="Descripción"
          style={styles.inputTxt}
          underlineColor="transparent"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <TouchableOpacity onPress={handleAgendar}>
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
    marginBottom: 20,
    marginTop: 10,
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
}); //cierre de la hoja de stilos
