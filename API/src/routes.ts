import express from 'express';
import multer from 'multer'; // Lib de upload de imagem
import multerConfig from './config/multer'; // Config de upload de imagem
import { celebrate, Joi } from 'celebrate';

import ServicesController from './controllers/ServicesController';
import PeopleController from './controllers/PeopleController';

const upload = multer(multerConfig);
const routes = express.Router();
const servicesController = new ServicesController();
const peopleController = new PeopleController();

routes.use(express.json());
routes.get('/services', servicesController.index);
routes.get('/teste', (request, response) => {
    console.log('Listagem de teste.');
    response.send('Hello world.');
});
routes.get('/people', 
    celebrate({
        body: Joi.object().keys({
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            service: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), peopleController.index);
routes.post('/people',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            document: Joi.string().required(),
            provider: Joi.number().required(),
            name: Joi.string().required(),
            telephone: Joi.string().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            service_id: Joi.number().required(),
            description: Joi.string().required(),
            email: Joi.string().required().email()
        })
    }, {
        abortEarly: false
    }), peopleController.create);

export default routes;