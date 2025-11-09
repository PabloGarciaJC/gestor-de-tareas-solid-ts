import { useEffect, useState } from "react";

/* ================= Interface Segregation Principle (ISP) ================= */

/* ------------------ (1) MODELO ------------------
   Define un usuario y sus capacidades.
   Responsabilidad única: solo contiene los datos.
-------------------------------------------------- */
interface User {
  id: number;
  name: string;
}

/* Interfaces separadas según capacidades */
interface CanEdit {
  editUser(id: number): void;
}

interface CanDelete {
  deleteUser(id: number): void;
}

/* ------------------ (2) SERVICIO ------------------
   Obtiene usuarios desde la API.
   Responsabilidad única: acceder a la fuente de datos.
-------------------------------------------------- */
class UserService {
  async fetchUsers(): Promise<User[]> {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users?_limit=5"
    );
    return response.json();
  }
}

/* ------------------ (3) LÓGICA ------------------
   Maneja la lista de usuarios.
   Responsabilidad única: reglas de negocio.
   Implementa solo las interfaces que necesita (ISP).
-------------------------------------------------- */
class UserManager implements CanEdit, CanDelete {
  private users: User[] = [];

  setInitial(users: User[]) {
    this.users = users;
  }

  getAll() {
    return this.users;
  }

  editUser(id: number) {
    this.users = this.users.map((u) =>
      u.id === id ? { ...u, name: u.name + " (editado)" } : u
    );
  }

  deleteUser(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
  }
}

/* ------------------ (4) UI ------------------
   Solo presenta información y recibe interacción.
-------------------------------------------------- */
const userManager = new UserManager();
const userService = new UserService();

export const InterfaceSegregationPrinciple = () => {
  const [users, setUsers] = useState<User[]>(userManager.getAll());

  const refresh = () => setUsers([...userManager.getAll()]);

  useEffect(() => {
    userService.fetchUsers().then((data) => {
      userManager.setInitial(data);
      refresh();
    });
  }, []);

  return (
    <div className="srp-container">
      <h1 className="srp-title">Interface Segregation Principle (ISP)</h1>

      <p className="srp-description">
        <strong>Idea clave:</strong> No obligues a las clases a depender de métodos que no usan.
      </p>

      <ul className="srp-explain-list">
        <li><strong>User</strong> define los datos. (Modelo)</li>
        <li><strong>UserService</strong> obtiene usuarios. (Servicio/API)</li>
        <li><strong>UserManager</strong> implementa solo las interfaces necesarias: <em>edit</em> y <em>delete</em>. (Reglas de negocio)</li>
        <li><strong>UI</strong> solo presenta la lista de usuarios. (Interfaz)</li>
      </ul>

      <h2 className="srp-subtitle">Usuarios desde API</h2>

      {!users.length && <p className="srp-loading">Cargando usuarios...</p>}

      <ul className="srp-task-list">
        {users.map((u) => (
          <li key={u.id} className="srp-task-item">
            <span className="srp-task-text">{u.name}</span>
            <div>
              <button
                style={{
                  background: "#3498db",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  userManager.editUser(u.id);
                  refresh();
                }}
              >
                Editar
              </button>
              <button
                className="srp-delete-btn"
                onClick={() => {
                  userManager.deleteUser(u.id);
                  refresh();
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
