import { carts } from "../../../containers/containers.js";
const deleteProductfromCart = async (req, res) => {
    const ID = req.params.id;
    const ID_PRODUCT = req.params.id_prod
    try {
      const cartProducts = await carts.deleteProductFromCart(ID, ID_PRODUCT);
      cartProducts === true ? res.json({status: `200 OK`, desc: `El Producto ha sido eliminado`}) : res.json({error: `404 Not Found`, desc: cartProducts});
    } catch (error) {
      console.error(error);
    }
  }

  export default deleteProductfromCart