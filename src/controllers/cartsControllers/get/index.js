import {carts} from '../../../containers/containers.js'

const getCartProducts = async (req, res) => {
    const ID = req.params.id;
    console.log(ID);
    try {
      const cartProducts = await carts.getCartProducts(ID);
      cartProducts ? res.json(cartProducts) : res.json({error: `404 Not Found`, desc: `Error al consultar el API`});
    } catch (error) {
      console.error(error);
    }
  }

  export default getCartProducts