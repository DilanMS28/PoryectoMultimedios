import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import * as ImagePicker from 'expo-image-picker';

const dataP = [
  { nombre: 'Nombre: Juanito' },
  { apellido: 'Apellidos: Perez Perez' },
  { correo: 'Correo: correo@correo.com' },
  { contrasenna: 'Contraseña: **********' },
];

const dataM = [
  { Altura: 'Altura: 160 cm' },
  { Peso: 'Peso: 68 Kg' },
  { Suenno: 'Hora de sueño: 6 h' },
  { Sangre: 'Tipo sangre: -O' },
];

const dataDP = [
  { Dispositivo: 'Xiaomi Poco X5 PRO' },
  { DP: 'Lenovo Yoga L3' }
];

const NS = [
  { Complicado: 'No sé como qué poner aquí' }
];

export default function Config() {
  const navigation = useNavigation();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      }
    })();
  }, []);

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
                {dataP.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
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
                {dataM.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

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
                  onPress={() => navigation.navigate('editarPorfile')}
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
                {NS.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

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
                <Text style={styles.toggleinfo}>Accesibilidad</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {NS.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
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