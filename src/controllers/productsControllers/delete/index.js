import { products } from "../../../containers/containers.js";
import isAdmin from "../../isAdmin/index.js";

const del = async (req, res) => {
    if (isAdmin) {
      try {
        const isDeleted = await products.deleteById(req.params.id);
        isDeleted ? res.json({status: `200 OK`, desc: `Producto eliminado.`}) : res.json({error: 404, desc: `El producto no existe en tu carrito.`});
      } catch (error) {
        console.error(error);
      }
    } else {
      res.json({ error: `403 Forbidden`, desc: `Usuario no autorizado` });
    }
  }

  export default del