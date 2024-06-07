import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";

//importar las rutas de los archivos
import Login from "./navegacion/login";
import RecuperarContraseña from "./navegacion/recuperar";
import CodigoRecuperacion from "./navegacion/codigo";
import NuevaContraseña from "./navegacion/nuevaContraseña";
import CrearCuenta from "./navegacion/crearCuenta";
import Home from "./navegacion/home";
import Habitos from "./navegacion/habitos";
import IMC from "./navegacion/imc";
import Rutinas from "./navegacion/rutinas";
import MenuButton from "./components/menuButton"
import Config from './navegacion/config'

//variable con la función stacknavigator
const StackNav = createStackNavigator();
const DrawerNav = createDrawerNavigator();


//crear la función de rutas con el stack
function Stacks() {


  return (
    <StackNav.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="login" component={Login} />
      <StackNav.Screen name="recuperarcontraseña" component={RecuperarContraseña}/>
      <StackNav.Screen name="codigorecuperacion" component={CodigoRecuperacion}/>
      <StackNav.Screen name="nuevacontraseña" component={NuevaContraseña} />
      <StackNav.Screen name="crearcuenta" component={CrearCuenta} />
      <StackNav.Screen name="home" component={Drawers} />
    </StackNav.Navigator>
  );
}
//crear la función de rutas con el stack
function Drawers() {

  return (
    <DrawerNav.Navigator 
        initialRouteName="inicio" 
        screenOptions={ { headerShown: false } }
        // drawerContent={ (props) => <MenuItem {...props}/> }
    >

      <DrawerNav.Screen name="inicio" component={Home} options={{drawerLabel:"Inicio"}}/>
      <DrawerNav.Screen name="habitos" component={Habitos} options={{drawerLabel:"Habitos Saludables"}} />
      <DrawerNav.Screen name="imc" component={IMC} options={{drawerLabel:"Indice Masa Corporal"}}/>
      <DrawerNav.Screen name="rutinas" component={Rutinas} options={{drawerLabel:"Rutina de Ejercicios"}}/>
      <DrawerNav.Screen name="calendario" component={CrearCuenta} options={{drawerLabel:"Calendario"}} />
      <DrawerNav.Screen name="config" component={Config}  options={{drawerLabel:"Configuraciones"}}/>

    </DrawerNav.Navigator>
  );
}

//https://www.youtube.com/watch?v=TxpMHws0I6Q
// const MenuItem = ({navigation}) => {
//     return(
//         <DrawerContentScrollView>
//             <MenuButton text= "Inicio" onPress={navigation.navigate("inicio")} />
//         </DrawerContentScrollView>
//     );
// }

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
}
