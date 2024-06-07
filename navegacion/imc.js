import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Habitos() {
  //variable para guardar la navegación
  const navigation = useNavigation();
 
  //variables para los datos
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);

  function calcularIMC(peso, altura) {
    const alturaEnMetros = altura / 100;
    const imc = peso / (alturaEnMetros * alturaEnMetros);
    return imc;
  }

  const handleCalcular = () => {
    const imcCalculado = calcularIMC(parseFloat(peso), parseFloat(altura));
    setImc(imcCalculado);
    console.log(peso, altura)
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
            style={styles.flecha}
          />
        </TouchableOpacity>
        <Text style={styles.tituloheader}>Salud y Bienestar</Text>

        <TouchableOpacity>
          <Image
            source={require("../assets/imagenes/perfile.png")}
            resizeMode="center"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.titulo}>Calculadora IMC</Text>

        <Text style={styles.txt}>Calcula tu Indice de Masa Corporal</Text>

        <Text style={styles.label}>Estatura</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Estatura en cm"  style={styles.inputTxt} underlineColor="transparent" onChangeText={(value)=>setAltura(value)} value={altura}></TextInput>
        
        <Text style={styles.label}>Peso</Text>
        <TextInput keyboardType="ascii-capable" placeholder="Peso en kg"  style={styles.inputTxt} underlineColor="transparent" onChangeText={(value)=>setPeso(value)} value={peso}></TextInput>

        <TouchableOpacity onPress={handleCalcular}>
        <Text style={styles.btninfo}>Calcular</Text>
      </TouchableOpacity>


      <Text style={styles.label}>Resultado</Text>
      {imc && <Text>IMC: {imc.toFixed(2)} </Text>}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  inputTxt:{
    backgroundColor:"#DBDBDB",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 18,
  },
  txtTarjeta:{
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
    marginTop: 40,
  },
//  
  btninfo: {
    backgroundColor: "#BEEE3B",
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
}); //cierre de la hoja de stilos
