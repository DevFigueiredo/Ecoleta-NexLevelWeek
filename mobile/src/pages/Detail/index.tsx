import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Feather as Icon, FontAwesome} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';

import * as MailComposer from 'expo-mail-composer';



import styles from './style';



import api from '../../services/api';

interface Params{
    point_id: string;
}
interface Point{
    point:{
    id: number;
    image_url: string;
    name: string;
    email:string;
    whatsapp:string;
    city: string;
    uf: string;
    },
    items:[{
        title: string;
    }]
   
 }

const Detail = ()=>{
    const [PointData, setPointData] = useState<Point>({} as Point);
    
    
    
    const route = useRoute();
    const routeParams = route.params as Params;

    useEffect(()=>{
        api.get(`points/${routeParams.point_id}`).then(res=>{
     setPointData(res.data)
    })
    },[])

    if(!PointData.point){
        //Para o fututo será retornado um Loading
        return null;
    }

    const navigation = useNavigation();
    
    
     function handleNavigatorBack(){
        navigation.goBack();
    }   

    function handleComposeMail(){
        MailComposer.composeAsync({
            subject:'Interesse na coleta de resíduos',
            recipients: [PointData.point.email],
        });
    }
    function handleWhatsapp(){
     Linking.openURL(`whatsapp://send?phone=${PointData.point.whatsapp}&text="Tenho interesse sobre coleta de resíduos"`)
    }


     return (
         <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigatorBack}>
        <Icon name="arrow-left" size={20} color="#34cb49" />
        </TouchableOpacity>  

        <Image style={styles.pointImage} source={{uri: PointData.point.image_url}}/>
        <Text style={styles.pointName}>{PointData.point.name}</Text>
        
        <Text style={styles.pointItems}>
            {PointData.items.map(item=>item.title).join(', ')}
            </Text>
        
        <View style={styles.address}>
         <Text style={styles.addressTitle}>Endereço</Text>
     <Text style={styles.addressContent}>{PointData.point.city}, {PointData.point.uf}</Text>
        </View>
        </View>
        <View style={styles.footer}>

            <RectButton style={styles.button} onPress={handleWhatsapp}>
            <FontAwesome name="whatsapp" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>Whatsapp</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={handleComposeMail}>
            <Icon name="mail" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>E-Mail</Text>
            </RectButton>
        </View>
         </SafeAreaView>
     );
}

export default Detail;