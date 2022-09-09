import { carts } from "../../../containers/containers.js";

const postNewCart = async (req, res) => {
const newCart = await carts.addNewCart();
    res.json(`El Carrito fue creado: ${newCart}`);
  }

  export default postNewCart