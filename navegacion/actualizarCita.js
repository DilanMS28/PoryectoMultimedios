import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Image
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { getFirestore, doc, getDoc, updateDoc,Timestamp  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);
const auth = getAuth(app);

export default function ActualizarCita() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

  const [selectedValue, setSelectedValue] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [openFin, setOpenFin] = useState(false);

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
            setDateInicio(new Date(eventData.dateInicio.seconds * 1000));
            setDateFin(new Date(eventData.dateFin.seconds * 1000));
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

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const eventRef = doc(db, "User", uid, "Agendar", eventId);
        await updateDoc(eventRef, {
          titulo: title,
          descripcion: description,
          dateInicio: Timestamp.fromDate(dateInicio),
          dateFin: Timestamp.fromDate(dateFin),
          recordatorio: selectedValue,
        });
        Alert.alert(
          "Cita actualizada",
          "La cita ha sido actualizada correctamente."
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating event: ", error);
      Alert.alert("Error", "No se pudo actualizar la cita.");
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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Text style={styles.titulo}>Editar</Text>
        </View>

        <Text style={styles.label}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título para agendar"
          style={styles.inputTxt}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={() => setOpenInicio(true)}>
          <Text style={styles.label}>Hora Inicio</Text>
          <Text style={styles.inputTxt}>
            {`${dateInicio.getHours()}h :${dateInicio.getMinutes()}m`}
          </Text>
          {openInicio && (
            <DateTimePicker
              value={dateInicio}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChangeInicio}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpenFin(true)}>
          <Text style={styles.label}>Hora Fin</Text>
          <Text style={styles.inputTxt}>
            {`${dateFin.getHours()}h :${dateFin.getMinutes()}m`}
          </Text>
          {openFin && (
            <DateTimePicker
              value={dateFin}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChangeFin}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Recordatorio</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.inputTxt}
        >
          <Picker.Item label="10 minutos antes" value={0} />
          <Picker.Item label="1 Día antes" value={1} />
          <Picker.Item label="2 Días antes" value={2} />
          <Picker.Item label="1 Semana antes" value={3} />
          <Picker.Item label="15 Días antes" value={4} />
        </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción detallada de la tarea a realizar"
          style={[styles.inputTxt, styles.textArea]}
          underlineColorAndroid="transparent"
          multiline={true}
          numberOfLines={5}
        />

        <TouchableOpacity onPress={handleUpdate}>
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
