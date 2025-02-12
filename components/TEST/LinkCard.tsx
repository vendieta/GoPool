import { View , Text , Dimensions , StyleSheet} from "react-native";
import { ExternalLink } from '@/components/ExternalLink';
import React from 'react';

const { width , height } = Dimensions.get('window')

interface DataProps {
    element:{
        iconComponent: React.ReactNode;
        title: string;
        link: string;
    };
}

const LinkCard: React.FC<DataProps> = ({element}) =>{
    return(
        <View>
            <ExternalLink href={element.link}>
                <View style={styles.container}>
                    {React.cloneElement(element.iconComponent as React.ReactElement, { style: styles.icon })}
                    <Text style={styles.text}>{element.title}</Text>
                </View>
            </ExternalLink>
        </View>
    );
}

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
})

export default LinkCard;