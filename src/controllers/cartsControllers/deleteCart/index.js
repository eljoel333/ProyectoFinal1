import { carts } from "../../../containers/containers.js"

const deleteCart = async(req, res)=>{
    const ID = req.params.id
    try {
      const emptyCart = await carts.emptyCart(ID)
      emptyCart === true ? res.json({status: `200 OK`, desc: `Carrito vacio.`}) : res.json({error: `404 Not Found`, desc: emptyCart})
    } catch (error) {
      console.error(error)
    }
  }

  export default deleteCart