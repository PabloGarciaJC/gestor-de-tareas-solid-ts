// import { Task } from "./Task";

// // SRP: Esta clase solo maneja la lógica de modificación de las tareas.
// export class TaskManager {
//   private tasks: Task[] = [];

//   setInitial(tasks: Task[]) {
//     this.tasks = tasks;
//   }

//   getAll() {
//     return this.tasks;
//   }

//   toggleComplete(id: number) {
//     this.tasks = this.tasks.map(t =>
//       t.id === id ? { ...t, completed: !t.completed } : t
//     );
//   }

//   remove(id: number) {
//     this.tasks = this.tasks.filter(t => t.id !== id);
//   }
// }
