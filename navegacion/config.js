import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



export default function Config() {

  const navigation = useNavigation();

  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("inicio")}>
        <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
      </TouchableOpacity>

      <View >
        <View style={styles.editPerfil}>

          <MaterialCommunityIcons name="plus-circle" color={'#BEEE3B'} size={40} style={styles.Icon} />
          <Image source={require('../assets/imagenes/perfile.png')} style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1 }} />

        </View>
      </View>
      <Text style={styles.Confi}> Configuraciones</Text>
      <View style={styles.Line} />



    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editPerfil:{
    display: 'inline',
    alignItems: 'flex-end'

},

Icon:{
    Top: 50,
    right: 130,
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

});