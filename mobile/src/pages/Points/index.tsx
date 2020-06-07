import React from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';

import styles from './style';


const Points = ()=>{
     const navigation = useNavigation();
    
    
     function handleNavigatorBack(){
        navigation.goBack();
     }
     function handleNavigateToDetail(){
      navigation.navigate('Detail');
     }



    return (
        <>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigatorBack}>
      <Icon name="arrow-left" size={20} color="#34cb49" />
      </TouchableOpacity>

      <Text style={styles.title}>Bem Vindo.</Text>
      <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
      
      <View style={styles.mapContainer}>
       <MapView style={styles.map} initialRegion={{
           latitude: -23.6395428,
           longitude: -45.4215668,
           latitudeDelta: 0.014,
           longitudeDelta: 0.014,

           }}>
           <Marker style={styles.mapMarker} coordinate={{           
           latitude: -23.6395428,
           longitude: -45.4215668,  
           }}
           onPress={handleNavigateToDetail}
           >
           <View style={styles.mapMarkerContainer}>
           <Image style={styles.mapMarkerImage}source={{uri:'https://unsplash.com/photos/N-MqWXXZvNY/download?force=true&w=640'}}/>
           <Text style={styles.mapMarkerTitle}>Mercado do seu zé</Text>
           </View>
           </Marker>
           </MapView>

      </View>
      </View>
      <View style={styles.itemsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24}}>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
           <SvgUri width={42} height={42} uri="http://192.168.100.155:3333/uploads/lampadas.svg"/>
           <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          </ScrollView>
      </View>
      </>



     );
}

export default Points;