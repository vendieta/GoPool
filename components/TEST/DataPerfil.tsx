import { View , Text , StyleSheet , Dimensions } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Link, Route } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { width, height } = Dimensions.get('window');

interface DataProps {
    element: {
        iconComponent: React.ReactNode;
        title: string;
        link: Route;
    };
};

const DataPerfil: React.FC<DataProps> = ({element}) =>{
    return(
        <Link href={element.link}>
            <View style={styles.container}>
                {React.cloneElement(element.iconComponent as React.ReactElement, { style: styles.icon })}
                <Text style={styles.text}>{element.title}</Text>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginLeft: 30,
        color: 'white',
    },
    container: {
        width: width*0.95,
        borderRadius: 15,
        backgroundColor: '#696969',
        flexDirection: 'row',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 6,
    },
    text: {
        margin: 'auto',
        fontSize: 20,
        color: 'white',
    },
});

export default DataPerfil;