import { View , Text , StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Link, Route } from 'expo-router';

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
                <Text>{element.title}</Text>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    },
    container: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
    },
    

});

export default DataPerfil;