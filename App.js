import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./navegacion/login"
import RecuperarContraseña from "./navegacion/recuperar";
import CodigoRecuperacion from "./navegacion/codigo";
import NuevaContraseña from "./navegacion/nuevaContraseña";
import CrearCuenta from "./navegacion/crearCuenta";
import Navegacion from './Navegacion';

export default function App() {
  return (
    // <View style={styles.container}>
    // <View >
      // {/* <Login/> */}
      // {/* <RecuperarContraseña/> */}
      // {/* <CodigoRecuperacion/> */}
      // {/* <NuevaContraseña/> */}
      // {/* <CrearCuenta/> */}
      <Navegacion/>
      

      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
