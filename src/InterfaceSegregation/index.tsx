import { useState, useEffect } from "react";
import { FaUserEdit, FaUserMinus, FaCheckCircle, FaTimesCircle, FaUsers, FaUserCog, FaClipboardCheck } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  type: string;
}

/* ===================== TAREAS ===================== */
const commonTasks: Task[] = [
  { id: 1, title: "Editar perfil de usuario normal", type: "Edit" },
  { id: 2, title: "Eliminar usuario administrador", type: "Invalid" },
  { id: 3, title: "Editar datos de usuario invitado", type: "Edit" },
  { id: 4, title: "Eliminar usuario temporal", type: "Delete" },
  { id: 5, title: "Editar datos de otro departamento sin permisos", type: "Invalid" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "Clase Admin puede usar editUser", type: "Edit" },
  { id: 2, title: "Clase Guest intenta deleteUser", type: "Invalid" },
  { id: 3, title: "Clase Editor implementa CanEdit", type: "Edit" },
  { id: 4, title: "Clase Manager implementa CanDelete", type: "Delete" },
  { id: 5, title: "Clase Viewer intenta deleteUser", type: "Invalid" },
];

const exampleTask: Task[] = [
  { id: 999, title: "Ejemplo de ISP en código", type: "Example" },
];

/* ===================== COMPONENTE ===================== */
export const InterfaceSegregation = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | "example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>("Selecciona la acción correcta según ISP.");

  const learningModes = [
    { key: "common", title: "Actividades Cotidianas", description: "Aprende ISP decidiendo qué usuarios pueden editar o eliminar.", icon: <FaUsers size={22} /> },
    { key: "technical", title: "Técnico", description: "Aprende ISP con ejemplos de clases que implementan solo las interfaces necesarias.", icon: <FaUserCog size={22} /> },
    { key: "example", title: "Ejemplo Visual", description: "Ve un ejemplo de cómo ISP permite que cada clase implemente solo lo que necesita.", icon: <FaClipboardCheck size={22} /> },
  ];

  const startGame = (mode: "common" | "technical" | "example") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona la acción correcta según ISP.");

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
    if ((task.type === "Edit" && action === "Editar") || (task.type === "Delete" && action === "Eliminar") || (task.type === "Invalid" && action === "No") ) {
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
    setMessage("Selecciona la acción correcta según ISP.");
  };

  /* ===================== INTRO ===================== */
  if (intro) {
    return (
      <div className="srp-container">
        <h1 className="srp-title">Interface Segregation Principle (ISP)</h1>
        <div className="srp-description">
          <strong>ISP</strong> significa <strong>Interface Segregation Principle</strong> o <strong>Principio de Segregación de Interfaces</strong>.
        </div>
        <div className="srp-description">
          Las clases no deben depender de métodos que no utilizan; cada clase implementa solo las interfaces necesarias.
        </div>

        <h2 className="srp-subtitle">Maneras de aprender ISP:</h2>
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
    );
  }

  /* ===================== RESPONSABLES ===================== */
  const responsibleLabels =
    gameMode === "common" || gameMode === "technical"
      ? { Editar: "Editar", Eliminar: "Eliminar", No: "No" }
      : {};

  const responsibleIcons =
    gameMode === "common" || gameMode === "technical"
      ? { Editar: <FaUserEdit />, Eliminar: <FaUserMinus />, No: <FaTimesCircle /> }
      : {};

  /* ===================== JUEGO ===================== */
  return (
    <div className="srp-container">
      <h1>
        Juego ISP - {gameMode === "common" ? "Actividades Cotidianas" : gameMode === "technical" ? "Técnico" : "Ejemplo Visual"}
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
                <pre>{`// Mala práctica: clase con métodos que no usa
class User {
  editUser() { ... }
  deleteUser() { ... }
}

class Viewer implements CanEdit, CanDelete { ... } // incorrecto

// Buen ejemplo: interfaces separadas
class Editor implements CanEdit { ... }
class Admin implements CanDelete { ... }`}</pre>
                <p>Cada clase implementa solo las interfaces que necesita, cumpliendo ISP.</p>
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
  );
};
