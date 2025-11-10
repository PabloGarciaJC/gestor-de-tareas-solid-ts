import { useState } from "react";
import { FaCar, FaBicycle, FaBus, FaMotorcycle, FaCheckCircle, FaTimesCircle, FaTruck, FaSubway } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  type: string;
}

/* ===================== TAREAS ===================== */
const commonTasks: Task[] = [
  { id: 1, title: "Reemplazar bicicleta por bicicleta eléctrica en paseo familiar", type: "Valid" },
  { id: 2, title: "Reemplazar auto por avión en la ciudad", type: "Invalid" },
  { id: 3, title: "Reemplazar autobús escolar por otro autobús", type: "Valid" },
  { id: 4, title: "Reemplazar scooter por bicicleta en pista", type: "Valid" },
  { id: 5, title: "Reemplazar coche por camión de carga en calle estrecha", type: "Invalid" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "Sustituir clase Car por ElectricCar", type: "Valid" },
  { id: 2, title: "Sustituir clase Car por Airplane", type: "Invalid" },
  { id: 3, title: "Sustituir clase Bus por Minibus", type: "Valid" },
  { id: 4, title: "Sustituir clase Motorcycle por Bicycle", type: "Invalid" },
  { id: 5, title: "Sustituir clase Vehicle por Truck con carga excesiva", type: "Invalid" },
];

const exampleTask: Task[] = [
  { id: 999, title: "Ejemplo de LSP en código", type: "Example" },
];

/* ===================== COMPONENTE ===================== */
export const LiskovSubstitution = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | "example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>("Selecciona si la sustitución es correcta o no según LSP.");

  const learningModes = [
    { key: "common", title: "Actividades Cotidianas", description: "Aprende LSP relacionando vehículos comunes y cuándo se pueden sustituir sin problemas.", icon: <FaCar size={22} /> },
    { key: "technical", title: "Técnico", description: "Aprende LSP con ejemplos de programación y clases derivadas.", icon: <FaTruck size={22} /> },
    { key: "example", title: "Ejemplo Visual", description: "Ve un ejemplo de cómo LSP permite sustituir subclases sin romper la lógica.", icon: <FaSubway size={22} /> },
  ];

  const startGame = (mode: "common" | "technical" | "example") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona si la sustitución es correcta o no según LSP.");

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
    if ((task.type === "Valid" && action === "Correcta") || (task.type === "Invalid" && action === "Incorrecta")) {
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
    setMessage("Selecciona si la sustitución es correcta o no según LSP.");
  };

  /* ===================== INTRO ===================== */
  if (intro) {
    return (
      <div className="srp-container">
        <div className="cntn">
          <h1 className="srp-title">Liskov Substitution Principle (LSP)</h1>
          <div className="srp-description">
            <strong>LSP</strong> significa <strong>Liskov Substitution Principle</strong> o <strong>Principio de Sustitución de Liskov</strong>.
          </div>
          <div className="srp-description">
            Los objetos de una clase derivada deben poder sustituir a los objetos de la clase base sin alterar el comportamiento correcto del programa.
          </div>

          <h2 className="srp-subtitle">Maneras de aprender LSP:</h2>
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
      ? { Correcta: "Correcta", Incorrecta: "Incorrecta" }
      : {};

  const responsibleIcons =
    gameMode === "common" || gameMode === "technical"
      ? { Correcta: <FaCheckCircle />, Incorrecta: <FaTimesCircle /> }
      : {};

  /* ===================== JUEGO ===================== */
  return (
    <div className="srp-container">
      <h1>
        Juego LSP - {gameMode === "common" ? "Actividades Cotidianas" : gameMode === "technical" ? "Técnico" : "Ejemplo Visual"}
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
                <pre>{`// Mala práctica: subclase que rompe comportamiento de base
class Bird {
  fly() { ... }
}

class Penguin extends Bird {
  fly() { throw Error("No puede volar"); }
}

// Buen ejemplo: subclase respeta comportamiento
class Sparrow extends Bird {
  fly() { ... }
}`}</pre>
                <p>Cualquier subclase debe poder sustituir a la clase base sin romper la lógica del programa.</p>
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
