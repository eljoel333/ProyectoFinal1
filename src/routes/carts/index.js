import Router from 'express';

import { getCartProducts, postNewCart, postProductToCart, deleteCart, deleteProductFromCart } from '../../controllers/cartsControllers/index.js';

export const cartsApi = new Router();

cartsApi.post('/', postNewCart); 
cartsApi.post('/:id/productos', postProductToCart);
cartsApi.get('/:id/productos', getCartProducts);  
cartsApi.delete('/:id/productos/:id_prod', deleteProductFromCart);
cartsApi.delete('/:id', deleteCart)