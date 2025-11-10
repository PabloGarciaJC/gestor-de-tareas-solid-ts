import { useState } from "react";
import { FaEnvelope, FaSms, FaCheckCircle, FaTimesCircle, FaBolt, FaBullseye, FaCode } from "react-icons/fa";

/* ===================== TAREAS ===================== */
interface Task {
  id: number;
  title: string;
  type: string;
}

const commonTasks: Task[] = [
  { id: 1, title: "Enviar mensaje importante por Email", type: "Email" },
  { id: 2, title: "Enviar alerta crítica por SMS", type: "SMS" },
  { id: 3, title: "Enviar newsletter masivo por Email", type: "Email" },
  { id: 4, title: "Enviar notificación urgente por SMS", type: "SMS" },
  { id: 5, title: "Intentar enviar alerta sin canal definido", type: "Invalid" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "NotificationManager usando EmailSender", type: "Email" },
  { id: 2, title: "NotificationManager usando SmsSender", type: "SMS" },
  { id: 3, title: "Alto nivel depende de MessageSender", type: "Abstraction" },
  { id: 4, title: "No usar directamente clases concretas en alto nivel", type: "Abstraction" },
  { id: 5, title: "Intentar usar clase concreta directamente", type: "Invalid" },
];

const exampleTask: Task[] = [
  { id: 999, title: "Ejemplo de DIP en código", type: "Example" },
];

/* ===================== COMPONENTE ===================== */
export const Denendenevlnvercion = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | "example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>("Selecciona la acción correcta según DIP.");

  const learningModes = [
    { key: "common", title: "Actividades Cotidianas", description: "Aprende DIP asignando el canal correcto de notificación.", icon: <FaBolt size={22} /> },
    { key: "technical", title: "Técnico", description: "Aprende DIP identificando cuando las clases dependen de abstracciones o implementaciones concretas.", icon: <FaCode size={22} /> },
    { key: "example", title: "Ejemplo Visual", description: "Ve un ejemplo de cómo una clase de alto nivel depende de la abstracción y no de la implementación concreta.", icon: <FaBullseye size={22} /> },
  ];

  const startGame = (mode: "common" | "technical" | "example") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona la acción correcta según DIP.");

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
    const valid =
      (task.type === "Email" && action === "Email") ||
      (task.type === "SMS" && action === "SMS") ||
      (task.type === "Abstraction" && action === "Abstraction") ||
      (task.type === "Invalid" && action === "No");

    if (valid) {
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
    setMessage("Selecciona la acción correcta según DIP.");
  };

  /* ===================== INTRO ===================== */
  if (intro) {
    return (
      <div className="srp-container">
        <div className="cntn">
          <h1 className="srp-title">Dependency Inversion Principle (DIP)</h1>
          <div className="srp-description">
            <strong>DIP</strong> significa <strong>Dependency Inversion Principle</strong> o <strong>Principio de Inversión de Dependencias</strong>.
          </div>
          <div className="srp-description">
            Las clases de alto nivel no deben depender de clases de bajo nivel, sino de abstracciones. Esto permite que los detalles cambien sin afectar la lógica de alto nivel.
          </div>

          <h2 className="srp-subtitle">Maneras de aprender DIP:</h2>
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
      ? { Email: "Email", SMS: "SMS", Abstraction: "Abstracción", No: "No" }
      : {};

  const responsibleIcons =
    gameMode === "common" || gameMode === "technical"
      ? { Email: <FaEnvelope />, SMS: <FaSms />, Abstraction: <FaBullseye />, No: <FaTimesCircle /> }
      : {};

  /* ===================== JUEGO ===================== */
  return (
    <div className="srp-container">
      <h1>
        Juego DIP - {gameMode === "common" ? "Actividades Cotidianas" : gameMode === "technical" ? "Técnico" : "Ejemplo Visual"}
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
                <pre>{`// Mala práctica: alto nivel depende de clase concreta
class NotificationManager {
  private emailSender: EmailSender;
  constructor() { ... }
}

// Buen ejemplo: alto nivel depende de la abstracción
interface MessageSender { send(msg: string): void; }
class NotificationManager {
  constructor(private sender: MessageSender) {}
}`}</pre>
                <p>La clase de alto nivel depende de la abstracción, cumpliendo DIP.</p>
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
