import { useEffect, useState } from "react";

/* ================= Liskov Substitution Principle (LSP) ================= */

/* ------------------ (1) MODELO ------------------
   Define un vehículo.
   Responsabilidad única: solo contiene los datos.
-------------------------------------------------- */
interface Vehicle {
  id: number;
  name: string;
  speed: number;
}

/* ------------------ (2) SERVICIO ------------------
   Obtiene vehículos desde la API.
   Responsabilidad única: acceder a la fuente de datos.
-------------------------------------------------- */
class VehicleService {
  async fetchVehicles(): Promise<Vehicle[]> {
    // Para el ejemplo usamos jsonplaceholder con todos simulando vehículos
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await response.json();
    // Transformamos los todos en vehículos de ejemplo
    return data.map((item: any) => ({
      id: item.id,
      name: item.title,
      speed: Math.floor(Math.random() * 100) + 50,
    }));
  }
}

/* ------------------ (3) LÓGICA ------------------
   Maneja la lista de vehículos.
   Responsabilidad única: reglas de negocio.
   Permite que cualquier subclase de Vehicle sea sustituida sin romper la lógica.
-------------------------------------------------- */
class VehicleManager {
  private vehicles: Vehicle[] = [];

  setInitial(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  getAll() {
    return this.vehicles;
  }

  accelerate(id: number, increment: number) {
    this.vehicles = this.vehicles.map((v) =>
      v.id === id ? { ...v, speed: v.speed + increment } : v
    );
  }

  remove(id: number) {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }
}

/* ------------------ (4) UI ------------------
   Solo presenta información y recibe interacción.
-------------------------------------------------- */
const vehicleManager = new VehicleManager();
const vehicleService = new VehicleService();

export const LiskovSubstitution = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehicleManager.getAll());

  const refresh = () => setVehicles([...vehicleManager.getAll()]);

  useEffect(() => {
    vehicleService.fetchVehicles().then((data) => {
      vehicleManager.setInitial(data);
      refresh();
    });
  }, []);

  return (
    <div className="srp-container">
      <h1 className="srp-title">Liskov Substitution Principle (LSP)</h1>

      <p className="srp-description">
        <strong>Idea clave:</strong> Los objetos de una clase derivada deben poder sustituir a los objetos de la clase base sin alterar el comportamiento correcto del programa.
      </p>

      <ul className="srp-explain-list">
        <li><strong>Vehicle</strong> define los datos. (Modelo)</li>
        <li><strong>VehicleService</strong> obtiene vehículos. (Servicio/API)</li>
        <li><strong>VehicleManager</strong> maneja lógica de velocidad y eliminación. (Reglas de negocio)</li>
        <li><strong>UI</strong> solo presenta la lista de vehículos. (Interfaz)</li>
      </ul>

      <h2 className="srp-subtitle">Vehículos desde API</h2>

      {!vehicles.length && <p className="srp-loading">Cargando vehículos...</p>}

      <ul className="srp-task-list">
        {vehicles.map((v) => (
          <li key={v.id} className="srp-task-item">
            <span className="srp-task-text">{v.name}</span>
            <span>{v.speed} km/h</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
