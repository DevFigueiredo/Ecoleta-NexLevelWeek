import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {View, ImageBackground, Text, Image, Button} from 'react-native';
import styles from './style';
import {RectButton} from 'react-native-gesture-handler';

export default function Home (){
    return(
<ImageBackground style={styles.container} 
source={require('../../assets/home-background.png')}
imageStyle={{width:274, height:368}}

>
<View style={styles.main}>
    <Image source={require('../../assets/logo.png')}/>
    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.</Text>
</View>
        <View style={styles.footer}>
       <RectButton style={styles.button} onPress={()=>{}}>
           <View style={styles.buttonIcon}>
               <Text>
                   <Icon name="arrow-right" color="#FFF" size={24}/>
               </Text>
           </View>
        <Text style={styles.buttonText}>
            Entrar
        </Text>
       </RectButton>

        </View>
</ImageBackground>
    );
}