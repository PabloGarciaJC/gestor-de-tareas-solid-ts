import { useState } from "react";
import { FaCheckCircle, FaBroom, FaTimesCircle, FaFileCode, FaPlusCircle, FaDatabase } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  type: string;
}

/* ===================== TAREAS ===================== */
const commonTasks: Task[] = [
  { id: 1, title: "Agregar una regla de negocio sin tocar el código existente", type: "Extend" },
  { id: 2, title: "Modificar método existente de cálculo de precio", type: "Modify" },
  { id: 3, title: "Agregar un nuevo tipo de producto creando clase derivada", type: "Extend" },
  { id: 4, title: "Cambiar lógica interna de ProductManager", type: "Modify" },
  { id: 5, title: "Crear nueva oferta sin alterar código existente", type: "Extend" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "Extender ProductManager con DiscountManager", type: "Extend" },
  { id: 2, title: "Modificar ProductManager directamente", type: "Modify" },
  { id: 3, title: "Agregar un nuevo filtro creando clase derivada", type: "Extend" },
  { id: 4, title: "Cambiar método de cálculo en ProductManager", type: "Modify" },
  { id: 5, title: "Crear clase LoggingProductManager sin tocar original", type: "Extend" },
];

const exampleTask: Task[] = [
  { id: 999, title: "Ejemplo de OCP en código", type: "Example" },
];

/* ===================== COMPONENTE ===================== */
export const OpenClosed = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | "example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>("Selecciona la acción correcta según el principio Open/Closed.");

  const learningModes = [
    { key: "common", title: "Actividades Cotidianas", description: "Aprende OCP relacionando acciones cotidianas con extensión sin modificar.", icon: <FaBroom size={22} />  },
    { key: "technical", title: "Técnico", description: "Aprende OCP con ejemplos de programación y servicios técnicos.", icon: <FaDatabase size={22} /> },
    { key: "example", title: "Ejemplo Visual", description: "Ve un ejemplo de cómo OCP permite extender sin modificar clases existentes.", icon: <FaFileCode size={22} /> },
  ];

  const startGame = (mode: "common" | "technical" | "example") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona la acción correcta según el principio Open/Closed.");

    if (mode === "common") {
      setTasks(commonTasks);
      setGameMode("common");
    } else if (mode === "technical") {
      setTasks(technicalTasks);
      setGameMode("technical");
    } else if (mode === "example") {
      setTasks(exampleTask);
      setGameMode("example");
    }
  };

  const handleAssign = (task: Task, action: string) => {
    if (
      (task.type === "Extend" && action === "Extender") ||
      (task.type === "Modify" && action === "Modificar")
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

  /* ===================== INTRO ===================== */
  if (intro) {
    return (
      <div className="srp-container">
        <div className="cntn">
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
              <div key={mode.key} className="learning-card" onClick={() => startGame(mode.key as "common" | "technical" | "example")}>
                <div className="learning-icon">{mode.icon}</div>
                <div className="learning-content">
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ===================== RESPONSABLES ===================== */
  const responsibleLabels =
    gameMode === "common" || gameMode === "technical"
      ? { Extender: "Extender", Modificar: "Modificar" }
      : {};

  const responsibleIcons =
    gameMode === "common" || gameMode === "technical"
      ? { Extender: <FaPlusCircle />, Modificar: <FaFileCode /> }
      : {};

  /* ===================== JUEGO ===================== */
  return (
    <div className="srp-container">
      <div className="cntn">
        <h1>
          Juego OCP - {gameMode === "common" ? "Actividades Cotidianas" : gameMode === "technical" ? "Técnico" : "Ejemplo Visual"}
        </h1>
        {gameMode !== "example" && (
          <>
            <p><strong>Correctas:</strong> {correctCount} | <strong>Incorrectas:</strong> {incorrectCount}</p>
            <p>{message}</p>
          </>
        )}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <strong>{task.title}</strong>
              {task.type === "Example" ? (
                <div className="example-code">
                  <pre>
                    {`// Mala práctica: modificar clase existente
                class ProductManager {
                  calculatePrice(product) { ... }
                }

                // Buen ejemplo: extender clase sin modificar
                class DiscountManager extends ProductManager {
                  applyDiscount(product) { ... }
                }`}
                  </pre>
                  <p>OCP permite extender funcionalidades sin modificar el código existente.</p>
                </div>
              ) : (
                <div className="button-group">
                  {Object.keys(responsibleLabels).map((key) => (
                    <button key={key} className="srp-button" onClick={() => handleAssign(task, key)}>
                      <span className="button-icon">{responsibleIcons[key as keyof typeof responsibleIcons]}</span>
                      {responsibleLabels[key as keyof typeof responsibleLabels]}
                    </button>
                  ))}
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
        <button className="srp-button back-button" onClick={handleBack}>Atrás</button>
      </div>
    </div>
  );
};
