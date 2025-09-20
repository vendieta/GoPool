import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';

interface img {
  img: string | null | undefined,
  uri: string,
  name: string | undefined | null,
  type?: string
}

interface Props {
  setImage: (x: img) => void
  image: img | undefined
  styleT: ViewStyle
  text: string
}

export default function GalleryFt({ setImage, image, styleT, text }: Props) {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Se necesita permiso para acceder a tus fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // ← Aquí el cambio: usar string(s) en vez de ImagePicker.MediaType
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage({
        img: asset.base64,
        uri: asset.uri,
        type: asset.mimeType,
        name: asset.fileName
      });
      console.log('foto matricula en base64: ', asset.file);
    }
  };

  return (
    <TouchableOpacity
      style={[styleT, image ? { borderColor: 'green', borderWidth: 5 } : null]}
      onPress={pickImage}
    >
      <View>
        <Text style={[{ fontSize: 11, textAlign: 'center', color: '#999' }, image ? { color: 'green' } : null]}>
          {image ? 'Listo' : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
