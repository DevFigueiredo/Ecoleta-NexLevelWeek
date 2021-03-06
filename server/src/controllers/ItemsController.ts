import {Request, Response} from 'express';

import knex from '../database/connection';

class ItemsController{
    async index(req: Request,res: Response){
        const items = await knex('items').select('*');
        const seriaLizedItems = items.map(item=>{
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.100.155:3333/uploads/${item.image}`
            }
        })
        return res.json(seriaLizedItems)
    }



}


export default ItemsController;