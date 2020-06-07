import React, {useEffect, useState, ChangeEvent, useRef} from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';


//IMportações para formulário (Unform)
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/Input';



const CreatePoint = ()=>{

//Definição de interface do item
    interface Item{
       id: number,
       title: string,
       image_url: string 
    }
   

    interface UF{
        id: number,
        sigla: string,
        nome: string,
     }

     interface City{
        id: number,
        nome: string,
     }

    const [items, setItems] = useState<Item[]>([]);

    const [uf, SetUF] = useState<UF[]>([]);

    const [city, setCity] = useState<City[]>([]);
    
    
    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    
    const [initialPositionMap,setInicialPositionMap] = useState<[number,number]>([0,0]);
    const [LatLng, setLatLng] = useState<[number,number]>([0,0]);
    

    const [selectedItem, setSelectedItem]=useState<number[]>([]);


    const history = useHistory();
    //Define quando eu quero executar uma função, para não ter que carregar toda vez que o componente for recarregado
   //Insere valores dos items
    useEffect(()=>{
     api.get('items').then(res=>{
        setItems(res.data);
    })
    
    }, []);   

    //Insere valores do select de estados
    useEffect(()=>{
       api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
       .then(res=>{SetUF(res.data)
    });
    }, []);
    

    //Insere valores do select de cidades
    useEffect(()=>{
     if(selectedUF==='0'){
     setCity([]);
     return;
     }
     api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
     .then(res=>{setCity(res.data)});
     
    
    }, [selectedUF]);


    useEffect(()=>{
     navigator.geolocation.getCurrentPosition(position=>setInicialPositionMap([position.coords.latitude, position.coords.longitude]));
    }, []);   

    //Verifica se o Seletor de Estados mudou e Seta o novo valor de UF 
    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>){
     const uf = event.target.value;
     setSelectedUF(uf);     

    }

     
    //Verifica se o Seletor de Cidades mudou e Seta o novo valor de Cidade 
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);    
       }

    function handleMapClick(event: LeafletMouseEvent){
    setLatLng([event.latlng.lat, event.latlng.lng]);
    console.log(event.latlng);
    }

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

    const formRef = useRef<FormHandles>(null);
    async function handleSubmit(data: SubmitHandler<FormData>){

    const uf= selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = LatLng;
    const items = selectedItem;
    const SubmitData = {
        ...data,
        uf,
        city,
        latitude,
        longitude,
        items
    }    

    await api.post('http://localhost:3333/points', SubmitData);
    alert('Ponto de coleta criado com sucesso!');
    
    history.push('/')
    };
    
       
    
     return (
       <div id="page-create-point">
       <header>
           <img src={Logo} alt="Ecoleta Logo"/>
           <Link to="/">
               <FiArrowLeft/>
               Voltar para a home 
           </Link>
       </header>
 
       <Form ref={formRef} onSubmit={handleSubmit}>
      <h1>Cadastro do <br/>ponto de coleta</h1>
     <fieldset>
         <legend>
             <h2>Dados</h2>
         </legend>
    <div className="field">
    <label htmlFor="name">Nome da entidade</label>
    <Input type="text" name="name" id="name"/>
    </div>
   
    <div className="field-group">
    <div className="field">
    <label htmlFor="email">E-Mail</label>
    <Input type="email" name="email" id="email"/>
    </div>
    <div className="field">
    <label htmlFor="whatsapp">Whatsapp</label>
    <Input type="text" name="whatsapp" id="whatsapp"/>
    </div>
    </div>

     </fieldset>

     <fieldset>
         <legend>
             <h2>Endereço</h2>
             <span>Selecione o endereço no mapa</span>
         </legend>
     <Map center={initialPositionMap} zoom={15} onClick={handleMapClick}>
     <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {/*// eslint-disable-next-line*/} 
      <Marker position={LatLng} />
      </Map>


         <div className="field-group">
             <div className="field">
                 <label htmlFor="uf">Estado(UF)</label>

                 <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                 
                     <option value="0">Selecione uma UF</option>
                     { uf.map(item=>{
                         return(<option key={item.id} value={item.sigla}>{item.nome}</option>)
                     })}

                 </select>
             </div>


             <div className="field">
                 <label htmlFor="city">Cidade</label>
                 <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                 <option value="0">Selecione uma Cidade</option>
                 { city.map(item=>{
                         return(<option key={item.id} value={item.nome}>{item.nome}</option>)
                     })}

                 </select>
             </div>
         </div>
     </fieldset>

     <fieldset>
         <legend>
             <h2>Ítens de coleta</h2>
             <span>Selecione um ou mais ítens abaixo</span>
         </legend>
     <ul className="items-grid">
         {items.map(item=>(
             //Sempre ok primeiro elemento de um map, deve ter uma key para diferenciar
         <li key={item.id} onClick={()=>{handleItemClick(item.id)}} className={selectedItem.includes(item.id) ? 'selected' : ''} >
         <img src={item.image_url} alt={item.title} />
         <span>{item.title}</span>
          </li>
       
         ))}
       </ul>

     </fieldset>
    <button type="submit">Cadastrar ponto de coleta</button>
      </Form>

       </div>

        );
}

export default CreatePoint;