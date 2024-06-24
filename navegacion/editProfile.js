import React, {useEffect, useState} from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';



export default function EditProfile() {

    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
            }
        })();
    }, []);

    const handlePickImage = async () => {
        try {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled) {
                console.log('Selección de imagen cancelada');
            } else if (result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setSelectedImage(uri);

            } else {
                Alert.alert('Error', 'No se recibió la URI de la imagen seleccionada.');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo seleccionar la imagen.');

        }
    };

    return (

        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("config")}>
                    <MaterialCommunityIcons name="arrow-left" color={"black"} size={40} style={{ marginTop: 42, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.editPerfil}>
                    <MaterialCommunityIcons
                        onPress={handlePickImage}
                        name="plus-circle"
                        color={'#BEEE3B'}
                        size={40}
                        style={styles.Icon}
                    />
                    {selectedImage ? (
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1, borderRadius: 75 }}
                        />
                    ) : (
                        <Image
                            source={require('../assets/imagenes/perfile.png')}
                            style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', bottom: 35, zIndex: -1, borderRadius: 75 }}
                        />
                    )}
                </View>
                <Text style={styles.Edit}> Editar Perfil</Text>
                <View style={styles.Line} />

                <Text style={styles.Tittle}>Nombre</Text>
                <TextInput
                    keyboardType="ascii-capable"
                    placeholder="Tu nombre:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Apellidos</Text>
                <TextInput
                    keyboardType="ascii-capable"
                    placeholder="Tus apellidos:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Correo</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Correo Electrónico:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

                <Text style={styles.Tittle}>Contraseña</Text>
                <TextInput
                    keyboardType="ascii-capable"
                    placeholder="Contraseña:"
                    style={styles.inputTxt}
                    underlineColor="transparent"
                ></TextInput>

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
        marginBottom: 20
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
        marginTop: 15,
        borderRadius: 20,
        marginBottom: 20
    },
});