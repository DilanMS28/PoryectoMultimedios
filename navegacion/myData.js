import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function MyData() {

    const [selectedValue, setSelectedValue] = useState(0);
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("config")}>
                    <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Text style={styles.Edit}> Editar mis datos</Text>
                <View style={styles.Line} />

                <Text style={styles.Tittle}>Altura</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tu estatura en cm:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Peso</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tu peso en Kg::"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Horas de sueño</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tus horas de sueño:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Tipo de sangre</Text>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} style={styles.Pick}>
                    <Picker.Item label="--Seleccionar--" value={0} />
                    <Picker.Item label="A+" value={1} />
                    <Picker.Item label="A-" value={2} />
                    <Picker.Item label="B+" value={3} />
                    <Picker.Item label="B-" value={4} />
                    <Picker.Item label="AB+" value={5} />
                    <Picker.Item label="AB-" value={6} />
                    <Picker.Item label="0+" value={7} />
                    <Picker.Item label="O-" value={8} />
                </Picker>



                <TouchableOpacity onPress={() => navigation.navigate("config")}>
                    <Text style={styles.btn}>Guardar</Text>
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
        width: "90%",
        backgroundColor: "#00C9D2",
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    Edit: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 14,
    },

    Tittle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },

    inputTxt: {
        backgroundColor: "#DBDBDB",
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        width: "90%",
        padding: 10,
        fontSize: 16,
        marginBottom: 20,

    },

    Pick: {
        backgroundColor: "#DBDBDB",
        padding: 10,
        paddingLeft: 20,
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        fontSize: 18,
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