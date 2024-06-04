import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./navegacion/login"
import RecuperarContraseña from "./navegacion/recuperar";
import CodigoRecuperacion from "./navegacion/codigo";
import NuevaContraseña from "./navegacion/nuevaContraseña";

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
      {/* <RecuperarContraseña/> */}
      {/* <CodigoRecuperacion/> */}
      {/* <NuevaContraseña/> */}
      

      <StatusBar style="auto" />
    </View>
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
