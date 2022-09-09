import Router from 'express';
import { getAllProducts, getById, post, put, del } from '../../controllers/productsControllers/index.js';
import { products } from '../../containers/containers.js';

export const productsApi = new Router();

const isAdmin = true;

productsApi.get('/', getAllProducts);
productsApi.get('/:id', getById);
productsApi.post('/', post);
productsApi.put('/:id', put);
productsApi.delete('/:id', del);
