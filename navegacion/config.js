import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import * as ImagePicker from 'expo-image-picker';


import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth,signOut  } from "firebase/auth";
import { app } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);
const auth = getAuth(app);


const dataDP = [
  { Dispositivo: 'Xiaomi Poco X5 PRO' },
  { DP: 'Lenovo Yoga L3' }
];

const Seguridad = [
  { Seguridad: 'Datos de seguridad' }
];
const Accesibilidad = [
  { Accesibilidad: 'Datos de Accesibilidad' }
];

export default function Config() {
  const navigation = useNavigation();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUpdatedUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, 'User', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
        }
        
        await getUpdatedUserData();
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    fetchUserData();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      getUpdatedUserData();
    }, [])
  );

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        alert("Imagen no seleccionada")
      } else if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
      } else {
        Alert.alert('Error', 'No se recibió la URI de la imagen seleccionada.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigation.navigate('login'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("inicio")}>
        <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
      </TouchableOpacity>
      <ScrollView>
        <View>
          <View style={styles.editPerfil}>
            <MaterialCommunityIcons
              onPress={handlePickImage}
              name="plus-circle"
              color={'#BEEE3B'}
              size={40}
              style={styles.Icon}
            />
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1, borderRadius: 75 }}
              />
            ) : (
              <Image
                source={require('../assets/imagenes/perfile.png')}
                style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1, borderRadius: 75 }}
              />
            )}
          </View>
        </View>
        <Text style={styles.Confi}>Configuraciones</Text>
        <View style={styles.Line} />

        <View>
          <View style={{ bottom: 10 }}>
            <TouchableOpacity onPress={toggleExpanded} style={{ top: 30 }}>
              <View style={styles.toggleContain}>
                <MaterialCommunityIcons
                  onPress={() => navigation.navigate('editarPorfile')}
                  name="square-edit-outline"
                  color="white"
                  size={40}
                  style={styles.editIcon}
                />
                <Text style={styles.toggleinfo}>Informacion Personal</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {userData ? (
                  <>
                    <Text style={styles.dataStyle}>Nombre: {userData.nombre}</Text>
                    <Text style={styles.dataStyle}>Apellidos: {userData.apellidos}</Text>
                    <Text style={styles.dataStyle}>Correo: {userData.correo}</Text>
                    <Text style={styles.dataStyle}>Contraseña: **********</Text>
                  </>
                ) : (
                  <Text style={styles.dataStyle}>No se han insertado datos aún.</Text>
                )}
              </View>
            </Collapsible>
          </View>

          <View style={{ bottom: 10 }}>
            <TouchableOpacity onPress={toggleExpanded} style={{ top: 30 }}>
              <View style={styles.toggleContain}>
                <MaterialCommunityIcons
                  onPress={() => navigation.navigate('misDatos')}
                  name="square-edit-outline"
                  color="white"
                  size={40}
                  style={styles.editIcon}
                />
                <Text style={styles.toggleinfo}>Mis datos</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {userData && userData.datos ? (
                  <>
                    <Text style={styles.dataStyle}>Altura: {userData.datos.altura}</Text>
                    <Text style={styles.dataStyle}>Peso: {userData.datos.peso}</Text>
                    <Text style={styles.dataStyle}>Hora de sueño: {userData.datos.horaSueño}</Text>
                    <Text style={styles.dataStyle}>Tipo sangre: {userData.datos.tipoSangre}</Text>
                  </>
                ) : (
                  <Text style={styles.dataStyle}>No se han insertado datos aún.</Text>
                )}
              </View>
            </Collapsible>
          </View>

          <View style={{ bottom: 10 }}>
            <TouchableOpacity onPress={toggleExpanded} style={{ top: 30 }}>
              <View style={styles.toggleContain}>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  color="white"
                  size={40}
                  style={styles.editIcon}
                />
                <Text style={styles.toggleinfo}>Dispositivos</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {dataDP.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          <View style={{ bottom: 10 }}>
            <TouchableOpacity onPress={toggleExpanded} style={{ top: 30 }}>
              <View style={styles.toggleContain}>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  color="white"
                  size={40}
                  style={styles.editIcon}
                />
                <Text style={styles.toggleinfo}>Seguridad</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {Seguridad.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          <View style={{ bottom: 10 }}>
            <TouchableOpacity onPress={toggleExpanded} style={{ top: 30 }}>
              <View style={styles.toggleContain}>
                <MaterialCommunityIcons
                  name="square-edit-outline"
                  color="white"
                  size={40}
                  style={styles.editIcon}
                />
                <Text style={styles.toggleinfo}>Accesibilidad</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {Accesibilidad.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>
        </View>
        <TouchableOpacity onPress={cerrarSesion}>
          <Text style={styles.btn}>Cerrar Sesión</Text>
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
  editPerfil: {
    display: 'inline',
    alignItems: 'flex-end'

  },

  Icon: {
    Top: 50,
    right: 130,
  },
  Line: {
    height: 3,
    width: "80%",
    backgroundColor: "#00C9D2",
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  Confi: {
    color: '#484848',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 14,

  },
  toggleContain: {
    display: 'inline',
    alignItems: 'flex-end',
    bottom: 40,
    flex: 1
  },

  editIcon: {
    top: 41,
    right: 23,
  },

  toggleinfo: {
    backgroundColor: "#DBDBDB",
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    padding: 10,
    fontSize: 16,

    zIndex: -1,
  },

  dataStyle: {
    fontSize: 16,
    left: 40,
    marginBottom: 10,
    color: '#484848',
  },

  btn: {
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
    marginTop: 40,
    borderRadius: 20,
    marginBottom: 20
  },

});

