import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app, auth } from "../AccesoFirebase/accesoFirebase";

const db = getFirestore(app);

export default function MyData() {
    const navigation = useNavigation();
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [horasSueño, setHorasSueño] = useState('');
    const [tipoSangre, setTipoSangre] = useState(0); 
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Verificar si Firebase está inicializado y el usuario está autenticado
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user);
            } else {
                setUsuario(null);
            }
        });
        return unsubscribe;
    }, []);

    const guardarDatos = async () => {
        if (!usuario) {
            Alert.alert('Error', 'No se ha podido obtener el usuario actual.');
            return;
        }

        try {
            // Actualizar los datos en Firestore
            await updateDoc(doc(db, 'User', usuario.uid), {
                datos: {
                    altura: altura,
                    peso: peso,
                    horaSueño: horasSueño,
                    tipoSangre: tipoSangre,
                }
            });
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
            navigation.navigate('config'); 
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar los datos.');
            console.error('Error al actualizar datos:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('config')}>
                <MaterialCommunityIcons name="arrow-left" color={'black'} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
            </TouchableOpacity>

            <ScrollView>
                <Text style={styles.Edit}>Editar mis datos</Text>
                <View style={styles.Line} />

                <Text style={styles.Tittle}>Altura</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tu estatura en cm"
                    style={styles.inputTxt}
                    underlineColorAndroid="transparent"
                    value={altura}
                    onChangeText={(text) => setAltura(text)}
                />

                <Text style={styles.Tittle}>Peso</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tu peso en Kg"
                    style={styles.inputTxt}
                    underlineColorAndroid="transparent"
                    value={peso}
                    onChangeText={(text) => setPeso(text)}
                />

                <Text style={styles.Tittle}>Horas de sueño</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="Tus horas de sueño"
                    style={styles.inputTxt}
                    underlineColorAndroid="transparent"
                    value={horasSueño}
                    onChangeText={(text) => setHorasSueño(text)}
                />

                <Text style={styles.Tittle}>Tipo de sangre</Text>
                <Picker
                    selectedValue={tipoSangre}
                    onValueChange={(itemValue, itemIndex) => setTipoSangre(itemValue)}
                    style={styles.Pick}
                >
                    <Picker.Item label="--Seleccionar--" value={0} />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                    <Picker.Item label="0+" value="0+" />
                    <Picker.Item label="O-" value="O-" />
                </Picker>

                <TouchableOpacity onPress={guardarDatos}>
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
