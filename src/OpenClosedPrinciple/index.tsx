import { useEffect, useState } from "react";

/* ================= Open/Closed Principle (OCP) ================= */

/* ------------------ (1) MODELO ------------------
   Define un producto.  
   Responsabilidad única: solo contiene los datos.
-------------------------------------------------- */
interface Product {
  id: number;
  name: string;
  price: number;
}

/* ------------------ (2) SERVICIO ------------------
   Obtiene productos desde la API.
   Responsabilidad única: acceder a la fuente de datos.
-------------------------------------------------- */
class ProductService {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(
      "https://fakestoreapi.com/products?limit=5"
    );
    return response.json();
  }
}

/* ------------------ (3) LÓGICA ------------------
   Maneja la lista de productos y filtros.
   Responsabilidad única: reglas de negocio.
   Se puede extender sin modificar esta clase.
-------------------------------------------------- */
class ProductManager {
  private products: Product[] = [];

  setInitial(products: Product[]) {
    this.products = products;
  }

  getAll() {
    return this.products;
  }

  // Ejemplo de extensión: filtrar por precio mayor a cierto valor
  filterExpensive(minPrice: number) {
    return this.products.filter((p) => p.price > minPrice);
  }
}

/* ------------------ (4) UI ------------------
   Solo presenta información y recibe interacción.
-------------------------------------------------- */
const productManager = new ProductManager();
const productService = new ProductService();

export const OpenClosedPrinciple = () => {
  const [products, setProducts] = useState<Product[]>(productManager.getAll());

  const refresh = () => setProducts([...productManager.getAll()]);

  useEffect(() => {
    productService.fetchProducts().then((data) => {
      productManager.setInitial(data);
      refresh();
    });
  }, []);

  return (
    <div className="srp-container">
      <h1 className="srp-title">Open/Closed Principle (OCP)</h1>

      <p className="srp-description">
        <strong>Idea clave:</strong> Las clases deben estar abiertas para extensión pero cerradas para modificación.
      </p>

      <ul className="srp-explain-list">
        <li><strong>Product</strong> define los datos. (Modelo)</li>
        <li><strong>ProductService</strong> obtiene productos. (Servicio/API)</li>
        <li><strong>ProductManager</strong> maneja lógica y filtros. (Reglas de negocio)</li>
        <li><strong>UI</strong> solo presenta la lista de productos. (Interfaz)</li>
      </ul>

      <h2 className="srp-subtitle">Productos desde API</h2>

      {!products.length && <p className="srp-loading">Cargando productos...</p>}

      <ul className="srp-task-list">
        {products.map((p) => (
          <li key={p.id} className="srp-task-item">
            <span className="srp-task-text">{p.name}</span>
            <span>${p.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
