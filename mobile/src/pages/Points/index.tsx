import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image, Alert} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import * as Location from 'expo-location';


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
     interface Point{
        id: number;
        image: string;
        name: string;
        latitude: number;
        longitude: number;
       
     }
     const [items, setItems] = useState<Item[]>([]);
     const [selectedItem, setSelectedItem]=useState<number[]>([]);
     const [Points, setPoints]=useState<Point[]>([]);
     const [initialPositionMap,setInicialPositionMap] = useState<[number,number]>([0,0]);

     //Realiza a consulta da funcao apenas quando a pagina for carregada
     useEffect(()=>{
        api.get('items').then(res=>{
           setItems(res.data);
       })
       
       }, []);   
    
       useEffect(()=>{
        async function LoadPositionMap(){
            //Solicita permissão para o usuário para consultarmos a localização atual
            const {status} = await Location.requestPermissionsAsync();
            //Verificar a permissão se foi concedida, caso contrario retorna um Alerta para o usuário
            if(status !== 'granted') {
                Alert.alert('Ooops!', 'Habilite sua localização nas configurações do app');
                return;
             }

             //Reliza a consulta da localização do usuário
             const location = await Location.getCurrentPositionAsync();
             //Desustrutura o retorno das coordenadas de localização do usuário 
             const {latitude, longitude} = location.coords; 
             setInicialPositionMap([latitude, longitude])
        }

        LoadPositionMap();
       
       }, []);   
    
       useEffect(()=>{
        api.get('points',{
            params:{
                city: routeParams.City,
                uf: routeParams.UF,
                items: selectedItem
            }

        }).then(res=>{
            setPoints(res.data);
       })
       
       }, [selectedItem]);   

    interface ParamsRoute{
        UF: string;
        City: string;
    }

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as ParamsRoute;
    
    
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
     function handleNavigateToDetail(id: number){
      navigation.navigate('Detail', {point_id: id});    
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

       {
       //Verifica se o initial position está zerado, se tiver ele aguarda até que altere o estado pegando a localização atual do celular
       initialPositionMap[0]!==0 && (
           <MapView style={styles.map} 
           initialRegion={{
               latitude: initialPositionMap[0],
               longitude: initialPositionMap[1],
               latitudeDelta: 0.014,
               longitudeDelta: 0.014,
    
               }}>

             {Points.map(point=>(

               <Marker key={point.id} style={styles.mapMarker} coordinate={{           
                latitude: point.latitude,
                longitude: point.longitude,  
                }}
                onPress={()=>handleNavigateToDetail(point.id)}
                >
                <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage}source={{uri:point.image}}/>
                <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
                </Marker>
             ))}

               </MapView>
    
       )}
      </View>
      </View>
      <View style={styles.itemsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24}}>
         {items.map(item=>(
          <TouchableOpacity
          key={item.id}
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