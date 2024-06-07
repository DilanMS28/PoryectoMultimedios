import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const data = [
    { label: 'Nombre: Juanito', value: '1' },
    { label: 'Apellido: Perez Perez', value: '2' },
    { label: 'Correo: juanitoperez98@gmail.com', value: '3' },
    { label: 'Contraseña: **********', value: '4' },
  ];

export default function Config() {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#00C9D2' }]}>
           
          </Text>
        );
      }
      return null;
    };

    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("inicio")}>
                <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
            </TouchableOpacity>

            <View >

                <Image source={require('../assets/imagenes/perfile.png')} style={{width:150, height:150, marginLeft: 'auto', marginRight: 'auto'}}/>

            </View>
            <Text style={styles.Confi}> Configuraciones</Text>
            <View style={styles.Line} />

            {/* Inicio de algo raro */}
            <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#00C9D2' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}          
          maxHeight={300}
          labelField="label" 
          valueField = 'value'          
          placeholder={!isFocus ? 'Informacion Personal  ' : '...'}          
          value={value} 
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value); 
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <AntDesign onPress={() => navigation.navigate("inicio")}
              style={styles.icon}
              color={isFocus ? '#00C9D2' : 'black'}
              name="edit"
              size={20}
            />
          )}
        />
      </View>

            {/* Fin de algo raro */}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    Line: {
        height: 3,
        width: "80%",
        backgroundColor: "#00C9D2",
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    Confi: {
        color: '#484848',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 14,

    },    

    dropdown: {
        height: 50,
        borderColor: 'gary',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#DBDBDB'
      },
      icon: {
        marginRight: 5,
        
      },
      label: {
        position: 'absolute',
        backgroundColor: '#DBDBDB',
        left: 22,
        marginTop: 15,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 30,
        height: 30,
      },


});