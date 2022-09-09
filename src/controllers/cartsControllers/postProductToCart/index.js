import { carts } from '../../../containers/containers.js';
const postProductToCart = async (req, res) => {
  const ID = req.params.id;
  const ID_PRODUCT = req.body.id_prod;
  const newCart = await carts.addToCart(ID, ID_PRODUCT);
  if (newCart === true) res.json({ status: `200 OK`, desc: `El producto, ha sido agregado a su carrito de compra.` });
  else {
    res.json({ error: '404 Not Found', desc: newCart });
  }
};

export default postProductToCart;
