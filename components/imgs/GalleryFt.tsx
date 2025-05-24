import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';

interface Props {
    setImage: (x: string) => void
    image: string | null | undefined
    styleT: ViewStyle
}



export default function GalleryFt ({setImage, image, styleT}: Props) {

    const pickImage = async () => {
    // Pedir permiso para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert('Se necesita permiso para acceder a tus fotos');
        return;
    }

    // Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
    });

    console.log('data completa: ')
    if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log('foto matricula en base64: ', result.assets[0].base64)
    }
    // console.log('foto matricula: ', ftMatricula)
    };

    return(
    <TouchableOpacity style={[styleT, image? {borderColor: 'green', borderWidth: 5} : null]} onPress={pickImage}>
        <View><Text style={[{fontSize: 11, textAlign: 'center',color: '#999'}, image? {color: 'green'} : null]}>{ image? 'Listo' : 'Credencial de estudiante' }</Text></View>
    </TouchableOpacity>
    )
}