import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFirestore, doc, getDoc, updateDoc,Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);
const auth = getAuth(app);

export default function ActualizarCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

  // Estados para manejar los datos de la cita
  const [selectedValue, setSelectedValue] = useState(0);
  const [title, setTitle] = useState("");
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [openFin, setOpenFin] = useState(false);
  const [description, setDescription] = useState("");

  // Función para obtener los datos de la cita a actualizar
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const eventRef = doc(db, "User", uid, "Agendar", eventId);
          const eventDoc = await getDoc(eventRef);
          if (eventDoc.exists()) {
            const eventData = eventDoc.data();
            setTitle(eventData.titulo || "");
            setDescription(eventData.descripcion || "");
  
            // Verificar y establecer la fecha de inicio si existe y es válida
            if (eventData.dateInicio && eventData.dateInicio instanceof Timestamp) {
              setDateInicio(eventData.dateInicio.toDate());
            }
  
            // Verificar y establecer la fecha de fin si existe y es válida
            if (eventData.dateFin && eventData.dateFin instanceof Timestamp) {
              setDateFin(eventData.dateFin.toDate());
            }
  
            setSelectedValue(eventData.recordatorio || 0);
          } else {
            console.log("No existe ese documento!");
          }
        }
      } catch (error) {
        console.error("Error fetching event data: ", error);
      }
    };
  
    fetchEventData();
  }, [eventId]);

  // Función para manejar el cambio de fecha de inicio
  const handleDateChangeInicio = (event, selectedDate) => {
    setOpenInicio(false);
    if (selectedDate) {
      setDateInicio(selectedDate);
    }
  };

  // Función para manejar el cambio de fecha de fin
  const handleDateChangeFin = (event, selectedDate) => {
    setOpenFin(false);
    if (selectedDate) {
      setDateFin(selectedDate);
    }
  };

  // Función para formatear la hora
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Función para actualizar la cita en Firestore
  const handleActualizarCita = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Por favor, inicia sesión primero.");
        return;
      }
  
      const userRef = doc(db, "User", user.uid); 
      const eventRef = doc(userRef, "Agendar", eventId);
  
      await updateDoc(eventRef, {
        titulo: title,
        // Convertimos las fechas a objetos Timestamp para Firestore
        dateInicio: Timestamp.fromDate(dateInicio),
        dateFin: Timestamp.fromDate(dateFin),
        recordatorio: selectedValue,
        descripcion: description,
      });
  
      Alert.alert("Cita actualizada exitosamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar la cita: ", error);
      Alert.alert("Error al actualizar la cita, por favor intenta nuevamente.");
    }
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
        <View style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 20 }}>
          <Text style={styles.titulo}>Actualizar Cita</Text>
        </View>

        <Text style={styles.label}>Título</Text>
        <TextInput
          keyboardType="ascii-capable"
          placeholder="Título para agendar"
          style={styles.inputTxt}
          underlineColor="transparent"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Hora de inicio</Text>
        <TouchableOpacity onPress={() => setOpenInicio(true)}>
          <Text style={styles.inputTxt}>
            {formatTime(dateInicio)}
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
            {formatTime(dateFin)}
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
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity onPress={handleActualizarCita}>
          <Text style={styles.btninfo}>Actualizar</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00C9D2",
    height: 100,
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
    marginTop: 10,
  },
  inputTxt: {
    backgroundColor: "#DBDBDB",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    width: "90%",
    alignSelf: "center",
    fontSize: 18,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  titulo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginTop: 20,
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
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
});
