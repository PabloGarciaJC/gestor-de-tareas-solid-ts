import { useState } from "react";
import { FaPaintBrush, FaBroom, FaUtensils, FaDatabase, FaEnvelope, FaFilePdf, FaCheckCircle, FaTimesCircle, FaMoneyBill } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  type: string;
}

const commonTasks: Task[] = [
  { id: 1, title: "Pintar la pared", type: "Paint" },
  { id: 2, title: "Limpiar el piso", type: "Clean" },
  { id: 3, title: "Cocinar la cena", type: "Cook" },
  { id: 4, title: "Pintar la puerta", type: "Paint" },
  { id: 5, title: "Limpiar ventanas", type: "Clean" },
];

const technicalTasks: Task[] = [
  { id: 1, title: "Guardar usuario en DB", type: "UserService" },
  { id: 2, title: "Enviar correo de confirmación", type: "EmailService" },
  { id: 3, title: "Generar reporte PDF", type: "ReportService" },
  { id: 4, title: "Validar formulario", type: "ValidationService" },
  { id: 5, title: "Procesar pago", type: "PaymentService" },
];

export const SingleResponsibility = () => {
  const [intro, setIntro] = useState(true);
  const [gameMode, setGameMode] = useState<"common" | "technical" | "example" | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState<React.ReactNode>("Selecciona el responsable correcto para cada tarea según su tipo.");

  const learningModes = [
    { key: "common", title: "Actividades Cotidianas", description: "Aprende SRP relacionando tareas comunes del día a día con sus responsables.", icon: <FaBroom size={22} /> },
    { key: "technical", title: "Técnico", description: "Aprende SRP con ejemplos de programación y servicios técnicos.", icon: <FaDatabase size={22} /> },
    { key: "example", title: "Ejemplo Visual", description: "Ve un ejemplo de cómo SRP separa responsabilidades en un módulo de código.", icon: <FaCheckCircle size={22} /> }
  ];

  const startGame = (mode: "common" | "technical" | "example") => {
    setIntro(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage(
      mode === "common"
        ? "Selecciona el responsable correcto para cada tarea según su tipo."
        : mode === "technical"
          ? "Asigna cada tarea a la clase/servicio correcto según su responsabilidad."
          : ""
    );

    if (mode === "common") {
      setTasks(commonTasks);
      setGameMode("common");
    } else if (mode === "technical") {
      setTasks(technicalTasks);
      setGameMode("technical");
    } else if (mode === "example") {
      setTasks([{ id: 999, title: "Ejemplo de SRP en código", type: "Example" }]);
      setGameMode("example");
    }
  };

  const handleAssign = (task: Task, responsible: string) => {
    if (task.type === responsible) {
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
          Incorrecto! "{task.title}" no corresponde a este responsable.
        </span>
      );
    }
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleBack = () => {
    setIntro(true);
    setGameMode(null);
    setTasks([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMessage("Selecciona el responsable correcto para cada tarea según su tipo.");
  };

  if (intro) {
    return (
      <div className="srp-container">
        <div className="cntn">
          <h1 className="srp-title">Single Responsibility Principle (SRP)</h1>
          <div className="srp-description">
            <strong>SRP</strong> significa <strong>Single Responsibility Principle</strong> o <strong>Principio de Responsabilidad Única</strong>.
          </div>
          <div className="srp-description">
            Este principio es parte de <strong>SOLID</strong>. Cada clase, módulo o función debe encargarse de una sola responsabilidad.
            Si un componente hace más de una cosa, se vuelve difícil de mantener y modificar.
          </div>
          <h2 className="srp-subtitle">Maneras de aprender SRP:</h2>
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

  const responsibleLabels =
    gameMode === "common"
      ? { Paint: "Pintor", Clean: "Personal de Limpieza", Cook: "Chef" }
      : gameMode === "technical"
        ? { UserService: "UserService", EmailService: "EmailService", ReportService: "ReportService", ValidationService: "ValidationService", PaymentService: "PaymentService" }
        : {};

  const responsibleIcons =
    gameMode === "common"
      ? { Paint: <FaPaintBrush />, Clean: <FaBroom />, Cook: <FaUtensils /> }
      : gameMode === "technical"
        ? { UserService: <FaDatabase />, EmailService: <FaEnvelope />, ReportService: <FaFilePdf />, ValidationService: <FaCheckCircle />, PaymentService: <FaMoneyBill /> }
        : {};

  return (
    <div className="srp-container">
      <h1>Juego SRP - {gameMode === "common" ? "Usuario Común" : gameMode === "technical" ? "Técnico" : "Ejemplo Visual"}</h1>

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
                <pre>{`// Mala práctica: clase con múltiples responsabilidades
class User {
  saveToDB() { ... }
  sendEmail() { ... }
}

// Buen ejemplo: cada clase tiene una sola responsabilidad
class UserService {
  saveToDB() { ... }
}

class EmailService {
  sendEmail() { ... }
}`}</pre>
                <p>Cada clase cumple una sola responsabilidad, facilitando mantenimiento y pruebas.</p>
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
