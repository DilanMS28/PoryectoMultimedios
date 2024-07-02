import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);
const auth = getAuth(app);



export default function Calendario() {
  //variable para guardar la navegación
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [isChecked, setIsChecked] = useState(false)
  const [checkedEvents, setCheckedEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "User", uid);
        const agendarRef = collection(userRef, "Agendar");
        const querySnapshot = await getDocs(agendarRef);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleAgregar = () => {
    if (selected) {
      navigation.navigate("agendar", { selectedDate: selected });
    } else {
      alert("Por favor, selecciona una fecha primero.");
    }
  };

  const cambioDelCheck = (id) => {
    setCheckedEvents(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };


  const eliminarCita = async (eventId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const eventRef = doc(db, "User", uid, "Agendar", eventId);
        await deleteDoc(eventRef);
        fetchEvents();
        Alert.alert("Cita eliminada", "La cita ha sido eliminada correctamente.");
      }
    } catch (error) {
      console.error("Error deleting event: ", error);
      Alert.alert("Error", "No se pudo eliminar la cita.");
    }
  };

  const aviso = (eventId) => {
    Alert.alert('Eliminar', '¿Quieres eliminar esta cita?', [
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminarCita(eventId) },
      { text: 'Cancelar', style: 'cancel', onPress: () => Alert.alert('Cancelado') },
    ]);
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

        

        {isLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.contEvento}>
            <View>
              <Checkbox
                style={styles.check}
                status={checkedEvents[event.id] ? "checked" : "unchecked"}
                onPress={() => cambioDelCheck(event.id)}
              />
            </View>
            <View style={styles.evento}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.txtEvento}>{event.titulo}</Text>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    onPress={() => aviso(event.id)}
                    name={"delete"}
                    size={30}
                    color={"red"}
                    style={{ marginRight: 5 }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("actualizarCita", { eventId: event.id })
                    }
                  >
                    <MaterialCommunityIcons
                      name={"calendar-edit"}
                      size={30}
                      color={"#fff"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
        

        < TouchableOpacity onPress={handleAgregar}>
          <Text style={styles.btninfo}>+ Agregar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View >
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
  evento: {
    backgroundColor: "#BEEE3B",
    width: "90%",
    borderRadius: 20,
    marginRight: "auto",
    marginLeft: "auto",
    padding: 7,
    paddingRight: 16,
  },
  check: {
    color: "#000",
    backgroundColor: "#00C9D2",
    marginLeft: 20,
  },
  contEvento: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    marginBottom: 15,
    marginRight: "auto",
    marginLeft: "auto",
  },
  txtEvento: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    padding: 2,
    textAlign: 'left',
  },
}); //cierre de la hoja de stilos
