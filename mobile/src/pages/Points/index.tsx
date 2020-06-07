import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';

import styles from './style';

//importado api de conexao com o servidor
import api from '../../services/api';

const Points = ()=>{
    //Definição de interface do item
    interface Item{
        id: number,
        title: string,
        image_url: string 
     }
     const [items, setItems] = useState<Item[]>([]);
     const [selectedItem, setSelectedItem]=useState<number[]>([]);

     //Insere valores dos items
     useEffect(()=>{
        api.get('items').then(res=>{
           setItems(res.data);
       })
       
       }, []);   
    
     const navigation = useNavigation();

     function handleItemClick(id: number){
        const alreadyItem = selectedItem.findIndex(item=>item===id)
        if (alreadyItem >=0){
            //Vai filtrar e deixar apenas os items que não foram o clicados
        const filteredItems = selectedItem.filter(item=>item!==id)
        setSelectedItem(filteredItems)
        }else{
 
         setSelectedItem([...selectedItem,id]);   
        }
 
     }
 
    
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
         {items.map(item=>(
          <TouchableOpacity
          activeOpacity={0.6}
          style={[
              styles.item,
             selectedItem.includes(item.id) ? styles.selectedItem : {}
            ]} 
          onPress={()=>handleItemClick(item.id)
          }>
          <SvgUri width={42} height={42} uri={item.image_url}/>
          <Text style={styles.itemTitle}>{item.title}</Text>
         </TouchableOpacity>
       
    ))}
         
         
          </ScrollView>
      </View>
      </>



     );
}

export default Points;