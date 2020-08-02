import knex from '../database/connection';
import { Request, Response } from 'express';

class ServicesController {
    async index(request: Request, response: Response){
        console.log('Display de todos os serviços');
        const services = await knex('tb_serviceKinds').select('*');
        const serializedServices = services.map( service =>{
            return {
                id_service: service.id_kind,
                name: service.kindName,
                image: `http://192.168.0.106:3333/uploads/${service.image}`
            };
        });
        response.send(serializedServices);
    };
};
export default ServicesController;