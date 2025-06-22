import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';



interface img {
    img: string| null| undefined,
    uri: string,
    name: string | undefined | null ,
    type?: string
}

interface Props {
    setImage: (x: img) => void
    image: img | undefined
    styleT: ViewStyle
    text: string
}



export default function GalleryFt ({setImage, image, styleT, text}: Props) {

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

    //  result?.assets?.[0]?.fileName esto muestra el nombre completo del la foto:
    // 476ec774-baa0-4604-994e-ca6f3f74e87c.jpeg
    // result?.assets?.[0]?.mimeType esto muestra el type de la img:
    //  image/jpeg
    console.log('data completa: ')
    if (!result.canceled) {
        setImage({img: result.assets[0].base64, uri: result.assets[0].uri, type: result?.assets?.[0]?.mimeType, name: result?.assets?.[0]?.fileName});
        console.log('foto matricula en base64: ', result.assets[0].file)
    }
    // console.log('foto matricula: ', ftMatricula)
    };

    return(
    <TouchableOpacity style={[styleT, image? {borderColor: 'green', borderWidth: 5} : null]} onPress={pickImage}>
        <View><Text style={[{fontSize: 11, textAlign: 'center',color: '#999'}, image? {color: 'green'} : null]}>{ image? 'Listo' : `${text}` } </Text></View>
    </TouchableOpacity>
    )
}