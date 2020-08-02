import knex from '../database/connection';
import { Request, Response, request } from 'express';

class PeopleController {
    async index(request: Request, response: Response) {
        console.log('Caiu na classe People index.')
        const { city, uf, service } = request.query;
        const people = await knex('tb_people')
            .join('tb_serviceKinds', 'tb_people.service_id', 'tb_serviceKinds.id_kind')
            .where('city', String(city))
            .where('uf', String(uf))
            .where('service_id', String(service))
            .distinct()
            .select('*');
        const serializedPeople = people.map( people => {
            return {
                ...people,
                imagem_url: `http://192.168.0.106:3333/uploads/${people.image}`
            };
        });
        return response.json(serializedPeople);
    }
    async create (request: Request, response: Response) {
        const {
            document,
            provider,
            name,
            telephone,
            city,
            uf,
            service_id,
            description,
            email
        } = request.body;
        const people = {
            document,
            provider,
            name,
            telephone,
            city,
            uf,
            service_id,
            description,
            email,
            image: request.file.filename
        }
        const insertedId = await knex('tb_people').insert(people);
        return response.json({
            id:insertedId[0],
            ...people
        });
    };
};

export default PeopleController;