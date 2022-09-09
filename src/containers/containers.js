import fs from 'fs';

class Contenedor {
  constructor(route) {
    this.route = route;
  }
  async writeFile(input) {
    fs.promises.writeFile(this.route, JSON.stringify(input));
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(error);
    }
  }
  async save(nombre, descripcion, foto, precio) {
    try {
      let data = await this.getAll();
      data.push({
        id: !data.length ? 1 : parseInt(data[data.length - 1].id) + 1,
        nombre: nombre || `globo`,
        descripcion: descripcion || `aerostatico`,
        foto: foto || `https://i.pinimg.com/236x/a0/d6/e7/a0d6e7e0fe58297906e83b0b2759863e--hot-air-balloons-hot-air-balloon-illustration.jpg`,
        precio: precio || 10000,
        stock: 3,
        timestamp: Date.now(),
        codigo: 'teoti'
      });
      await this.writeFile(data);
    } catch (err) {
      console.error(err);
    }
  }

  async getById(i) {
    try {
      const data = await this.getAll();
      return data.find((x) => x.id == i);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((obj) => obj.id == id);
      if (index > -1) {
        const newData = data.slice(0, index).concat(data.slice(index + 1));
        await this.writeFile(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, nombre, descripcion, foto, precio,stock) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((obj) => obj.id == id);
      if (index > -1) {
        data[index] = {
          id: id,
          nombre: nombre || data[index].nombre,
          descripcion: descripcion || data[index].descripcion,
          foto: foto || data[index].foto,
          precio: precio || data[index].precio,
          stock: stock || data[index].stock
        };
        await this.writeFile(data);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.route, JSON.stringify([]));
    } catch (err) {
      console.error(err);
    }
    console.log('Han sido eliminados los elemetos');
  }

  async addNewCart() {
    try {
      const data = await this.getAll();
      const id = !data.length ? 1 : parseInt(data[data.length - 1].id) + 1;
      data.push({
        id: id,
        productos: [],
      });
      await this.writeFile(data);
      return id;
    } catch (err) {
      console.error(err);
    }
  }

  async addToCart(id, idProduct) {
    try {
      const carts = await this.getAll();
      const cart = await this.getById(id);
      const productToAdd = await products.getById(idProduct);

      if (cart && productToAdd) {
        carts[cart.id - 1].productos.push(productToAdd);
        await this.writeFile(carts);
        return true;
      } else if (!cart) {
        return 'El carrito no fue encontrado';
      } else if (!productToAdd) {
        return 'El producto no existe, favor de validar';
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getCartProducts(id) {
    try {
      const carts = await this.getAll();
      const cart = await this.getById(id);
      return cart ? cart.productos : undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductFromCart(id, idProduct) {
    try {
      const carts = await this.getAll();
      const cart = await this.getById(id)
      if(!cart) return `El carrito no fue encontrado`
      const productIndex = cart.productos.findIndex(prod=> prod.id == idProduct)
      const cartIndex = carts.findIndex(cart=> cart.id == id)
      if (productIndex > -1) {
        carts[cartIndex].productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
        await this.writeFile(carts);
        return true;
      } else if(productIndex == -1){
        return `Producto no encontrado en el carrito.`
      }
    } catch (error) {
      console.error(error)
    }
  }
  async emptyCart(id){
    try {
      const carts = await this.getAll()
      const cart = await this.getById(id)
      if(!cart)return `El carrito no fue encontrado`
      const index = carts.findIndex(cart=>cart.id == id)
      carts[index].productos = []
      await this.writeFile(carts)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export const products = new Contenedor('./db/products.json');
export const carts = new Contenedor('./db/carts.json');
