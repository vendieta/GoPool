import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface DataProps {
    element: {
        iconComponent: React.ReactNode;
        title: string;
        link: string; // Simplificamos a string y confiamos en que sean rutas válidas
    };
    textColor?: string;
}

const DataPerfil: React.FC<DataProps> = ({ element, textColor = 'white' }) => {
    return (
        <Link href={element.link as any}> {/* Usamos 'as any' temporalmente */}
            <View style={[styles.container, { backgroundColor: '#696969' }]}>
                {React.cloneElement(element.iconComponent as React.ReactElement, { 
                    style: [styles.icon, { color: textColor }] 
                })}
                <Text style={[styles.text, { color: textColor }]}>{element.title}</Text>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginLeft: 30,
    },
    container: {
        width: Dimensions.get('window').width * 0.95,
        borderRadius: 15,
        flexDirection: 'row',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 6,
        alignItems: 'center',
    },
    text: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default DataPerfil;