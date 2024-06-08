import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

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
  // para navegar
  const navigation = useNavigation();

  // para lista despleglable

  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("inicio")}>
        <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
      </TouchableOpacity>
      <ScrollView>
        <View >
          <View style={styles.editPerfil}>

            <MaterialCommunityIcons name="plus-circle" color={'#BEEE3B'} size={40} style={styles.Icon} />
            <Image source={require('../assets/imagenes/perfile.png')} style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1 }} />

          </View>
        </View>
        <Text style={styles.Confi}> Configuraciones</Text>
        <View style={styles.Line} />

        {/* se agregas los espacios con las listas desplegables */}
        {/* Informacion Personal */}
        <View>
          {/* Informacion Personal */}
          <View style={{ bottom: 10 }} >
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

            {/* Despliege de la info */}
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {dataP.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Mis datos */}
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

            {/* Despliege de la info */}
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {dataM.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Dispositivos */}
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

            {/* Despliege de la info */}
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {dataDP.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Seguridad */}
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

            {/* Despliege de la info */}
            <Collapsible collapsed={collapsed} align="center">
              <View>
                {NS.map((item, index) => (
                  <Text key={index} style={styles.dataStyle}>{Object.values(item)[0]}</Text>
                ))}
              </View>
            </Collapsible>
          </View>

          {/* Accesibilidad */}
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

            {/* Despliege de la info */}
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
    </View >

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