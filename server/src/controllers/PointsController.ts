import {Request, Response} from 'express';

import knex from '../database/connection';

class PointsController{

   //Criar um novo ponto de coleta
    async create(req: Request,res: Response){
        const { 
        name, 
        email,
        whatsapp,
        latitude,
        longitude,
        city, 
        uf,
        items
        } = req.body;
     
        //Inserido a transação, para não have problema no momento do registro das duas tabelas, sendo assim, caso uma de erro a outra não funcionara tambem
     const point ={
     image: req.file.filename,  
     name, 
     email,
     whatsapp,
     latitude,
     longitude,
     city, 
     uf}
     const trx = await knex.transaction();
     const insertedIds = await trx('points').insert(point)
     
     const point_id = insertedIds[0];

    
     var pointItems = items
     .split(',')
     .map((item:string)=>Number(item.trim()))
     .map((item_id: number)=>{
         return {
             point_id,
             item_id,
         }
     });
     await trx('point_items').insert(pointItems)
     .then(trx.commit)
     .catch(trx.rollback);

     return res.json({
        id: point_id, 
        ...point,
     });
     }




     //Listar Ponto de coleta especifico
     async show(req: Request,res: Response){
        const {id} = req.params;
        //Realiza a consulta do primeiro id com este parametro
        const point = await knex('points').where('id',id).first();
        //Realiza a consulta dos items referenciados com este ponto
        const items = await knex('items')
        .join('point_items', 'items.id','=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');
        
        if(!point)
        return res.status(400).json({error:'Point not founded'});
        
        const seriaLizedPoint =  {
                ...point,
                image_url: `http://192.168.100.155:3333/uploads/${point.image}`
            };

        return res.json({point: seriaLizedPoint, items})
    }



    async index(req: Request,res: Response){
        const {city, uf, items} = req.query;
        
        const parsedItems = String(items).split(',').map(item=>Number(item.trim()))
        
        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        //Pesquisa todos os pontos que está na array de items de coleta
        .whereIn('point_items.item_id', parsedItems)    
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        if(!points)
        return res.status(400).json({error: 'No points founded'})
           
        const seriaLizedPoints = points.map(point=>{
            return {
                ...point,
                image_url: `http://192.168.100.155:3333/uploads/${point.image}`
            }});

        return res.json(seriaLizedPoints)
        
    }


}


export default PointsController;