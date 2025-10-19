// import React from 'react';
// import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';


// const LoadingOverlay = ({ visible }: Props) => {
    //     return (
//         <Modal
//         transparent
//         animationType="fade"
//         visible={visible}
//         >
//         <View style={styles.overlay}>
//             <ActivityIndicator size="large" color="#fff" />
//         </View>
//         </Modal>
//     );
//     };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)', // oscuro y translúcido
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default LoadingOverlay;


import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
// import { BlurView } from 'expo-blur';



type LoadingOverlayProps = {
    visible: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    const [internalVisible, setInternalVisible] = useState<boolean>(visible);
    
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        
    if (visible) {
        setInternalVisible(true); // Mostrar inmediatamente
    } else {
      // Esperar 1.5 segundos antes de ocultar
      timeout = setTimeout(() => {
        setInternalVisible(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
}, [visible]);

return (
    <Modal transparent animationType="fade" visible={internalVisible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
        {/* esto en lugar del view
         // <BlurView intensity={50} tint="dark" style={styles.overlay}>
        //   <ActivityIndicator size="large" color="#fff" />
        // </BlurView> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;


