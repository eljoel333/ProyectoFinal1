import { products } from "../../../containers/containers.js";
 

const getAllProducts = async (req, res, next) => {
    try {
      const data = await products.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
    }
 }

 export default getAllProducts