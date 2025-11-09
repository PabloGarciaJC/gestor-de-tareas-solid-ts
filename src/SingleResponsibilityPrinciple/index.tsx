import { useEffect, useState } from "react";

/* ================= SRP - Single Responsibility Principle ================= */

/* ------------------ (1) MODELO ------------------
   Define qué es una tarea.  
   Responsabilidad única: solo contiene los datos. 
   Cambiar aquí solo afectaría la estructura de la tarea.
-------------------------------------------------- */
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

/* ------------------ (2) SERVICIO ------------------
   Obtiene tareas desde la API.
   Responsabilidad única: solo acceder a la fuente de datos.
   Cambiar la API solo requiere modificar esta clase.
-------------------------------------------------- */
class TaskService {
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return response.json();
  }
}

/* ------------------ (3) LÓGICA ------------------
   Maneja la lista de tareas: toggle, remove, obtener todas.
   Responsabilidad única: solo reglas de negocio y gestión del estado.
   Cambiar la lógica de manejo de tareas no afecta UI ni API.
-------------------------------------------------- */
class TaskManager {
  private tasks: Task[] = [];

  setInitial(tasks: Task[]) {
    this.tasks = tasks;
  }

  getAll() {
    return this.tasks;
  }

  toggleComplete(id: number) {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  }

  remove(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}

/* ------------------ (4) UI ------------------
   Solo presenta información y recibe interacción del usuario.
   Responsabilidad única: interfaz de usuario.
   Cambiar estilos o estructura no afecta la lógica ni los datos.
-------------------------------------------------- */
const taskManager = new TaskManager();
const taskService = new TaskService();

export const SingleResponsibilityPrinciple = () => {
  const [tasks, setTasks] = useState(taskManager.getAll());

  const refresh = () => setTasks([...taskManager.getAll()]);

  useEffect(() => {
    // Obtener tareas desde la API
    taskService.fetchTasks().then((data) => {
      taskManager.setInitial(data); // Inicializa la lista en la lógica
      refresh(); // Actualiza la UI
    });
  }, []);

  return (
    <div className="srp-container">
      <h1 className="srp-title">Single Responsibility Principle (SRP)</h1>

      <p className="srp-description">
        <strong>Idea clave:</strong> Cada módulo debe tener una sola responsabilidad.
      </p>

      <ul className="srp-explain-list">
        {/* Cada elemento muestra una responsabilidad separada */}
        <li>
          <strong>Task</strong> define los datos. (Modelo)
        </li>
        <li>
          <strong>TaskService</strong> obtiene tareas. (Servicio/API)
        </li>
        <li>
          <strong>TaskManager</strong> maneja la lógica. (Reglas de negocio)
        </li>
        <li>
          <strong>UI</strong> solo presenta. (Interfaz de usuario)
        </li>
      </ul>

      <h2 className="srp-subtitle">Tareas desde API</h2>

      {!tasks.length && <p className="srp-loading">Cargando tareas...</p>}

      <ul className="srp-task-list">
        {tasks.map((t) => (
          <li key={t.id} className="srp-task-item">
            {/* Toggle tarea completada */}
            <span
              className={`srp-task-text ${t.completed ? "completed" : ""}`}
              onClick={() => {
                taskManager.toggleComplete(t.id);
                refresh();
              }}
            >
              {t.title}
            </span>

            {/* Eliminar tarea */}
            <button
              className="srp-delete-btn"
              onClick={() => {
                taskManager.remove(t.id);
                refresh();
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
