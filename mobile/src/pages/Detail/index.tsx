import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather as Icon, FontAwesome} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import styles from './style';


const Detail = ()=>{
    const navigation = useNavigation();
    
    
     function handleNavigatorBack(){
        navigation.goBack();
    }   
     return (
         <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigatorBack}>
        <Icon name="arrow-left" size={20} color="#34cb49" />
        </TouchableOpacity>  

        <Image style={styles.pointImage} source={{uri: 'https://unsplash.com/photos/N-MqWXXZvNY/download?force=true&w=640'}}/>
        <Text style={styles.pointName}>Mercado do seu Zé</Text>
        <Text style={styles.pointItems}>Lampadas, Óleo de Cozinha</Text>
        
        <View style={styles.address}>
         <Text style={styles.addressTitle}>Endereço</Text>
         <Text style={styles.addressContent}>Caraguatatuba, SP</Text>
        </View>
        </View>
        <View style={styles.footer}>

            <RectButton style={styles.button} onPress={()=>{}}>
            <FontAwesome name="whatsapp" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>Whatsapp</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={()=>{}}>
            <Icon name="mail" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>E-Mail</Text>
            </RectButton>
        </View>
         </SafeAreaView>
     );
}

export default Detail;