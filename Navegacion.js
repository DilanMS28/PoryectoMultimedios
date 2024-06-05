import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//importar las rutas de los archivos
import Login from "./navegacion/login"
import RecuperarContraseña from "./navegacion/recuperar";
import CodigoRecuperacion from "./navegacion/codigo";
import NuevaContraseña from "./navegacion/nuevaContraseña";
import CrearCuenta from "./navegacion/crearCuenta";

//variable con la función stacknavigator
const StackNav = createStackNavigator();

//crear la función de rutas con el stack
function Stacks(){
    // options={{ headerShown: false }} {headerVisible: false}

    return(
        <StackNav.Navigator initialRouteName="login" screenOptions={ {headerShown: false}}>
            <StackNav.Screen name="login" component={Login}/>
            <StackNav.Screen name="recuperarcontraseña" component={RecuperarContraseña}/>
            <StackNav.Screen name="codigorecuperacion" component={CodigoRecuperacion}/>
            <StackNav.Screen name="nuevacontraseña" component={NuevaContraseña}/>
            <StackNav.Screen name="crearcuenta" component={CrearCuenta}/>
        </StackNav.Navigator>
    );
}


export default function Navegacion(){
    return(
        <NavigationContainer>
            {/* //retornamos la función con las rutas stacks */}
            <Stacks/>
        </NavigationContainer>
    );
}