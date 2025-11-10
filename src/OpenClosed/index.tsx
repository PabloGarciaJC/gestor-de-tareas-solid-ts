import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaFileCode, FaPlusCircle } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  type: string;
}

const ocpTasks: Task[] = [
  { id: 1, title: "Agregar un nuevo filtro a ProductManager", type: "Extend" },
  { id: 2, title: "Modificar ProductManager para cambiar lógica interna", type: "Modify" },
  { id: 3, title: "Crear nueva clase de descuento sin tocar código existente", type: "Extend" },
  { id: 4, title: "Cambiar método existente de cálculo de precio en ProductManager", type: "Modify" },
  { id: 5, title: "Agregar soporte para nuevos tipos de productos creando clase derivada", type: "Extend" },
];

const exampleTask: Task[] = [
  {
    id: 999,
    title: "Ejemplo de OCP en código",
    type: "Example",
  },
];

export const OpenClosed = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>(
    "Selecciona la acción correcta según el principio Open/Closed."
  );

  const learningModes = [
    {
      key: "example",
      title: "Ejemplo Visual",
      description: "Ve un ejemplo de cómo OCP permite extender sin modificar clases existentes.",
      icon: <FaFileCode size={22} />,
    },
    {
      key: "game",
      title: "Juego OCP",
      description: "Aprende OCP asignando tareas correctas según si cumplen o violan OCP.",
      icon: <FaPlusCircle size={22} />,
    },
  ];

  const startGame = (mode: "example" | "game") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona la acción correcta según el principio Open/Closed.");

    if (mode === "game") {
      setTasks(ocpTasks);
      setGameMode(null);
    } else if (mode === "example") {
      setTasks(exampleTask);
      setGameMode("example");
    }
  };

  const handleAssign = (task: Task, responsible: string) => {
    if (
      (task.type === "Extend" && responsible === "Extender") ||
      (task.type === "Modify" && responsible === "Modificar")
    ) {
      setCorrectCount(correctCount + 1);
      setMessage(
        <span>
          <FaCheckCircle style={{ color: "green", marginRight: "5px" }} />
          Correcto! "{task.title}" fue asignada correctamente.
        </span>
      );
    } else {
      setIncorrectCount(incorrectCount + 1);
      setMessage(
        <span>
          <FaTimesCircle style={{ color: "red", marginRight: "5px" }} />
          Incorrecto! "{task.title}" no corresponde a esta acción.
        </span>
      );
    }
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleBack = () => {
    setIntro(true);
    setTasks([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona la acción correcta según el principio Open/Closed.");
  };

  if (intro) {
    return (
      <div className="srp-container">
        <h1 className="srp-title">Open/Closed Principle (OCP)</h1>
        <div className="srp-description">
          <strong>OCP</strong> significa <strong>Open/Closed Principle</strong> o <strong>Principio Abierto/Cerrado</strong>.
        </div>
        <div className="srp-description">
          La idea clave de OCP es que las clases deben estar <strong>abiertas para extensión</strong> pero <strong>cerradas para modificación</strong>. Esto permite añadir nuevas funcionalidades sin tocar código ya probado.
        </div>

        <h2 className="srp-subtitle">Maneras de aprender OCP:</h2>
        <div className="learning-modes">
          {learningModes.map((mode) => (
            <div
              key={mode.key}
              className="learning-card"
              onClick={() => startGame(mode.key as "example" | "game")}
            >
              <div className="learning-icon">{mode.icon}</div>
              <div className="learning-content">
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="srp-container">
      <h1>{gameMode === "example" ? "Ejemplo Visual OCP" : "Juego OCP"}</h1>

      {gameMode !== "example" && tasks.length > 0 && (
        <>
          <p>
            <strong>Correctas:</strong> {correctCount} | <strong>Incorrectas:</strong> {incorrectCount}
          </p>
          <p>{message}</p>
        </>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <strong>{task.title}</strong>
            {task.type === "Example" ? (
              <div className="example-code">
                <pre>{`// Mala práctica: modificar clase existente
class ProductManager {
  calculatePrice(product) { ... }
}

// Buen ejemplo: extender clase sin modificar
class DiscountManager extends ProductManager {
  applyDiscount(product) { ... }
}`}</pre>
                <p>OCP permite extender funcionalidades sin modificar el código existente.</p>
              </div>
            ) : (
              <div className="button-group">
                <button className="srp-button" onClick={() => handleAssign(task, "Extender")}>
                  <FaPlusCircle style={{ marginRight: "5px" }} /> Extender
                </button>
                <button className="srp-button" onClick={() => handleAssign(task, "Modificar")}>
                  <FaFileCode style={{ marginRight: "5px" }} /> Modificar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.length === 0 && gameMode !== "example" && (
        <div className="end-screen">
          <h3>¡Juego terminado!</h3>
          <p>Total correctas: {correctCount}</p>
          <p>Total incorrectas: {incorrectCount}</p>
        </div>
      )}

      <button className="srp-button back-button" onClick={handleBack}>
        Atrás
      </button>
    </div>
  );
};
